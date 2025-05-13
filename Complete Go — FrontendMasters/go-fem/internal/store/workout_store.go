package store

import (
	"database/sql"
	"errors"
)

type Workout struct {
	ID              int            `json:"id"`
	UserID          int            `json:"user_id"`
	Title           string         `json:"title"`
	Description     string         `json:"description"`
	DurationMinutes int            `json:"duration_minutes"`
	CaloriesBurned  int            `json:"calories_burned"`
	Entries         []WorkoutEntry `json:"entries"`
}

type WorkoutEntry struct {
	ID              int      `json:"id"`
	ExerciseName    string   `json:"exercise_name"`
	Sets            int      `json:"sets"`
	Reps            *int     `json:"reps"`
	DurationSeconds *int     `json:"duration_seconds"`
	Weight          *float64 `json:"weight"`
	Notes           string   `json:"notes"`
	OrderIndex      int      `json:"order_index"`
}

type PostgresWorkoutStore struct {
	db *sql.DB
}

func NewPostgresWorkoutStore(db *sql.DB) *PostgresWorkoutStore {
	return &PostgresWorkoutStore{db: db}
}

type WorkoutStore interface {
	CreateWorkout(*Workout) (*Workout, error)
	GetWorkOutById(id int64) (*Workout, error)
	UpdateWorkout(workout *Workout) error
	DeleteWorkout(id int64) error
	GetWorkoutOwner(id int64) (int, error)
}

func (pg *PostgresWorkoutStore) CreateWorkout(workout *Workout) (*Workout, error) {
	tx, err := pg.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback() // This will be a no-op if Commit succeeds

	// Insert the workout
	query := `
        INSERT INTO workouts (user_id, title, description, duration_minutes, calories_burned)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `
	err = tx.QueryRow(
		query,
		workout.UserID,
		workout.Title,
		workout.Description,
		workout.DurationMinutes,
		workout.CaloriesBurned,
	).Scan(&workout.ID)
	if err != nil {
		return nil, err
	}

	// Insert all entries
	for i := range workout.Entries {
		entry := &workout.Entries[i] // Get pointer to the entry
		query := `
            INSERT INTO workout_entries (workout_id, exercise_name, sets, reps, duration_seconds, weight, notes, order_index) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
		err = tx.QueryRow(
			query,
			workout.ID,
			entry.ExerciseName,
			entry.Sets,
			entry.Reps,
			entry.DurationSeconds,
			entry.Weight,
			entry.Notes,
			entry.OrderIndex,
		).Scan(&entry.ID)
		if err != nil {
			return nil, err
		}
	}

	// Commit only after all operations succeed
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return workout, nil
}

func (pg *PostgresWorkoutStore) GetWorkOutById(id int64) (*Workout, error) {
	workout := &Workout{}
	query := `
		SELECT id, title, description, duration_minutes, calories_burned
		FROM workouts
		WHERE id = $1 
			 `

	err := pg.db.QueryRow(query, id).Scan(
		&workout.ID,
		&workout.Title,
		&workout.Description,
		&workout.DurationMinutes,
		&workout.CaloriesBurned,
	)

	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	// let's get the entries
	entryQuery :=
		`
			SELECT 
			    id, 
			    exercise_name, 
			    sets,
			    reps,
			    duration_seconds,
			    weight,
			    notes,
			    order_index 
			FROM workout_entries
			WHERE workout_id = $1
	    `

	rows, err := pg.db.Query(entryQuery, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var entry WorkoutEntry
		err = rows.Scan(
			&entry.ID,
			&entry.ExerciseName,
			&entry.Sets,
			&entry.Reps,
			&entry.DurationSeconds,
			&entry.Weight,
			&entry.Notes,
			&entry.OrderIndex,
		)

		if err != nil {
			return nil, err
		}

		workout.Entries = append(workout.Entries, entry)
	}

	return workout, nil
}

func (pg *PostgresWorkoutStore) UpdateWorkout(workout *Workout) error {
	tx, err := pg.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback() // This will be a no-op if Commit succeeds

	query := `
		UPDATE workouts 
		SET title = $1, description = $2, duration_minutes = $3, calories_burned = $4
		WHERE id = $5
			 `

	result, err := tx.Exec(
		query,
		workout.Title,
		workout.Description,
		workout.DurationMinutes,
		workout.CaloriesBurned,
		workout.ID,
	)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	_, err = tx.Exec(
		`
			DELETE FROM workout_entries WHERE workout_id = $1
			  `, workout.ID,
	)

	if err != nil {
		return err
	}

	for _, entry := range workout.Entries {
		query :=
			`
		INSERT INTO workout_entries (workout_id, exercise_name, sets, reps, duration_seconds, weight, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )
			`

		_, err := tx.Exec(
			query,

			workout.ID,
			entry.ExerciseName,
			entry.Sets,
			entry.Reps,
			entry.DurationSeconds,
			entry.Weight,
			entry.Notes,
			entry.OrderIndex,
		)

		if err != nil {
			return err
		}
	}

	// if everything is fine
	return tx.Commit()
}

func (pg *PostgresWorkoutStore) DeleteWorkout(id int64) error {
	query :=
		`
		DELETE FROM workouts
		WHERE id = $1
		`

	result, err := pg.db.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (pg *PostgresWorkoutStore) GetWorkoutOwner(workoutID int64) (int, error) {
	var userID int

	query :=
		`
			SELECT user_id FROM workouts WHERE id = $1
		`

	err := pg.db.QueryRow(query, workoutID).Scan(&userID)
	if err != nil {
		return 0, err
	}

	return userID, nil
}

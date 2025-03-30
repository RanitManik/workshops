package main

import "fmt"

func main() {
	// if else statements

	age := 30

	if age >= 18 {
		fmt.Println("You are an adult")
	} else if age >= 13 {
		fmt.Println("You are an teenager")
	} else {
		fmt.Println("You are an child")
	}

	// switch statements

	day := "Tuesday"

	switch day {
	case "Monday":
		fmt.Println("Start of the week")
		fallthrough // control will not come out from this case but will go to next case.
	case "Tuesday", "Wednesday", "Thursday":
		fmt.Println("Middle of the week")
	case "Friday":
		fmt.Println("TGIF")
	default:
		fmt.Println("Its the weekend")
	}

	// for loop

	for i := 0; i < 5; i++ {
		fmt.Printf("This is iterator => %d\n", i)
	}

	// while loop

	counter := 0

	for counter < 5 {
		fmt.Printf("This is counter => %d\n", counter)
		counter++
	}

	iteration := 0

	for {
		if iteration > 5 {
			break
		}
		if iteration == 3 {
			iteration++
			continue
		}

		iteration++
	}

	// Arrays and Slices
	numbers := [5]int{1, 2, 3, 4, 5}

	numbersEmpty := [5]int{}

	numbersAtInit := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}

	matrix := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}

	numbers[1] = 100

	allNumbers := numbers[:]
	firstThree := numbers[0:3]

	fmt.Printf("This is our first array %v\n", numbers)
	fmt.Printf("This is the last value of the array %d\n", numbers[len(numbers)-1])

	fmt.Printf("This is our second array %v\n", numbersEmpty)

	fmt.Printf("This is our third array %v\n", numbersAtInit)

	fmt.Printf("This is our matrix array %v\n", matrix)

	fmt.Printf("This is our first slice %v\n", allNumbers)
	fmt.Printf("This is our second slice %v\n", firstThree)

	// slice

	fruits := []string{"Apple", "Orange", "Pear"}
	fmt.Printf("This is our fruits %v\n", fruits)

	fruits = append(fruits, "kiwi")
	fmt.Printf("This is our appended fruits %v\n", fruits)

	fruits = append(fruits, "mango", "pineapple")
	fmt.Printf("This is our appended fruits %v\n", fruits)

	moreFruits := []string{"blueberries", "tomato"}
	fruits = append(fruits, moreFruits...)
	fmt.Printf("This is our appended fruits %v\n", fruits)

	scores := make([]int, 3)                        // slice with length 2 and capacity 3
	scoresWithExplicitCapacity := make([]int, 3, 5) // slice with length 3 and capacity 5

	fmt.Printf("This is our make slice 1 %v\n", scores)
	fmt.Printf("This is our make slice 2 %v\n", scoresWithExplicitCapacity)

	// difference between length and capacity are you can extend the length of a slice upto the capacity without making a different array of double the size
	fmt.Println("scoresWithExplicitCapacity length and capacity =>", len(scoresWithExplicitCapacity), cap(scoresWithExplicitCapacity))

	// loop through an iterable data type like array, slices and Objects
	for index, value := range numbers {
		fmt.Printf("index %d value %d\n", index, value)
	}

	// if you need to have an unused variable then you can use _

	// loop through an iterable data type like array, slices and Objects
	for _, value := range fruits {
		fmt.Println(value)
	}

	capitalCities := map[string]string{
		"USA":   "Washington D.C.",
		"India": "New Delhi",
		"UK":    "London",
	}

	fmt.Println(capitalCities["India"])

	capital, exists := capitalCities["Germany"]
	if exists {
		fmt.Println(capital)
	} else {
		fmt.Println("Does not exist")
	}

	delete(capitalCities, "UK")
	fmt.Printf("This is our deleted map => %v\n", capitalCities)

}

package main

import (
	"flag"
	"fmt"
	"github.com/RanitManik/go-fem/internal/app"
	"github.com/RanitManik/go-fem/internal/routes"
	"net/http"
	"time"
)

func main() {
	var port int
	flag.IntVar(&port, "port", 8080, "go backend server port")
	flag.Parse()

	application, err := app.NewApplication()
	if err != nil {
		panic(err)
	}

	defer application.DB.Close()

	application.Logger.Printf("application is running at port %d", port)

	r := routes.SetupRoutes(application)
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	err = server.ListenAndServe()
	if err != nil {
		application.Logger.Fatal(err)
	}
}

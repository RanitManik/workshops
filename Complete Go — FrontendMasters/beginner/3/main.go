package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	person := Person{
		Name: "John Doe",
		Age:  42,
	}

	fmt.Printf("This is our person %+v\n", person)

	// Anonymous struct
	employee := struct {
		Name string
		id   int
	}{
		Name: "John Doe",
		id:   42,
	}
	fmt.Println("This is our employee", employee)

}

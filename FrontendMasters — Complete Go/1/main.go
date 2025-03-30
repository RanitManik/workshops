package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello, World!")

	// variables
	var name string = "Ranit Manik"
	fmt.Printf("This is my name %s\n", name)

	age := 27
	fmt.Printf("this is my age %d\n", age)

	var city string
	city = "Mecheda"
	fmt.Printf("This is my city %s\n", city)

	var country, continent string = "India", "Asia"
	fmt.Printf("this is my country %s and this is my continent %s", country, continent)

	var (
		isEmployed bool   = true
		salary     int    = 5000
		position   string = "developer"
	)

	fmt.Printf("isEmployed: %t\nthis is my salary %d\nand this is my position %s\n", isEmployed, salary, position)

	// Zero values / Default Values
	var defaultInt int
	var defaultFloat float64
	var defaultString string
	var defaultBool bool

	fmt.Printf("default Int: %d\ndefault Float: %f\ndefault String: %s\ndefault Bool: %t\n", defaultInt, defaultFloat, defaultString, defaultBool)

	// constants

	const pi = 3.1415926
	const (
		Monday    = 1
		Tuesday   = "2"
		Wednesday = 3.00
	)

	fmt.Printf("Monday %d, Tuesday %s, Wednesday %f\n", Monday, Tuesday, Wednesday)

	const typedAge int = 19
	const unTypedAge = 19

	fmt.Printf("typedAge %d, unTypedAge %d\n", typedAge, unTypedAge)

	const (
		Jan int = iota + 1
		Feb
		Mar
		Apr
	)

	fmt.Printf("jan = %d, Feb = %d, Mar = %d, Apr = %d,\n", Jan, Feb, Mar, Apr)

	// functions

	result := add(2, 3)
	fmt.Printf("2 + 3 = %d\n", result)

	sum, product := calculateSumAndProduct(54, 56)
	fmt.Printf("this is the sum %d and this is the product %d\n", sum, product)
}

func add(a int, b int) int {
	return a + b
}

func calculateSumAndProduct(a, b int) (int, int) {
	return a + b, a * b
}

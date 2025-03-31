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

	type Address struct {
		Street string
		City   string
	}

	type Contact struct {
		Name    string
		Phone   string
		Address Address
	}

	contact := Contact{
		Name:  "John Doe",
		Phone: "0800000000",
		Address: Address{
			Street: "123",
			City:   "San Jose",
		},
	}

	fmt.Println("This is our contact", contact)

	fmt.Println("name before", person.Name)
	// call by Reference
	// so struct will be modified inside the main block too as it is same
	modifyPersonName(&person)
	fmt.Println("name after modification", person.Name)

	x := 20
	ptr := &x
	fmt.Printf("Value of x: %d and Address of x: %p\n", x, ptr)
	*ptr = 30 // dereference the Pointer
	fmt.Printf("Value of new x: %d and Address of new x: %p\n", x, ptr)

	// modifyPersonNameOnStruct() does not exist in the scope it only exist as a Method of Person Struct
	person.modifyPersonNameOnStruct("Tatai Manik")
	fmt.Println("name after modification =>", person.Name)

	/*
		When you should use Methods for directly modifying the value =>
		For example you have Helper functions which have sole purpose to modify the value then you should use directly modifying it
	*/

}

func modifyPersonName(person *Person) {
	person.Name = "RANIT MANIK"
	fmt.Println("inside scope: New Name =>", person.Name)
}

// (p *Person) is called a Method Receiver
func (p *Person) modifyPersonNameOnStruct(name string) {
	p.Name = name
}

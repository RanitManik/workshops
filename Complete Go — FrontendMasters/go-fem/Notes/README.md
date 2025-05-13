# 1 - functions are first-class citizens

When we say **"functions are first-class citizens"** in **Go**, we mean that functions in Go are treated like any other
**values** or **variables**. You can:

### ✅ Assign functions to variables

```go
package main

import "fmt"

func greet(name string) {
	fmt.Println("Hello,", name)
}

func main() {
	f := greet // assigning the function to a variable
	f("Ranit") // calling via the variable
}
```

---

### ✅ Pass functions as arguments

```go
func operate(a int, b int, f func(int, int) int) int {
return f(a, b)
}

func add(x, y int) int {
return x + y
}

func main() {
result := operate(3, 4, add)
fmt.Println(result) // Output: 7
}
```

---

### ✅ Return functions from other functions

```go
func multiplier(factor int) func (int) int {
return func (x int) int {
return x * factor
}
}

func main() {
double := multiplier(2)
fmt.Println(double(5)) // Output: 10
}
```

---

### TL;DR

In Go, functions can:

- Be assigned to variables
- Be passed as parameters
- Be returned from other functions
- Be stored in data structures

All of that means **functions are first-class citizens**—just like numbers, strings, or structs.

Let me know if you want a real-world use case (like middleware, callbacks, etc.)!
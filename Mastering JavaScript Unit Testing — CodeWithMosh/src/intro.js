// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Lesson: test average calculator function
export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;
  if (numbers.length === 1) {
    return numbers[0];
  }
  return numbers.reduce((sum, current) => sum + current) / numbers.length;
}

// Exercise: FizzBuzz
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

// Exercise: Factorial
export function factorial(n) {
  if (typeof n !== "number") return undefined;
  if (n < 0) return undefined;

  if (n === 0 || n === 1) return 1;

  return n * factorial(n - 1);
}

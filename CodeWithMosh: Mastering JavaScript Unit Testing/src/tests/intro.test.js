import { describe, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // AAA => Arrange + Act + Assert
    /*
    // Arrange
    const a = 1;
    const b = 3;

    // Act
    const result = max(a, b);

    // Assert
    expect(result).toBe(3);
    */

    /* For simpler use cases don't have to define AAA phases, can do directly */
    expect(max(1, 2)).toBe(2);
  });
});

describe("max", () => {
  it("should return the second argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });
});

describe("max", () => {
  it("should return the first argument both arguments are same", () => {
    expect(max(2, 2)).toBe(2);
  });
});

/* ----------------------- EXERCISE ----------------------------- */

/* describe("FizzBuzz", () => {
  it("should return 'Fizz' if the argument is only devisable by 3 but not 5", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
});

describe("FizzBuzz", () => {
  it("should return 'Buzz' if the argument is only devisable by 5 but not 3", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
});

describe("FizzBuzz", () => {
  it("should return 'FizzBuzz' if the argument is devisable by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
});

describe("FizzBuzz", () => {
  it("should return 'n' if the argument is devisable by none among 3 and 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});
 */

// it’s better to group all the individual `it` blocks under a single `describe` block.
describe("FizzBuzz", () => {
  it("should return 'Fizz' if the argument is only divisible by 3 but not 5", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return 'Buzz' if the argument is only divisible by 5 but not 3", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return 'FizzBuzz' if the argument is divisible by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return 'n' if the argument is divisible by neither 3 nor 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

describe("calculateAverage", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should return first element of the array if given an array of length 1", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should return the average of all elements of the array if the array has a length greater than 1", () => {
    // combine similar testcases in a `it` group
    expect(calculateAverage([1, 2])).toBe(1.5);
    expect(calculateAverage([-1, 2])).toBe(0.5);
    expect(calculateAverage([1, -4, 79, 48, 47, -102, 12, 4, -454, 1000])).toBe(
      63.1,
    );
  });
});

describe("factorial", () => {
  it("should return undefined for no arguments", () => {
    expect(factorial()).toBeUndefined;
  });

  it("should return `undefined` for negative numbers", () => {
    expect(factorial(-1)).toBeUndefined;
    expect(factorial(-2324)).toBeUndefined;
    expect(factorial(-142642)).toBeUndefined;
  });

  it("should return `1` for argument `0` or `1`", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it("should return `2` for argument `2`", () => {
    expect(factorial(2)).toBe(2);
  });

  it("should return `6` for argument `3`", () => {
    expect(factorial(3)).toBe(6);
  });

  it("should return `24` for argument `4`", () => {
    expect(factorial(4)).toBe(24);
  });

  it("should return `120` for argument `5`", () => {
    expect(factorial(5)).toBe(120);
  });

  it("should return `720` for argument `6`", () => {
    expect(factorial(6)).toBe(720);
  });

  it("should return `5040` for argument `7`", () => {
    expect(factorial(7)).toBe(5040);
  });
});

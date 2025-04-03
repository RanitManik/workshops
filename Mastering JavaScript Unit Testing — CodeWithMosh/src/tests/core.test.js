import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../core";

describe("test-suite", () => {
  it("test case", () => {
    const result1 = { name: "Mosh" };
    expect(result1).toEqual({ name: "Mosh" });

    /* ------------------------------------------------- */

    const result2 = "The requested file was not found!";
    // Loose (too general) assertion
    expect(result2).toBeDefined;

    // Tight (too specific) assertion
    /*
    * failed Test 
    expect(result2).toBe("The requested file was not found."); 
    */

    // Better assertion
    expect(result2).toMatch("not found"); // can add regex

    /* ------------------------------------------------- */

    const result3 = [1, 3, 2, 4];

    // Loose (too general) assertion
    expect(result3).toBeDefined;

    // Tight (too specific) assertion
    /*
    * failed test 
    expect(result3).toEqual([1, 2, 3]); 
    */

    // Better assertion

    // option 1
    expect(result3).toEqual(expect.arrayContaining([1, 2, 3]));

    // option 2
    expect(result3.length).toBeGreaterThan(0);

    /* ------------------------------------------------- */

    const result4 = { name: "Ranit", roll: 34 };

    // option 1
    expect(result4).toMatchObject({ name: "Ranit" });

    // option 2
    expect(result4).toHaveProperty("name");

    // option 3
    expect(typeof result4.name).toBe("string");
  });
});

// Exercise Solution: Writing good assertions
/*
 * Our test cases should test a single behavior in a suite
 * that does not mean we should have a single assertion in a test case
 * in this example we have all logically same assertions in one test case
 * that are testing a specific behavior and have single responsibility
 */
describe("coupons test", () => {
  it("should return array of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy(); // if empty string test fails
    });
  });

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid string discount code", () => {
    expect(calculateDiscount(10, "SAVE30")).toBe(10);
  });
});

describe("validate user input", () => {
  // positive tests
  it("should return success if given valid input", () => {
    expect(validateUserInput("Ranit", 19)).toMatch(/success/i);
  });

  // negative tests
  it("should return error if username is not a string", () => {
    expect(validateUserInput(1, 19)).toMatch(/invalid/i);
  });

  it("should return error if username is less than 3 characters", () => {
    expect(validateUserInput("rm", 19)).toMatch(/invalid/i);
  });

  it("should return error if username is longer than 25 characters", () => {
    expect(validateUserInput("A".repeat(26), 19)).toMatch(/invalid/i);
  });

  it("should return error if age is not a number", () => {
    expect(validateUserInput("Ranit", "19")).toMatch(/invalid/i);
  });

  it("should return error if age is less than 18", () => {
    expect(validateUserInput("Ranit", 17)).toMatch(/invalid/i);
  });

  it("should return error if age is greater than 100", () => {
    expect(validateUserInput("some old folk", 101)).toMatch(/invalid/i);
  });

  // tighter assertion
  it("should return error if both age and username are invalid", () => {
    expect(validateUserInput(10, "Ranit")).toMatch(/invalid username/i);
    expect(validateUserInput(10, "Ranit")).toMatch(/invalid age/i);
  });
});

// boundary testing
describe("isPriceInRange", () => {
  // data driven test / parameterized test
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price = min", price: 0, result: true },
    { scenario: "max < price < min", price: 50, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > max", price: 110, result: false },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });

  /* 
  it("should return false when price is out of the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(110, 0, 100)).toBe(false);
  });

  it("should return true when price is equal to the min or to the max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true when price is within the range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  }); 
  */
});

describe("isValidUserName", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });

  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username is at the min and max length (Boundary)", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });

  it("should return true if username is within the min and max length (constraint)", () => {
    expect(isValidUsername("a".repeat((minLength + maxLength) / 2))).toBe(true);
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
  });

  it("should return false invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe("canDrive", () => {
  it("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });

  /*  
  it("should return false for underage in us", () => {
    expect(canDrive(15, "US")).toBe(false);
  });

  it("should return true for min age in us", () => {
    expect(canDrive(16, "US")).toBe(true);
  });

  it("should return true for eligible age in us", () => {
    expect(canDrive(17, "US")).toBe(true);
  });

  it("should return false for underage in uk", () => {
    expect(canDrive(16, "UK")).toBe(false);
  });

  it("should return true for min age in uk", () => {
    expect(canDrive(17, "UK")).toBe(true);
  });

  it("should return true for eligible age in uk", () => {
    expect(canDrive(18, "UK")).toBe(true);
  }); 
  */

  // parametrized test
  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])(
    "should return $result for age $age, $country",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    },
  );
});

// Asynchronous tests
describe("fetchData", () => {
  it("should return a promise that will resolve to an array of numbers", async () => {
    try {
      const result = await fetchData();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty("reason");
      expect(error.reason).toMatch(/FAILED/i);
    }
  });
});

describe("test suite", () => {
  beforeAll(() => {
    console.log("beforeAll called");
  });

  beforeEach(() => {
    console.log("BeforeEach called");
  });

  afterEach(() => {
    console.log("afterEach called");
  });

  afterAll(() => {
    console.log("afterAll called");
  });

  it("test case 1", () => {});
  it("test case 2", () => {});
});

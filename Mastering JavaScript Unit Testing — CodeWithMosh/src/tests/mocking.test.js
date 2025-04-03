import { describe, vi, it, expect } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";
import { trackPageView } from "../libs/analytics";
import { charge } from "../libs/payment";
import { sendEmail } from "../libs/email";
import security from "../libs/security";

vi.mock("../libs/currency", () => ({
  getExchangeRate: vi.fn(), // Create a mock function
}));

vi.mock("../libs/shipping", () => {
  return { getShippingQuote: vi.fn() };
});

vi.mock("../libs/analytics");
vi.mock("../libs/payment");

// Partial Mocking
vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();

  return { ...originalModule, sendEmail: vi.fn() };
});

describe("test suite", () => {
  it("should do something", () => {
    const greet = vi.fn();

    // mockReturnValue
    // mockResolvedValue
    // mockImplementation
    greet.mockImplementation((name) => "Hello " + name);

    greet("Ranit");

    expect(greet).toHaveBeenCalled();
    expect(greet).toBeCalledWith("Ranit");
    expect(greet).toHaveBeenCalledOnce();
  });
});

describe("mock test suite", () => {
  it("should mock function", () => {
    // create a mock for the following function
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");
    // sendText(message) {}

    // call the mock function
    const result = sendText("Ranit");

    // Assert that the function is called
    expect(sendText).toHaveBeenCalled();
    // Assert the result is ok
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    // Arrange
    getExchangeRate.mockReturnValue(1.5); // Properly mock the function

    // Act
    const price = getPriceInCurrency(10, "AUD");

    // Assert
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return `Shipping Unavailable` if quote cannot be fetched", () => {
    // Arrange
    getShippingQuote.mockReturnValue(null);

    // Act
    const result = getShippingInfo("Mumbai");

    // Assert
    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping info if quote can be fetched", () => {
    // Arrange
    getShippingQuote.mockReturnValue({ cost: 10, estimatedDays: 2 });

    // Act
    const result = getShippingInfo("Mumbai");

    // Assert
    expect(result).toMatch("$10");
    expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i); // Air Tight Assertion
  });
});

describe("renderAge", () => {
  it("should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  // Arrange globally to prevent redundancy
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };

  it("should charge the customer", async () => {
    // Arrange
    // const order = { totalAmount: 10 };
    // const creditCard = { creditCardNumber: "1234" };
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    // Act
    await submitOrder(order, creditCard);

    // Assert
    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success when payment is successful", async () => {
    // Arrange
    // const order = { totalAmount: 10 };
    // const creditCard = { creditCardNumber: "1234" };
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    // Act
    const result = await submitOrder(order, creditCard);

    // Assert
    expect(result).toEqual({ success: true });
  });

  it("should return failed when payment is failed", async () => {
    // Arrange
    // const order = { totalAmount: 10 };
    // const creditCard = { creditCardNumber: "1234" };
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    // Act
    const result = await submitOrder(order, creditCard);

    // Assert
    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});

// partial Mocking
describe("signUp", () => {
  // beforeEach(() => {
  //   vi.mocked(sendEmail).mockClear();
  // });

  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });

  it("should return false for invalid email", async () => {
    // Arrange
    const email = "invalid-email";

    // Act
    const result = await signUp(email);

    // Assert
    expect(result).toBe(false);
  });

  it("should return true for invalid email", async () => {
    // Arrange
    const email = "ranitmanik.dev@gmail.com";

    // Act
    const result = await signUp(email);

    // Assert
    expect(result).toBe(true);
  });

  it("should send email for valid email", async () => {
    // Arrange
    const email = "ranitmanik.dev@gmail.com";

    // Act
    await signUp(email);

    // Assert
    expect(sendEmail).toHaveBeenCalledOnce();
    const [to, message] = vi.mocked(sendEmail).mock.calls[0];
    expect(to).toBe(email);
    expect(message).toMatch(/welcome/i);
  });
});

describe("login", () => {
  it("should email one-time login code", async () => {
    // Arrange
    const email = "name.domain.com";

    const spy = vi.spyOn(security, "generateCode");

    // Act
    await login(email);

    const oneTimeCode = String(spy.mock.results[0].value);

    // Assert
    expect(sendEmail).toHaveBeenCalledWith(email, oneTimeCode);
  });
});

describe("isOnline", () => {
  it("should return false if current hour is outside of opening hours", () => {
    vi.setSystemTime("2024-01-01 7:59");
    expect(isOnline()).toBe(false);

    vi.setSystemTime("2024-01-01 20:01");
    expect(isOnline()).toBe(false);
  });

  it("should return true if current hour is within the opening hours", () => {
    vi.setSystemTime("2024-01-01 8:00");
    expect(isOnline()).toBe(true);

    vi.setSystemTime("2024-01-01 19:59");
    expect(isOnline()).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import Greet from "../../src/components/Greet";
import "@testing-library/jest-dom/vitest";

describe("Greet", () => {
  it("should render Hello with the name when the name is provided", () => {
    render(<Greet name="Ranit" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  it("should render Login Button when the name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Login");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./CustomButton";

describe("CustomButton component", () => {
  test("renders with the correct content", () => {
    render(<CustomButton content="Click Me" onClick={() => {}} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies the correct className", () => {
    render(<CustomButton content="Click Me" onClick={() => {}} className="test-class" />);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("custom-button test-class");
  });

  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton content="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
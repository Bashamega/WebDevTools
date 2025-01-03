import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConversionCalculator from "../page";

describe("ConversionCalculator Component", () => {
  beforeEach(() => {
    render(<ConversionCalculator />);
  });

  test("renders without crashing and displays correct elements", () => {
    const fromInput = screen.getByTestId("from");
    const toInput = screen.getByTestId("to");
    const fromDropdown = screen.getByTestId("from-units-dropdown");
    const toDropdown = screen.getByTestId("to-units-dropdown");
    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });

    expect(fromInput).toBeInTheDocument();
    expect(toInput).toBeInTheDocument();
    expect(fromDropdown).toBeInTheDocument();
    expect(toDropdown).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();
  });

  test("calculates conversion correctly when input value changes", async () => {
    const fromInput = screen.getByTestId("from");
    fireEvent.change(fromInput, { target: { value: "20" } });

    await waitFor(() => {
      const toInput = screen.getByTestId("to") as HTMLInputElement;
      expect(toInput.value).toBe("20000"); // Adjust expected value based on conversion logic
    });
  });

  test("calculates conversion correctly when from unit changes", async () => {
    const fromDropdown = screen.getByTestId("from-units-dropdown");
    fireEvent.change(fromDropdown, { target: { value: "cm" } });

    await waitFor(() => {
      const toInput = screen.getByTestId("to") as HTMLInputElement;
      expect(toInput.value).toBe("0.1"); // Adjust expected value based on conversion logic
    });
  });

  test("calculates conversion correctly when to unit changes", async () => {
    const toDropdown = screen.getByTestId("to-units-dropdown");
    fireEvent.change(toDropdown, { target: { value: "cm" } });

    await waitFor(() => {
      const toInput = screen.getByTestId("to") as HTMLInputElement;
      expect(toInput.value).toBe("1000000"); // Adjust expected value based on conversion logic
    });
  });

  test("toggles dark mode correctly", () => {
    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });
    fireEvent.click(toggleButton);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("bg-gray-900", "text-gray-400");

    fireEvent.click(toggleButton);
    expect(mainElement).toHaveClass("bg-white", "text-gray-800");
  });
});

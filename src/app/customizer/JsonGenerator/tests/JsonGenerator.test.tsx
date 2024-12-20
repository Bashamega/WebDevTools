import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JsonGeneratorMain from "../page";

// Test suite for JsonGeneratorMain Component
describe("JsonGeneratorMain Component", () => {
  // Test component renders and displays correct title
  test("renders without crashing and displays correct title", () => {
    render(<JsonGeneratorMain />);
    const allTitleElements = screen.getAllByText("Json Generator");
    expect(allTitleElements).toHaveLength(1);
  });

  // Test dark mode toggle functionality
  test("passes isDarkMode prop correctly to child components", async () => {
    render(<JsonGeneratorMain />);
    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });
    const mainElement = screen.getByRole("main");

    // Initial state: light mode
    expect(mainElement).toHaveClass("bg-white", "text-gray-800");

    // Toggle dark mode
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const navBar = screen.getByRole("navigation");
      expect(navBar).toHaveClass("bg-gray-800");
    });

    expect(mainElement).toHaveClass("bg-gray-900", "text-gray-400");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Heroish from "../components/Heroish";

// Test suite for Heroish Component
describe("Heroish Component", () => {
  // Test that main heading renders
  test("renders the main heading", () => {
    render(<Heroish />);
    const heading = screen.getByRole("heading", { name: /Json Generator/i });
    expect(heading).toBeInTheDocument();
  });

  // Test that description paragraph renders
  test("renders the description paragraph", () => {
    render(<Heroish />);
    const descriptionText =
      "Generate custom JSON data quickly and easily. Populate your applications with realistic-looking data for prototyping, testing, and more.";
    const description = screen.getByText(descriptionText);
    expect(description).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardForm from "../components/CardForm";
import { saveAs } from "file-saver";

// Mock external dependencies
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

// Test suite for CardForm Component
describe("CardForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Renders FieldsSection correctly
  test("renders the FieldsSection component", () => {
    render(<CardForm isDarkMode={false} />);
    expect(screen.getByText("Field Name")).toBeInTheDocument();
    expect(screen.getByText("Field Type")).toBeInTheDocument();
  });

  // Renders initial fields correctly
  test("renders the initial fields from Init.jsx", () => {
    render(<CardForm isDarkMode={false} />);
    const allTextInputs = screen.getAllByRole("textbox");
    const fieldNameInputs = allTextInputs.filter(
      (input) => input.getAttribute("name") === "fieldName",
    );
    expect(fieldNameInputs.length).toBe(3);
    const initialFieldNames = fieldNameInputs.map((input) => input.value);
    expect(initialFieldNames).toEqual(["id", "first_name", "last_name"]);
  });

  // Adds a new field when button clicked
  test('adds a new field when "ADD ANOTHER FIELD" button is clicked', () => {
    render(<CardForm isDarkMode={false} />);
    const addButton = screen.getByRole("button", {
      name: /add another field/i,
    });
    fireEvent.click(addButton);
    const fieldInputs = screen.getAllByRole("textbox");
    expect(fieldInputs.length).toBeGreaterThan(1);
  });

  // Removes a field when remove button clicked
  test("removes a field when the remove button is clicked", () => {
    render(<CardForm isDarkMode={false} />);
    const removeButtons = screen.getAllByRole("button", {
      name: /remove field/i,
    });
    const initialFieldCount = removeButtons.length;
    fireEvent.click(removeButtons[0]);
    const updatedRemoveButtons = screen.queryAllByRole("button", {
      name: /remove field/i,
    });
    expect(updatedRemoveButtons.length).toBe(initialFieldCount - 1);
  });

  // Generates JSON and downloads file
  test('generates JSON data and downloads file when "Export" button is clicked', async () => {
    render(<CardForm isDarkMode={false} />);
    const generateButton = screen.getByRole("button", { name: /export/i });
    fireEvent.click(generateButton);
    await waitFor(() => {
      expect(saveAs).toHaveBeenCalledTimes(1);
    });
    const filename = saveAs.mock.calls[0][1];
    expect(filename).toBe("WebDevTools.json");
  });

  // Shows preview when "Preview" button clicked
  test('shows preview when "Preview" button is clicked', async () => {
    render(<CardForm isDarkMode={false} />);
    const fieldTypeSelects = screen.getAllByRole("combobox");
    fieldTypeSelects.forEach((select) => {
      fireEvent.change(select, { target: { value: "int" } });
    });
    const modalHeading = await screen.findByText(/preview/i);
    expect(modalHeading).toBeInTheDocument();
  });
});

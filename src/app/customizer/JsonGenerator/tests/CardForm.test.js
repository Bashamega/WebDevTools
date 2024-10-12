import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardForm, { exportJsonData } from "../components/CardForm";
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
    // Change all field types to "int" so preview button is enabled
    fieldTypeSelects.forEach((select) => {
      fireEvent.change(select, { target: { value: "int" } });
    });
    // Click the preview button
    const previewButton = await screen.getByRole("button", {
      name: /preview/i,
    });
    fireEvent.click(previewButton);
    // Check if the preview text is displayed
    const previewSectionHeader = await screen.getByText("Preview", {
      selector: "span:not(button span)",
    });
    expect(previewSectionHeader).toBeInTheDocument();
  });

  test("handles bigint values by converting them to strings", async () => {
    // Arrange: Create a response data containing a bigint value
    const responseData = [
      {
        id: "123",
        largeNumber: BigInt(9007199254740991), // A sample bigint
      },
    ];

    // Act: Call the exportJsonData function
    exportJsonData(responseData);

    // Extract the Blob passed to saveAs
    const blob = saveAs.mock.calls[0][0];

    // Use a FileReader to read the Blob content
    const reader = new FileReader();
    reader.readAsText(blob);

    // Wait for the FileReader to load the contents
    await new Promise((resolve) => {
      reader.onloadend = resolve;
    });

    // Parse the Blob content as JSON
    const jsonContent = JSON.parse(reader.result);

    // Assert that the bigint was stringified correctly
    expect(jsonContent[0].largeNumber).toBe("9007199254740991");
    expect(saveAs).toHaveBeenCalledTimes(1);
  });

  test("generates correct output in the preview after changing field type", async () => {
    // Arrange: Render the CardForm component
    render(<CardForm isDarkMode={false} />);

    // Find the dropdown for field types (assuming it's a select element)
    const fieldTypeSelects = screen.getAllByRole("combobox");

    // Set initial field type to "int"
    fireEvent.change(fieldTypeSelects[0], { target: { value: "int" } });

    // Now, change the field type to "firstName"
    fireEvent.change(fieldTypeSelects[0], { target: { value: "firstName" } });

    // Simulate clicking the preview button to show the JSON output on the screen
    const previewButton = screen.getByRole("button", { name: /preview/i });
    fireEvent.click(previewButton);

    // Wait for the JSON preview to be rendered
    await waitFor(() =>
      screen.getByText("Preview", {
        selector: "span:not(button span)",
      }),
    );

    // Find the previewed JSON (assuming it appears in a <pre> or <div> tag)
    const previewOutput = screen.getByTestId("preview-json"); // Adjust this based on your DOM structure

    // Parse the JSON output from the preview section
    const jsonContent = JSON.parse(previewOutput.textContent);

    // Assert: Check that one of the fields in the generated JSON has a "firstName" value
    const generatedFieldValues = Object.values(jsonContent[0]);

    // Check that one of the generated values is a string, since firstName should generate a string
    const isFirstNameGenerated = generatedFieldValues.some(
      (value) => typeof value === "string" && /^[A-Z][a-z]+$/.test(value), // Example regex for a name
    );

    expect(isFirstNameGenerated).toBe(true); // Expect that a firstName-like value was generated
  });

  test("updates the preview output after closing and changing field type", async () => {
    // Arrange: Render the CardForm component
    render(<CardForm isDarkMode={false} />);

    // Find the dropdown for field types (assuming it's a select element)
    const fieldTypeSelects = screen.getAllByRole("combobox");

    // Set initial field type to "int"
    fireEvent.change(fieldTypeSelects[0], { target: { value: "int" } });

    // Simulate clicking the preview button to show the JSON output on the screen
    const previewButton = screen.getByRole("button", { name: /preview/i });
    fireEvent.click(previewButton);

    // Wait for the preview to be rendered
    await waitFor(() =>
      screen.getByText("Preview", {
        selector: "span:not(button span)",
      }),
    );

    // Find the previewed JSON (assuming it appears in a <pre> or <div> tag)
    const previewOutput = screen.getByTestId("preview-json"); // Adjust based on your DOM structure

    // Parse the JSON output from the preview section
    const jsonContent = JSON.parse(previewOutput.textContent);

    // Assert: Check that the initial field type "int" generates a number
    const generatedIntValue = Object.values(jsonContent[0]).some(
      (value) => typeof value === "number",
    );
    expect(generatedIntValue).toBe(true);

    // Close the preview by clicking the 'X' span (assuming the 'X' closes the preview)
    const closeButton = screen.getByText("x"); // Adjust the selector if needed
    fireEvent.click(closeButton);

    // Change the field type to "firstName"
    fireEvent.change(fieldTypeSelects[0], { target: { value: "firstName" } });

    // Simulate clicking the preview button again to show the updated JSON output
    fireEvent.click(previewButton);

    // Wait for the preview to be rendered again
    await waitFor(() =>
      screen.getByText("Preview", {
        selector: "span:not(button span)",
      }),
    );

    // Find the updated previewed JSON
    const updatedPreviewOutput = screen.getByTestId("preview-json");

    // Parse the updated JSON output
    const updatedJsonContent = JSON.parse(updatedPreviewOutput.textContent);

    // Assert: Check that the new field type "firstName" generates a string
    const generatedFirstNameValue = Object.values(updatedJsonContent[0]).some(
      (value) => typeof value === "string" && /^[A-Z][a-z]+$/.test(value), // Example regex for a name
    );
    expect(generatedFirstNameValue).toBe(true);
  });

  test("updates preview after adding a field and setting its type", async () => {
    // Arrange: Render the CardForm component with 3 default fields and 5 entries in the preview
    render(<CardForm isDarkMode={true} />);

    // Ensure the initial fields have types (necessary for preview to be enabled)
    const fieldTypeSelects = screen.getAllByRole("combobox");

    // Set the initial types for the existing fields
    fireEvent.change(fieldTypeSelects[0], { target: { value: "int" } });
    fireEvent.change(fieldTypeSelects[1], { target: { value: "firstName" } });
    fireEvent.change(fieldTypeSelects[2], { target: { value: "lastName" } });

    // Simulate clicking the preview button to generate JSON with the initial fields
    const previewButton = screen.getByRole("button", { name: /preview/i });
    fireEvent.click(previewButton);

    // Wait for the preview to be rendered
    await waitFor(() =>
      screen.getByText("Preview", {
        selector: "span:not(button span)",
      }),
    );

    // Find the previewed JSON
    const previewOutput = screen.getByTestId("preview-json");

    // Parse the JSON output and check the number of entries (rows)
    const jsonContent = JSON.parse(previewOutput.textContent);
    expect(jsonContent.length).toBe(5); // Expect 5 entries (rows)

    // Check that each entry has 3 fields initially
    jsonContent.forEach((entry) => {
      expect(Object.keys(entry).length).toBe(3); // Each entry should have 3 fields
    });

    // Now, click the 'ADD ANOTHER FIELD' button to add a new field
    const addFieldButton = screen.getByText(/add another field/i);
    fireEvent.click(addFieldButton);

    // The preview should NOT change because the new field has no type yet
    fireEvent.click(previewButton);
    const unchangedPreviewOutput = screen.getByTestId("preview-json");
    const unchangedJsonContent = JSON.parse(unchangedPreviewOutput.textContent);
    expect(unchangedJsonContent.length).toBe(5); // Still expect 5 entries

    // Each entry should still have 3 fields (since new field doesn't have a type yet)
    unchangedJsonContent.forEach((entry) => {
      expect(Object.keys(entry).length).toBe(3); // Fields count remains 3
    });

    // Now, set the new field's type to "firstName"
    const updatedFieldTypeSelects = screen.getAllByRole("combobox");
    fireEvent.change(updatedFieldTypeSelects[3], {
      target: { value: "firstName" },
    }); // Select the new field type

    // Simulate clicking the preview button again after setting the type
    fireEvent.click(previewButton);

    // Wait for the preview to be rendered again
    await waitFor(() =>
      screen.getByText("Preview", {
        selector: "span:not(button span)",
      }),
    );

    // Find the updated previewed JSON
    const updatedPreviewOutput = screen.getByTestId("preview-json");

    // Parse the updated JSON output and check the number of entries
    const updatedJsonContent = JSON.parse(updatedPreviewOutput.textContent);
    expect(updatedJsonContent.length).toBe(5); // Still 5 entries

    // Check that each entry now has 4 fields (3 original fields + 1 new field)
    updatedJsonContent.forEach((entry) => {
      expect(Object.keys(entry).length).toBe(4); // Fields count should be 4 after adding the new field
    });
  });
});

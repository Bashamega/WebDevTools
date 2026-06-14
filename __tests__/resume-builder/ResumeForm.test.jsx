import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResumeForm from "@/app/resume-builder/ResumeForm";
import { defaultResumeData } from "@/app/resume-builder/defaultResumeData";

describe("ResumeForm", () => {
  const onFormChange = jest.fn();

  beforeEach(() => {
    onFormChange.mockClear();
  });

  test("renders core fields and updates parent state on text input change", () => {
    render(
      <ResumeForm
        isDarkMode={false}
        onFormChange={onFormChange}
        initialData={defaultResumeData}
      />,
    );

    const nameInput = screen.getByPlaceholderText("John Doe");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(nameInput).toHaveValue("Jane Doe");
    expect(onFormChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Jane Doe" }),
    );
  });

  test("updates links nested state and notifies parent", () => {
    render(
      <ResumeForm
        isDarkMode={false}
        onFormChange={onFormChange}
        initialData={defaultResumeData}
      />,
    );

    const linkedinInput = screen.getByPlaceholderText(
      "https://www.linkedin.com/in/johndev/",
    );
    fireEvent.change(linkedinInput, {
      target: { value: "https://linkedin.com/jane-doe" },
    });

    expect(linkedinInput).toHaveValue("https://linkedin.com/jane-doe");
    expect(onFormChange).toHaveBeenCalledWith(
      expect.objectContaining({
        links: expect.objectContaining({
          linkedIn: "https://linkedin.com/jane-doe",
        }),
      }),
    );
  });

  test("adds a new work experience row and triggers parent update", () => {
    render(
      <ResumeForm
        isDarkMode={false}
        onFormChange={onFormChange}
        initialData={defaultResumeData}
      />,
    );

    const addButton = screen.getByRole("button", {
      name: /Add Work Experience/i,
    });
    fireEvent.click(addButton);

    expect(onFormChange).toHaveBeenCalledWith(
      expect.objectContaining({
        workExperience: expect.arrayContaining([
          expect.objectContaining({ title: "", company: "", description: "" }),
        ]),
      }),
    );
    expect(onFormChange.mock.calls[0][0].workExperience).toHaveLength(2);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BadgeForm from "@/app/badge-maker/BadgeForm";

const TEXT_FIELDS = [
  "Badge Label",
  "Badge Message",
  "Logo (Base64 - optional)",
  "Links (one per line - optional)",
];

const STYLES = ["flat", "flat-square", "plastic", "for-the-badge", "social"];

const renderForm = (props = {}) => {
  const onSubmit = jest.fn();
  const utils = render(<BadgeForm onSubmit={onSubmit} {...props} />);
  return { onSubmit, ...utils };
};

const type = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Generate Badge" }));

describe("Badge Maker form rendering", () => {
  test("renders the heading, every field with its default, and the button", () => {
    renderForm();

    expect(
      screen.getByRole("heading", { name: "Badge Customizer" }),
    ).toBeInTheDocument();
    for (const label of TEXT_FIELDS) {
      expect(screen.getByLabelText(label)).toHaveValue("");
    }
    expect(screen.getByLabelText("Label Color")).toHaveAttribute(
      "type",
      "color",
    );
    expect(screen.getByLabelText("Badge Color")).toHaveAttribute(
      "type",
      "color",
    );
    expect(screen.getByLabelText("Badge Style")).toHaveValue("flat");
    expect(screen.getAllByRole("option").map((option) => option.value)).toEqual(
      STYLES,
    );
    expect(
      screen.getByRole("button", { name: "Generate Badge" }),
    ).toBeInTheDocument();
  });

  test("uses the dark background when isDarkMode is true", () => {
    const { container } = renderForm({ isDarkMode: true });

    expect(container.firstChild).toHaveClass("bg-gray-900");
    expect(container.firstChild).not.toHaveClass("bg-gray-100");
  });

  test("uses the light background when isDarkMode is false", () => {
    const { container } = renderForm({ isDarkMode: false });

    expect(container.firstChild).toHaveClass("bg-gray-100");
    expect(container.firstChild).not.toHaveClass("bg-gray-900");
  });
});

describe("Badge Maker form interactions", () => {
  test("typing into each text field updates its value", () => {
    renderForm();

    for (const label of TEXT_FIELDS) {
      type(label, `${label} text`);
      expect(screen.getByLabelText(label)).toHaveValue(`${label} text`);
    }
  });

  test("picking colors and a style updates those controls", () => {
    renderForm();

    type("Label Color", "#123456");
    type("Badge Color", "#abcdef");
    type("Badge Style", "for-the-badge");

    expect(screen.getByLabelText("Label Color")).toHaveValue("#123456");
    expect(screen.getByLabelText("Badge Color")).toHaveValue("#abcdef");
    expect(screen.getByLabelText("Badge Style")).toHaveValue("for-the-badge");
  });

  test("submitting sends every field to onSubmit", () => {
    const { onSubmit } = renderForm();

    type("Badge Label", "build");
    type("Badge Message", "passing");
    type("Label Color", "#123456");
    type("Badge Color", "#abcdef");
    type("Logo (Base64 - optional)", "data:image/png;base64,AAAA");
    type("Links (one per line - optional)", "https://example.com");
    type("Badge Style", "plastic");
    submit();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      label: "build",
      message: "passing",
      labelColor: "#123456",
      color: "#abcdef",
      logoBase64: "data:image/png;base64,AAAA",
      links: ["https://example.com"],
      style: "plastic",
    });
  });

  test("submitting with only a label and message sends the defaults", () => {
    const { onSubmit } = renderForm();

    type("Badge Label", "build");
    type("Badge Message", "passing");
    submit();

    expect(onSubmit).toHaveBeenCalledWith({
      label: "build",
      message: "passing",
      labelColor: "",
      color: "",
      logoBase64: "",
      links: [],
      style: "flat",
    });
  });

  test("links are split per line, trimmed, and blank lines dropped", () => {
    const { onSubmit } = renderForm();

    type(
      "Links (one per line - optional)",
      "  https://a.dev  \n\n   \nhttps://b.dev\n",
    );
    submit();

    expect(onSubmit.mock.calls[0][0].links).toEqual([
      "https://a.dev",
      "https://b.dev",
    ]);
  });
});

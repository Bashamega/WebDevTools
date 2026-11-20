import React from "react";
import { render, screen, fireEvent, getNodeText } from "@testing-library/react";
import CupcakeIpsumGenerator from "@/app/customizer/CupcakeIpsumGenerator/page";

const PARAGRAPH_START = "Cupcake ipsum dolor";

const countParagraphs = (text) => text.split(PARAGRAPH_START).length - 1;

// The generated text is a bare text node in the output box, so read it raw.
const getOutputText = () =>
  getNodeText(screen.getByText(new RegExp(PARAGRAPH_START)));

beforeEach(() => {
  localStorage.clear();
});

describe("Cupcake Ipsum generator rendering", () => {
  test("renders the heading, the count input set to 1, both buttons, and no text yet", () => {
    render(<CupcakeIpsumGenerator />);

    expect(
      screen.getByRole("heading", { name: "Cupcake Ipsum Generator" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Number of cupcakes:")).toHaveValue(1);
    expect(
      screen.getByRole("button", { name: "Generate" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(
      screen.queryByText(new RegExp(PARAGRAPH_START)),
    ).not.toBeInTheDocument();
  });
});

describe("Cupcake Ipsum generator generating", () => {
  test("Generate with the default count gives one paragraph", () => {
    render(<CupcakeIpsumGenerator />);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(countParagraphs(getOutputText())).toBe(1);
  });

  test("changing the count to 3 gives three paragraphs", () => {
    render(<CupcakeIpsumGenerator />);

    const input = screen.getByLabelText("Number of cupcakes:");
    fireEvent.change(input, { target: { value: "3" } });
    expect(input).toHaveValue(3);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(countParagraphs(getOutputText())).toBe(3);
  });
});

describe("Cupcake Ipsum generator copying", () => {
  let writeText;

  beforeEach(() => {
    // jsdom does not implement navigator.clipboard.
    writeText = jest.fn();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  afterEach(() => {
    delete navigator.clipboard;
  });

  test("Copy sends the generated text to the clipboard and shows a confirmation", () => {
    render(<CupcakeIpsumGenerator />);

    fireEvent.change(screen.getByLabelText("Number of cupcakes:"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    // Capture the text before Copy replaces it with the confirmation.
    const generated = getOutputText();
    expect(countParagraphs(generated)).toBe(2);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(generated);
    expect(screen.getByText("Text copied successfully")).toBeInTheDocument();
    expect(
      screen.queryByText(new RegExp(PARAGRAPH_START)),
    ).not.toBeInTheDocument();
  });
});

describe("Cupcake Ipsum generator theme", () => {
  test("the theme toggle switches to dark colors and saves it", () => {
    const { container } = render(<CupcakeIpsumGenerator />);
    const main = container.querySelector("main");
    expect(main).toHaveClass("bg-white");

    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));

    expect(main).toHaveClass("bg-gray-900");
    expect(localStorage.getItem("theme")).toBe("true");
  });

  test("a saved dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");

    const { container } = render(<CupcakeIpsumGenerator />);

    expect(container.querySelector("main")).toHaveClass("bg-gray-900");
  });
});

describe("Cupcake Ipsum generator light theme", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("a second toggle click returns to the light theme and saves it", () => {
    const { container } = render(<CupcakeIpsumGenerator />);
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(container.querySelector("main")).toHaveClass("bg-white");
    expect(localStorage.getItem("theme")).toBe("false");
  });

  test("a saved light theme loads as light", () => {
    localStorage.setItem("theme", "false");

    const { container } = render(<CupcakeIpsumGenerator />);

    expect(container.querySelector("main")).toHaveClass("bg-white");
  });

  test("a malformed saved theme is logged and the page stays usable in light mode", () => {
    // page.jsx catches the JSON.parse error and logs it with console.log.
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    localStorage.setItem("theme", "not-json");

    const { container } = render(<CupcakeIpsumGenerator />);

    expect(logSpy).toHaveBeenCalledWith("Failed to read localstorage");
    expect(container.querySelector("main")).toHaveClass("bg-white");
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    expect(countParagraphs(getOutputText())).toBe(1);
  });
});

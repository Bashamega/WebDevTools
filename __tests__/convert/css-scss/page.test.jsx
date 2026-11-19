import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CSS_TO_SCSS from "@/app/convert/css-scss/page";

const getInput = () => screen.getByPlaceholderText("Enter your scss here");

const getOutput = () => screen.getByPlaceholderText("Your css will be here");

const typeScss = (text) =>
  fireEvent.change(getInput(), { target: { value: text } });

const clickConvert = () =>
  fireEvent.click(screen.getByRole("button", { name: "Convert" }));

beforeEach(() => {
  // The navbar remembers the chosen theme in localStorage.
  localStorage.clear();
});

describe("SCSS to CSS converter rendering", () => {
  test("renders the navbar with a link home and the theme toggle", () => {
    render(<CSS_TO_SCSS />);

    expect(screen.getByRole("link", { name: "Web Dev Tools" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  test("renders the heading, the conversion direction and the Convert button", () => {
    render(<CSS_TO_SCSS />);

    expect(
      screen.getByRole("heading", { name: "Scss to css converter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "From scss to css" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Convert" })).toBeInTheDocument();
  });

  test("starts with an empty input and an empty result", () => {
    render(<CSS_TO_SCSS />);

    expect(getInput()).toHaveValue("");
    expect(getOutput()).toHaveValue("");
  });

  test("starts in light mode", () => {
    const { container } = render(<CSS_TO_SCSS />);

    expect(container.firstChild).toHaveClass("bg-white", "text-black");
    expect(document.documentElement).not.toHaveClass("dark");
  });
});

describe("SCSS to CSS converter interactions", () => {
  test("typing updates the input", () => {
    render(<CSS_TO_SCSS />);

    typeScss("a { color: red; }");

    expect(getInput()).toHaveValue("a { color: red; }");
  });

  test("typing alone does not convert", () => {
    render(<CSS_TO_SCSS />);

    typeScss("a { color: red; }");

    expect(getOutput()).toHaveValue("");
  });

  test("Convert turns plain SCSS rules into CSS", () => {
    render(<CSS_TO_SCSS />);

    typeScss("a { color: red; }");
    clickConvert();

    expect(getOutput()).toHaveValue("a {\n  color: red;\n}");
  });

  test("Convert resolves variables", () => {
    render(<CSS_TO_SCSS />);

    typeScss("$brand: #ff0000;\n.button { color: $brand; }");
    clickConvert();

    expect(getOutput()).toHaveValue(".button {\n  color: #ff0000;\n}");
  });

  test("Convert flattens nested rules and expands the parent selector", () => {
    render(<CSS_TO_SCSS />);

    typeScss(".nav { ul { margin: 0; } &:hover { color: blue; } }");
    clickConvert();

    expect(getOutput()).toHaveValue(
      ".nav ul {\n  margin: 0;\n}\n.nav:hover {\n  color: blue;\n}",
    );
  });

  test("Convert evaluates mixins and arithmetic", () => {
    render(<CSS_TO_SCSS />);

    typeScss(
      "@mixin pad($n) { padding: $n * 2px; }\n.box { @include pad(4); }",
    );
    clickConvert();

    expect(getOutput()).toHaveValue(".box {\n  padding: 8px;\n}");
  });

  test("converting again replaces the previous result", () => {
    render(<CSS_TO_SCSS />);

    typeScss("a { color: red; }");
    clickConvert();
    typeScss("p { margin: 0; }");
    clickConvert();

    expect(getOutput()).toHaveValue("p {\n  margin: 0;\n}");
  });

  test("Convert on an empty input keeps the result empty", () => {
    render(<CSS_TO_SCSS />);

    clickConvert();

    expect(getOutput()).toHaveValue("");
  });
});

describe("SCSS to CSS converter with invalid SCSS", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("an error is logged and no result is shown", () => {
    render(<CSS_TO_SCSS />);

    typeScss("a { color: ");
    clickConvert();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(getOutput()).toHaveValue("");
  });
});

describe("SCSS to CSS converter theme", () => {
  test("the toggle switches to dark mode and back", () => {
    const { container } = render(<CSS_TO_SCSS />);
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    fireEvent.click(toggle);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-white");
    expect(document.documentElement).toHaveClass("dark");
    expect(getInput()).toHaveClass("bg-gray-700");

    fireEvent.click(toggle);

    expect(container.firstChild).toHaveClass("bg-white", "text-black");
    expect(document.documentElement).not.toHaveClass("dark");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AsciiDocEditor from "@/app/asciiDoc/page";

jest.mock("@monaco-editor/react", () => ({
  Editor: ({ value, onChange, theme }) => (
    <textarea
      aria-label="AsciiDoc source"
      data-theme={theme}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

// Patches Asciidoctor so it can load under jsdom.
jest.mock("asciidoctor", () => {
  const { pathToFileURL } = require("url");

  const withPatches = (load) => {
    const argv = process.argv;
    Object.defineProperty(document, "currentScript", {
      value: { src: pathToFileURL(require.resolve("@asciidoctor/core")).href },
      configurable: true,
    });
    process.argv = [];
    try {
      return load();
    } finally {
      delete document.currentScript;
      process.argv = argv;
    }
  };

  const Asciidoctor = withPatches(() => jest.requireActual("asciidoctor"));
  return () => withPatches(() => Asciidoctor());
});

const getEditor = () => screen.getByLabelText("AsciiDoc source");

const getPreview = () => getEditor().nextElementSibling;

const typeSource = (text) =>
  fireEvent.change(getEditor(), { target: { value: text } });

beforeEach(() => {
  localStorage.clear();
});

describe("AsciiDoc editor rendering", () => {
  test("renders the navbar with the title and the theme toggle", () => {
    render(<AsciiDocEditor />);

    expect(screen.getByRole("link", { name: "Web Dev Tools" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("/ Ascii Doc Editor")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  test("starts with an empty editor and an empty preview", () => {
    render(<AsciiDocEditor />);

    expect(getEditor()).toHaveValue("");
    expect(getPreview()).toBeEmptyDOMElement();
  });

  test("starts in light mode", () => {
    const { container } = render(<AsciiDocEditor />);

    expect(container.firstChild).toHaveClass("bg-white", "text-gray-800");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-light");
  });
});

describe("AsciiDoc editor interactions", () => {
  test("typing a section title shows a heading", () => {
    render(<AsciiDocEditor />);

    typeSource("== My Section");

    expect(
      screen.getByRole("heading", { level: 2, name: "My Section" }),
    ).toBeInTheDocument();
  });

  test("typing a document title shows only the body", () => {
    render(<AsciiDocEditor />);

    typeSource("= My Document\n\nBody text");

    expect(
      screen.queryByRole("heading", { name: "My Document" }),
    ).not.toBeInTheDocument();
    expect(getPreview()).toHaveTextContent("Body text");
  });

  test("typing bold and italic text shows strong and em", () => {
    render(<AsciiDocEditor />);

    typeSource("Some *bold* and _italic_ text");

    expect(getPreview().querySelector("strong")).toHaveTextContent("bold");
    expect(getPreview().querySelector("em")).toHaveTextContent("italic");
  });

  test("typing bulleted and numbered lists shows ul and ol", () => {
    render(<AsciiDocEditor />);

    typeSource("* apple\n* banana\n\n. first\n. second");

    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(2);
    expect(lists[0].tagName).toBe("UL");
    expect(lists[1].tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("typing a URL with link text shows a link", () => {
    render(<AsciiDocEditor />);

    typeSource("Visit https://example.com[Example]");

    expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  test("typing a listing block shows preformatted text", () => {
    render(<AsciiDocEditor />);

    typeSource("----\nconst x = 1;\n----");

    expect(getPreview().querySelector("pre")).toHaveTextContent("const x = 1;");
  });

  test("clearing the text empties the preview", () => {
    render(<AsciiDocEditor />);

    typeSource("Hello");
    expect(getPreview()).toHaveTextContent("Hello");

    typeSource("");
    expect(getPreview()).toBeEmptyDOMElement();
  });

  test("typing HTML tags shows them as plain text", () => {
    render(<AsciiDocEditor />);

    typeSource("<b>not bold</b>");

    expect(getPreview().querySelector("b")).toBeNull();
    expect(getPreview()).toHaveTextContent("<b>not bold</b>");
  });

  test("typing only whitespace shows an empty preview", () => {
    render(<AsciiDocEditor />);

    typeSource("   \n\n   ");

    expect(getEditor()).toHaveValue("   \n\n   ");
    expect(getPreview()).toBeEmptyDOMElement();
  });
});

describe("AsciiDoc editor theme", () => {
  test("the toggle switches to dark and back, and saves each choice", () => {
    const { container } = render(<AsciiDocEditor />);
    const page = container.firstChild;
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-gray-900", "text-gray-400");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-dark");
    expect(localStorage.getItem("theme")).toBe("true");

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-white", "text-gray-800");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-light");
    expect(localStorage.getItem("theme")).toBe("false");
  });

  test("a stored dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");

    const { container } = render(<AsciiDocEditor />);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-gray-400");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-dark");
  });

  test("a stored light theme is applied on load", () => {
    localStorage.setItem("theme", "false");

    const { container } = render(<AsciiDocEditor />);

    expect(container.firstChild).toHaveClass("bg-white", "text-gray-800");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-light");
  });

  test("an invalid stored theme falls back to light mode", () => {
    localStorage.setItem("theme", "notjson");
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    const { container } = render(<AsciiDocEditor />);

    expect(container.firstChild).toHaveClass("bg-white", "text-gray-800");
    expect(log).toHaveBeenCalledWith("Failed to read localstorage");
    log.mockRestore();
  });
});

describe("AsciiDoc editor workflow", () => {
  test("writing a document with a heading, bold text, a list, and a code block", () => {
    render(<AsciiDocEditor />);

    typeSource(
      [
        "== Guide",
        "",
        "Intro with *bold* text.",
        "",
        "* step one",
        "* step two",
        "",
        "----",
        "npm test",
        "----",
      ].join("\n"),
    );

    expect(screen.getByRole("heading", { name: "Guide" })).toBeInTheDocument();
    expect(getPreview().querySelector("strong")).toHaveTextContent("bold");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(getPreview().querySelector("pre")).toHaveTextContent("npm test");
  });

  test("writing a heading and switching to dark mode", () => {
    render(<AsciiDocEditor />);

    typeSource("== Keep Me");
    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));

    expect(getEditor()).toHaveValue("== Keep Me");
    expect(
      screen.getByRole("heading", { name: "Keep Me" }),
    ).toBeInTheDocument();
  });

  test("switching to dark mode and reopening the page", () => {
    const first = render(<AsciiDocEditor />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));
    first.unmount();

    const { container } = render(<AsciiDocEditor />);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-gray-400");
    expect(getEditor()).toHaveAttribute("data-theme", "vs-dark");
  });
});

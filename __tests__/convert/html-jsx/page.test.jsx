import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HTML_JSX from "@/app/convert/html-jsx/page";

jest.mock("@monaco-editor/react", () => ({
  Editor: ({ language, value, onChange }) => (
    <textarea
      data-testid={language === "html" ? "html-editor" : "jsx-editor"}
      aria-label={language === "html" ? "HTML editor" : "JSX editor"}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
  ),
}));

jest.mock("@/components/navbar", () => ({
  NavBar: ({ title, isDarkMode, toggleTheme }) => (
    <div data-testid="mock-navbar">
      <h1>{title}</h1>
      <button aria-label="Toggle dark mode" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <span>{isDarkMode ? "dark" : "light"}</span>
    </div>
  ),
}));

describe("HTML to JSX page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the HTML and JSX panels", () => {
    render(<HTML_JSX />);

    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("JSX")).toBeInTheDocument();
    expect(screen.getByLabelText("HTML editor")).toBeInTheDocument();
    expect(screen.getByLabelText("JSX editor")).toBeInTheDocument();
  });

  it("converts HTML input into JSX output", async () => {
    render(<HTML_JSX />);

    const htmlEditor = screen.getByLabelText("HTML editor");
    const jsxEditor = screen.getByLabelText("JSX editor");

    fireEvent.change(htmlEditor, {
      target: { value: '<div class="foo">Hello</div>' },
    });

    await waitFor(() => {
      expect(jsxEditor).toHaveValue(
        'function component() { return (<div className="foo">Hello</div>) }',
      );
    });
  });

  it("loads the saved theme from localStorage on mount", async () => {
    window.localStorage.setItem("theme", JSON.stringify(true));

    render(<HTML_JSX />);

    await waitFor(() => {
      expect(screen.getByText("dark")).toBeInTheDocument();
      expect(screen.getByRole("main")).toHaveClass("bg-gray-900");
    });
  });

  it("toggles dark mode and saves the preference", async () => {
    render(<HTML_JSX />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText("dark")).toBeInTheDocument();
      expect(window.localStorage.getItem("theme")).toBe("true");
    });
  });
});

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import MarkdownEditor from "@/app/MD/page";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

// The Markdown textarea has no label, and it is the only textarea on the page.
const getEditor = () => document.querySelector("textarea");

const getPreview = () =>
  screen.getByTitle("Parsed Markdown").contentDocument.body;

const typeMarkdown = (text) =>
  fireEvent.change(getEditor(), { target: { value: text } });

// The name box and Download button are rendered twice: once in the
// desktop nav and once in the mobile bar below it.
const getNameInputs = () => screen.getAllByDisplayValue("untitled");

let writeText;

beforeEach(() => {
  localStorage.clear();
  saveAs.mockClear();
  // jsdom has no clipboard API.
  writeText = jest.fn(() => Promise.resolve());
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
  // jsdom has no matchMedia; react-hot-toast's Toaster calls it.
  window.matchMedia = jest.fn(() => ({ matches: false }));
});

afterEach(() => {
  // Toasts live in a global store, so clear them between tests.
  act(() => toast.remove());
  jest.restoreAllMocks();
});

describe("Markdown editor rendering", () => {
  test("renders the navbar with the title and the theme toggle", () => {
    render(<MarkdownEditor />);

    expect(screen.getByRole("link", { name: /Web Dev Tools/ })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("MD Editor")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  test("starts with the default text and the file name untitled", () => {
    render(<MarkdownEditor />);

    expect(getEditor()).toHaveValue("# hey");
    expect(getNameInputs()).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Download" })).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Copy to clipboard" }),
    ).toBeInTheDocument();
    expect(screen.getByTitle("Parsed Markdown")).toBeInTheDocument();
  });

  test("renders every formatting button", () => {
    render(<MarkdownEditor />);

    [
      "H1",
      "H2",
      "H3",
      "Bold",
      "Italic",
      "Strikethrough",
      "Bullet List",
      "Numbered List",
      "Link",
      "Image",
      "Block Quote",
      "Inline Code",
      "Code Block",
      "Horizontal Rule",
    ].forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  test("starts in light mode", () => {
    const { container } = render(<MarkdownEditor />);

    expect(container.firstChild).toHaveClass("bg-white", "text-black");
  });
});

describe("Markdown editor formatting buttons", () => {
  test("Bold inserts bold text at the cursor", () => {
    render(<MarkdownEditor />);
    getEditor().setSelectionRange(2, 2);

    fireEvent.click(screen.getByRole("button", { name: "Bold" }));

    expect(getEditor()).toHaveValue("# **bold text**hey");
  });

  test("H1 inserts a heading marker at the cursor", () => {
    render(<MarkdownEditor />);
    typeMarkdown("title");
    getEditor().setSelectionRange(0, 0);

    fireEvent.click(screen.getByRole("button", { name: "H1" }));

    expect(getEditor()).toHaveValue("# title");
  });

  test("Code Block inserts a fenced block at the end of the text", () => {
    render(<MarkdownEditor />);
    typeMarkdown("");

    fireEvent.click(screen.getByRole("button", { name: "Code Block" }));

    expect(getEditor()).toHaveValue("```\ncode block\n```");
  });
});

describe("Markdown editor preview", () => {
  test("typing a heading shows it in the preview", () => {
    render(<MarkdownEditor />);

    typeMarkdown("# Hello");

    expect(getPreview().querySelector("h1")).toHaveTextContent("Hello");
  });

  test("typing bold, italic, and a link shows them in the preview", () => {
    render(<MarkdownEditor />);

    typeMarkdown("**bold** and _italic_ and [Example](https://example.com)");

    expect(getPreview().querySelector("strong")).toHaveTextContent("bold");
    expect(getPreview().querySelector("em")).toHaveTextContent("italic");
    expect(getPreview().querySelector("a")).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  test("a formatting button updates the preview", () => {
    render(<MarkdownEditor />);
    typeMarkdown("");

    fireEvent.click(screen.getByRole("button", { name: "H2" }));
    typeMarkdown(getEditor().value + "Section");

    expect(getPreview().querySelector("h2")).toHaveTextContent("Section");
  });

  test("unsafe HTML is removed from the preview", () => {
    render(<MarkdownEditor />);

    typeMarkdown('<img src="x" onerror="alert(1)"><script>alert(2)</script>');

    expect(getPreview().querySelector("script")).toBeNull();
    expect(getPreview().querySelector("img")).not.toHaveAttribute("onerror");
  });
});

describe("Markdown editor download and copy", () => {
  test("Download saves the text as untitled.md by default", () => {
    render(<MarkdownEditor />);

    fireEvent.click(screen.getAllByRole("button", { name: "Download" })[0]);

    expect(saveAs).toHaveBeenCalledTimes(1);
    const [blob, fileName] = saveAs.mock.calls[0];
    expect(fileName).toBe("untitled.md");
    expect(blob.type).toBe("text/markdown");
  });

  test("Download uses the name typed in the box, in both name boxes", () => {
    render(<MarkdownEditor />);

    fireEvent.change(getNameInputs()[0], { target: { value: "notes" } });

    expect(screen.getAllByDisplayValue("notes")).toHaveLength(2);
    fireEvent.click(screen.getAllByRole("button", { name: "Download" })[1]);
    expect(saveAs.mock.calls[0][1]).toBe("notes.md");
  });

  test("Download saves the current text", async () => {
    render(<MarkdownEditor />);
    typeMarkdown("# Saved");

    fireEvent.click(screen.getAllByRole("button", { name: "Download" })[0]);

    // jsdom's Blob has no text(), so read it the older way. The read is
    // async, so wrap it in act for the page's pending updates.
    let text;
    await act(async () => {
      text = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(saveAs.mock.calls[0][0]);
      });
    });
    expect(text).toBe("# Saved");
  });

  test("Copy sends the text to the clipboard and confirms it", async () => {
    render(<MarkdownEditor />);
    typeMarkdown("# Copy me");

    fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));

    expect(writeText).toHaveBeenCalledWith("# Copy me");
    expect(await screen.findByText("Markdown Copied!!")).toBeInTheDocument();
  });

  test("a failed copy is logged and shows no confirmation", async () => {
    writeText.mockImplementation(() => Promise.reject(new Error("denied")));
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<MarkdownEditor />);

    fireEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));

    await waitFor(() =>
      expect(error).toHaveBeenCalledWith("Failed to copy: ", expect.any(Error)),
    );
    expect(screen.queryByText("Markdown Copied!!")).not.toBeInTheDocument();
  });
});

describe("Markdown editor theme", () => {
  test("the toggle switches to dark and back, and saves each choice", () => {
    const { container } = render(<MarkdownEditor />);
    const page = container.firstChild;
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-gray-900", "text-white");
    expect(localStorage.getItem("theme")).toBe("true");

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-white", "text-black");
    expect(localStorage.getItem("theme")).toBe("false");
  });

  test("a stored dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");

    const { container } = render(<MarkdownEditor />);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-white");
  });

  test("a stored light theme is applied on load", () => {
    localStorage.setItem("theme", "false");

    const { container } = render(<MarkdownEditor />);

    expect(container.firstChild).toHaveClass("bg-white", "text-black");
  });

  test("the preview uses dark colors in dark mode", () => {
    render(<MarkdownEditor />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));

    typeMarkdown("# Dark");

    const style = getPreview().ownerDocument.querySelector("style");
    expect(style).toHaveTextContent("background-color: #1a202c");
  });
});

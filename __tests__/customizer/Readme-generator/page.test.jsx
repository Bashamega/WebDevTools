import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReadmeGenerator from "@/app/customizer/Readme-generator/page";

const FIELD_LABELS = [
  "Project Title",
  "Description",
  "Installation",
  "Usage",
  "License",
  "Badges (URLs, one per line)",
];

const getPreviewSource = () =>
  screen.getByTitle("Parsed Markdown").getAttribute("srcdoc");

// jsdom's Blob may not implement text(), so read it the way a browser could.
const readBlob = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });

beforeEach(() => {
  localStorage.clear();
});

describe("Readme generator rendering", () => {
  test("renders the heading, six empty fields, the button, and the preview", () => {
    render(<ReadmeGenerator />);

    expect(
      screen.getByRole("heading", { name: "GitHub README Generator" }),
    ).toBeInTheDocument();
    for (const label of FIELD_LABELS) {
      expect(screen.getByLabelText(label)).toHaveValue("");
    }
    expect(
      screen.getByRole("button", { name: "Download README" }),
    ).toBeInTheDocument();
    expect(screen.getByTitle("Parsed Markdown")).toBeInTheDocument();
  });
});

describe("Readme generator interactions", () => {
  test("typing into each field updates its value", () => {
    render(<ReadmeGenerator />);

    for (const label of FIELD_LABELS) {
      const field = screen.getByLabelText(label);
      fireEvent.change(field, { target: { value: `${label} text` } });
      expect(field).toHaveValue(`${label} text`);
    }
  });

  test("the preview renders the entered sections as HTML", () => {
    render(<ReadmeGenerator />);

    fireEvent.change(screen.getByLabelText("Project Title"), {
      target: { value: "My Project" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A tool that writes READMEs" },
    });
    fireEvent.change(screen.getByLabelText("Installation"), {
      target: { value: "npm install my-project" },
    });
    fireEvent.change(screen.getByLabelText("Usage"), {
      target: { value: "Run it from the terminal" },
    });
    fireEvent.change(screen.getByLabelText("License"), {
      target: { value: "MIT" },
    });

    const preview = getPreviewSource();
    expect(preview).toContain("<h1>My Project</h1>");
    expect(preview).toContain("<h2>Description</h2>");
    expect(preview).toContain("A tool that writes READMEs");
    expect(preview).toContain("npm install my-project");
    expect(preview).toContain("Run it from the terminal");
    expect(preview).toContain("MIT");
  });

  test("the theme toggle switches the preview to dark colors and saves it", () => {
    render(<ReadmeGenerator />);

    expect(getPreviewSource()).toContain("background-color: white");

    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));

    const preview = getPreviewSource();
    expect(preview).toContain("background-color: #1a202c");
    expect(preview).toContain("color: white");
    expect(localStorage.getItem("theme")).toBe("true");
  });

  test("a saved dark theme is restored when the page loads", () => {
    localStorage.setItem("theme", "true");
    render(<ReadmeGenerator />);

    const preview = getPreviewSource();
    expect(preview).toContain("background-color: #1a202c");
    expect(preview).toContain("color: white");
  });

  test("a saved light theme keeps the preview light", () => {
    localStorage.setItem("theme", "false");
    render(<ReadmeGenerator />);

    const preview = getPreviewSource();
    expect(preview).toContain("background-color: white");
    expect(preview).toContain("color: black");
  });

  test("the preview's theme colors outrank the GitHub Markdown stylesheet", () => {
    render(<ReadmeGenerator />);

    // github-markdown-css sets colors on .markdown-body, which beats a plain
    // body selector, so the page's rule must also match the class.
    expect(getPreviewSource()).toContain("<style>body.markdown-body {");
  });
});

describe("Readme generator download", () => {
  let createObjectURL;
  let clickSpy;

  beforeEach(() => {
    // jsdom implements neither URL.createObjectURL nor anchor navigation.
    createObjectURL = jest.fn(() => "blob:readme-test");
    URL.createObjectURL = createObjectURL;
    clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    clickSpy.mockRestore();
    delete URL.createObjectURL;
    // The page appends the download link to <body> and never removes it.
    document.querySelectorAll("a[download]").forEach((link) => link.remove());
  });

  test("downloads README.md holding the generated Markdown", async () => {
    render(<ReadmeGenerator />);

    fireEvent.change(screen.getByLabelText("Project Title"), {
      target: { value: "My Project" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A tool that writes READMEs" },
    });
    fireEvent.change(screen.getByLabelText("Installation"), {
      target: { value: "npm install my-project" },
    });
    fireEvent.change(screen.getByLabelText("Usage"), {
      target: { value: "Run it from the terminal" },
    });
    fireEvent.change(screen.getByLabelText("License"), {
      target: { value: "MIT" },
    });
    fireEvent.change(screen.getByLabelText("Badges (URLs, one per line)"), {
      target: {
        value:
          "  ![build](https://img.shields.io/badge/build-passing-green)  \n\n ![license](https://img.shields.io/badge/license-MIT-blue) ",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Download README" }));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const link = document.querySelector("a[download]");
    expect(link).toHaveAttribute("download", "README.md");
    expect(link).toHaveAttribute("href", "blob:readme-test");

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0][0];
    expect(blob.type).toBe("text/markdown");
    await waitFor(async () => {
      expect(await readBlob(blob)).toBe(
        [
          "![build](https://img.shields.io/badge/build-passing-green)",
          "![license](https://img.shields.io/badge/license-MIT-blue)",
          "",
          "# My Project",
          "",
          "## Description",
          "A tool that writes READMEs",
          "",
          "## Installation",
          "npm install my-project",
          "",
          "## Usage",
          "Run it from the terminal",
          "",
          "## License",
          "MIT",
        ].join("\n"),
      );
    });
  });
});

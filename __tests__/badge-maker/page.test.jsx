import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BadgeMakerPage from "@/app/badge-maker/page";

// What the page builds for a badge with only a label and a message: the
// form's fields in order, as a query string on this origin's /api/badge.
const BADGE_URL =
  "http://localhost/api/badge?label=build&message=passing&labelColor=&color=&logoBase64=&links=&style=flat";
const BADGE_MARKDOWN = `![Badge](${BADGE_URL})`;

const generateBadge = () => {
  fireEvent.change(screen.getByLabelText("Badge Label"), {
    target: { value: "build" },
  });
  fireEvent.change(screen.getByLabelText("Badge Message"), {
    target: { value: "passing" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Generate Badge" }));
};

let writeText;

beforeEach(() => {
  localStorage.clear();
  // The page logs every badge it generates; keep the test output clean.
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(window, "alert").mockImplementation(() => {});
  // jsdom has no clipboard API.
  writeText = jest.fn(() => Promise.resolve());
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Badge Maker page rendering", () => {
  test("renders the nav title and the form, with no badge yet", () => {
    render(<BadgeMakerPage />);

    expect(screen.getByText("/ Badge Maker")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Badge Customizer" }),
    ).toBeInTheDocument();
    expect(screen.queryByAltText("Badge Preview")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Badge Markdown" }),
    ).not.toBeInTheDocument();
  });
});

describe("Badge Maker page interactions", () => {
  test("generating a badge shows its preview and Markdown", () => {
    render(<BadgeMakerPage />);

    generateBadge();

    expect(screen.getByAltText("Badge Preview")).toHaveAttribute(
      "src",
      BADGE_URL,
    );
    expect(
      screen.getByRole("heading", { name: "Badge Markdown" }),
    ).toBeInTheDocument();
    expect(screen.getByText(BADGE_MARKDOWN)).toBeInTheDocument();
  });

  test("the preview follows the latest form values", () => {
    render(<BadgeMakerPage />);

    generateBadge();
    fireEvent.change(screen.getByLabelText("Badge Style"), {
      target: { value: "for-the-badge" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate Badge" }));

    expect(screen.getByAltText("Badge Preview")).toHaveAttribute(
      "src",
      BADGE_URL.replace("style=flat", "style=for-the-badge"),
    );
  });

  test("Copy to Clipboard copies the Markdown and confirms it", async () => {
    render(<BadgeMakerPage />);
    generateBadge();

    fireEvent.click(screen.getByRole("button", { name: "Copy to Clipboard" }));

    expect(writeText).toHaveBeenCalledWith(BADGE_MARKDOWN);
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Badge Markdown copied to clipboard!",
      ),
    );
  });

  test("a failed copy is logged and shows no confirmation", async () => {
    const error = new Error("denied");
    writeText.mockImplementation(() => Promise.reject(error));
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(<BadgeMakerPage />);
    generateBadge();

    fireEvent.click(screen.getByRole("button", { name: "Copy to Clipboard" }));

    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to copy badge Markdown:",
        error,
      ),
    );
    expect(window.alert).not.toHaveBeenCalled();
  });
});

describe("Badge Maker page theme", () => {
  test("the theme toggle switches to dark mode and saves it", () => {
    render(<BadgeMakerPage />);

    expect(screen.getByRole("main")).toHaveClass("bg-gray-100");

    fireEvent.click(screen.getByRole("button", { name: "Toggle dark mode" }));

    expect(screen.getByRole("main")).toHaveClass("bg-gray-900");
    expect(localStorage.getItem("theme")).toBe("true");
  });

  test("a saved dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");
    render(<BadgeMakerPage />);

    expect(screen.getByRole("main")).toHaveClass("bg-gray-900");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoremIpsumGenerator from "@/app/customizer/LoremIpsumGenerator/page";

const PARAGRAPH_START = "Lorem ipsum dolor sit amet";

const PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor orci quis metus ultricies, vitae finibus urna pellentesque. Sed commodo, tortor sed pharetra bibendum, turpis purus gravida orci, nec aliquet mi ligula eu purus. In at elit ex. Quisque ultricies pulvinar purus, at luctus justo lacinia vel. Vestibulum pulvinar lacus eu turpis rutrum, et fermentum sapien rhoncus. Nullam dapibus felis in neque ultricies ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Donec efficitur dolor a bibendum vehicula. Curabitur vitae est elit. Integer tempus massa elit, eget euismod nunc pharetra eget. Morbi efficitur metus in viverra finibus. Aliquam sollicitudin pharetra sapien nec bibendum. Etiam congue faucibus malesuada. Nunc vulputate congue vulputate.";

const countParagraphs = (text) => text.split(PARAGRAPH_START).length - 1;

const shownParagraphs = () => countParagraphs(document.body.textContent);

const setParagraphCount = (count) =>
  fireEvent.change(screen.getByLabelText("Number of paragraphs:"), {
    target: { value: String(count) },
  });

let writeText;

beforeEach(() => {
  localStorage.clear();
  // jsdom has no clipboard API.
  writeText = jest.fn();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

describe("Lorem Ipsum generator rendering", () => {
  test("renders the heading, the paragraph input, and the buttons", () => {
    render(<LoremIpsumGenerator />);

    expect(
      screen.getByRole("heading", { name: "Lorem Ipsum Generator" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Number of paragraphs:")).toHaveValue(1);
    expect(
      screen.getByRole("button", { name: "Generate" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  test("shows no Lorem text before Generate is clicked", () => {
    render(<LoremIpsumGenerator />);

    expect(shownParagraphs()).toBe(0);
  });
});

describe("Lorem Ipsum generator interactions", () => {
  test("Generate with the default count shows one paragraph", () => {
    render(<LoremIpsumGenerator />);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(shownParagraphs()).toBe(1);
    expect(screen.getByText(PARAGRAPH, { exact: false })).toBeVisible();
  });

  test("changing the count to 3 and generating shows three paragraphs", () => {
    render(<LoremIpsumGenerator />);

    setParagraphCount(3);
    expect(screen.getByLabelText("Number of paragraphs:")).toHaveValue(3);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(shownParagraphs()).toBe(3);
    expect(screen.getByText(PARAGRAPH, { exact: false })).toBeVisible();
  });

  test("Copy sends the generated text to the clipboard and confirms it", () => {
    render(<LoremIpsumGenerator />);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    const copied = writeText.mock.calls[0][0];
    expect(copied).toBe(`${PARAGRAPH}\n\n`);
    expect(countParagraphs(copied)).toBe(1);
    expect(screen.getByText("Text copied successfully")).toBeInTheDocument();
    expect(shownParagraphs()).toBe(0);
  });
});

describe("Lorem Ipsum generator theme", () => {
  test("the toggle switches to dark and back, and saves each choice", () => {
    render(<LoremIpsumGenerator />);
    const main = screen.getByRole("main");
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    expect(main).toHaveClass("bg-white", "text-gray-800");

    fireEvent.click(toggle);
    expect(main).toHaveClass("bg-gray-900", "text-gray-400");
    expect(localStorage.getItem("theme")).toBe("true");

    fireEvent.click(toggle);
    expect(main).toHaveClass("bg-white", "text-gray-800");
    expect(localStorage.getItem("theme")).toBe("false");
  });

  test("a stored dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");

    render(<LoremIpsumGenerator />);

    expect(screen.getByRole("main")).toHaveClass(
      "bg-gray-900",
      "text-gray-400",
    );
    expect(localStorage.getItem("theme")).toBe("true");
  });
});

describe("Lorem Ipsum generator workflow", () => {
  test("generating two paragraphs and copying them", () => {
    render(<LoremIpsumGenerator />);

    setParagraphCount(2);
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(shownParagraphs()).toBe(2);
    expect(screen.getByText(PARAGRAPH, { exact: false })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    const copied = writeText.mock.calls[0][0];
    expect(countParagraphs(copied)).toBe(2);
    expect(copied).toBe(`${PARAGRAPH}\n\n${PARAGRAPH}\n\n`);
    expect(screen.getByText("Text copied successfully")).toBeInTheDocument();
    expect(shownParagraphs()).toBe(0);
  });
});

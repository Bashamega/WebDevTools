import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonCustomizer from "@/app/customizer/button/page";

let writeText;

beforeEach(() => {
  localStorage.clear();
  writeText = jest.fn();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

describe("Button Customizer rendering", () => {
  test("renders the preview button", () => {
    render(<ButtonCustomizer />);
    expect(screen.getByText("Customized Button")).toBeInTheDocument();
  });

  test("renders all seven tabs", () => {
    render(<ButtonCustomizer />);
    expect(
      screen.getByRole("tab", { name: "Background Color" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Text Color" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Border Radius" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Width and Height" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Cursor" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Font" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Border" })).toBeInTheDocument();
  });

  test("renders the Show Code button", () => {
    render(<ButtonCustomizer />);
    expect(
      screen.getByRole("button", { name: /show code/i }),
    ).toBeInTheDocument();
  });

  test("does not show the code modal on initial render", () => {
    render(<ButtonCustomizer />);
    expect(screen.queryByRole("tab", { name: "CSS" })).not.toBeInTheDocument();
  });

  test("does not show the success toast on initial render", () => {
    render(<ButtonCustomizer />);
    expect(
      screen.queryByText(/code copied successfully/i),
    ).not.toBeInTheDocument();
  });
});

describe("Button Customizer tab switching", () => {
  test("Background Color tab is selected by default", () => {
    render(<ButtonCustomizer />);
    expect(
      screen.getByRole("tab", { name: "Background Color" }),
    ).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Text Color tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Text Color" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Border Radius tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Border Radius" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Width and Height tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Width and Height" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Cursor tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Cursor" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Font tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Font" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking Border tab selects it", () => {
    render(<ButtonCustomizer />);
    const tab = screen.getByRole("tab", { name: "Border" });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
  });
});

describe("Button Customizer Show Code modal", () => {
  test("clicking Show Code opens the modal with CSS and Tailwind tabs", () => {
    render(<ButtonCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: /show code/i }));
    expect(screen.getByRole("tab", { name: "CSS" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tailwind" })).toBeInTheDocument();
  });

  test("clicking Close dismisses the modal", () => {
    render(<ButtonCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: /show code/i }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("tab", { name: "CSS" })).not.toBeInTheDocument();
  });
});

describe("Button Customizer copy", () => {
  test("clicking Copy Code calls the clipboard API", () => {
    render(<ButtonCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: /show code/i }));
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    expect(writeText).toHaveBeenCalledTimes(1);
  });

  test("clicking Copy Code shows the success toast", () => {
    render(<ButtonCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: /show code/i }));
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    expect(screen.getByText(/code copied successfully/i)).toBeInTheDocument();
  });

  test("clicking Copy Code closes the modal", () => {
    render(<ButtonCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: /show code/i }));
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    expect(screen.queryByRole("tab", { name: "CSS" })).not.toBeInTheDocument();
  });
});

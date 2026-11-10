import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Swal from "sweetalert2";
import BoxShadowGenerator from "@/app/customizer/box-shadow-generator/page";

jest.mock("sweetalert2", () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));

// The page renders the CSS rule and the Tailwind class in two <h3>s.
const cssOutput = () => screen.getByText(/^box-shadow:/);
const tailwindOutput = () => screen.getByText(/^shadow-\[/);

// The four sliders share one id and have no labels, so they are picked by
// position, in the order the page renders them.
const sliders = () => {
  const [hOffset, vOffset, blur, spread] = screen.getAllByRole("slider");
  return { hOffset, vOffset, blur, spread };
};

let writeText;

beforeEach(() => {
  localStorage.clear();
  Swal.fire.mockClear();
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

describe("Box Shadow generator rendering", () => {
  test("renders the heading, the controls, and both copy buttons", () => {
    render(<BoxShadowGenerator />);

    expect(
      screen.getByRole("heading", { name: "Box Shadow Generator" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("slider")).toHaveLength(4);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(
      screen.getByRole("button", { name: "Copy CSS" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy TailwindCSS" }),
    ).toBeInTheDocument();
  });

  test("starts from the default shadow", () => {
    render(<BoxShadowGenerator />);
    const { hOffset, vOffset, blur, spread } = sliders();

    expect(hOffset).toHaveValue("0");
    expect(vOffset).toHaveValue("8");
    expect(blur).toHaveValue("24");
    expect(spread).toHaveValue("0");
    expect(screen.getByText("Color: #00000080")).toBeInTheDocument();
    expect(cssOutput().textContent).toMatch(
      /^box-shadow: 0px 8px 24px 0px #00000080\s*;$/,
    );
    expect(tailwindOutput()).toHaveTextContent(
      "shadow-[0px_8px_24px_0px_#00000080]",
    );
  });
});

describe("Box Shadow generator interactions", () => {
  test("moving each slider updates its label and both outputs", () => {
    render(<BoxShadowGenerator />);
    const { hOffset, vOffset, blur, spread } = sliders();

    fireEvent.change(hOffset, { target: { value: "5" } });
    fireEvent.change(vOffset, { target: { value: "10" } });
    fireEvent.change(blur, { target: { value: "15" } });
    fireEvent.change(spread, { target: { value: "3" } });

    expect(screen.getByText("h-offset:5")).toBeInTheDocument();
    expect(screen.getByText("v-offset:10")).toBeInTheDocument();
    expect(screen.getByText("blur:15")).toBeInTheDocument();
    expect(screen.getByText("spread:3")).toBeInTheDocument();
    expect(cssOutput().textContent).toMatch(
      /^box-shadow: 5px 10px 15px 3px #00000080\s*;$/,
    );
    expect(tailwindOutput()).toHaveTextContent(
      "shadow-[5px_10px_15px_3px_#00000080]",
    );
  });

  test("picking a color updates the label and both outputs", () => {
    const { container } = render(<BoxShadowGenerator />);

    fireEvent.change(container.querySelector("#color"), {
      target: { value: "#ff0000" },
    });

    expect(screen.getByText("Color: #ff0000")).toBeInTheDocument();
    expect(cssOutput().textContent).toMatch(
      /^box-shadow: 0px 8px 24px 0px #ff0000\s*;$/,
    );
    expect(tailwindOutput()).toHaveTextContent(
      "shadow-[0px_8px_24px_0px_#ff0000]",
    );
  });

  test("checking inset adds it to both outputs, unchecking removes it", () => {
    render(<BoxShadowGenerator />);
    const inset = screen.getByRole("checkbox");

    fireEvent.click(inset);
    expect(cssOutput()).toHaveTextContent(
      "box-shadow: 0px 8px 24px 0px #00000080 inset;",
    );
    expect(tailwindOutput()).toHaveTextContent(
      "shadow-[inset_0px_8px_24px_0px_#00000080]",
    );

    fireEvent.click(inset);
    expect(cssOutput()).not.toHaveTextContent("inset");
    expect(tailwindOutput()).not.toHaveTextContent("inset");
  });
});

describe("Box Shadow generator copy buttons", () => {
  test("Copy CSS copies the CSS rule and confirms it", async () => {
    render(<BoxShadowGenerator />);

    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toBe(cssOutput().textContent);
    await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
    expect(Swal.fire.mock.calls[0][0]).toMatchObject({
      text: "CSS code copied to clipboard!",
      icon: "success",
    });
  });

  test("Copy TailwindCSS copies the Tailwind class and confirms it", async () => {
    render(<BoxShadowGenerator />);

    fireEvent.click(screen.getByRole("button", { name: "Copy TailwindCSS" }));

    expect(writeText).toHaveBeenCalledWith(
      "shadow-[0px_8px_24px_0px_#00000080]",
    );
    await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
    expect(Swal.fire.mock.calls[0][0]).toMatchObject({
      text: "TailwindCSS code copied to clipboard!",
      icon: "success",
    });
  });

  test("a failed copy logs the error and shows no confirmation", async () => {
    const error = new Error("denied");
    writeText.mockImplementation(() => Promise.reject(error));
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(<BoxShadowGenerator />);
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));

    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(
        "Failed to copy text: ",
        error,
      ),
    );
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});

describe("Box Shadow generator theme", () => {
  test("the toggle switches to dark and back, and saves each choice", () => {
    const { container } = render(<BoxShadowGenerator />);
    const page = container.firstChild;
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    expect(page).toHaveClass("bg-gray-100", "text-gray-800");

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-gray-900", "text-gray-400");
    expect(localStorage.getItem("theme")).toBe("true");

    fireEvent.click(toggle);
    expect(page).toHaveClass("bg-gray-100", "text-gray-800");
    expect(localStorage.getItem("theme")).toBe("false");
  });

  test("a stored dark theme is applied on load", () => {
    localStorage.setItem("theme", "true");

    const { container } = render(<BoxShadowGenerator />);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-gray-400");
  });
});

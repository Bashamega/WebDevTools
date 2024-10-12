import ColorPicker from "./page";

import { fireEvent, render, screen } from "@testing-library/react";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
  })),
});

describe("ColorPicker", () => {
  beforeAll(() => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);
  });

  test("should correctly render", () => {
    const { container } = render(<ColorPicker />);
    const pointerFill = container.getElementsByClassName(
      "react-colorful__pointer-fill",
    )[0];

    expect(screen.getByText(/Color Picker/i)).toBeInTheDocument();
    expect(screen.getByText("#ffffff")).toBeInTheDocument();
    expect(screen.getByText("(255, 255, 255)")).toBeInTheDocument();
    expect(pointerFill).toBeInTheDocument();
  });

  test.each([
    {
      buttonText: "Copy Hex Code",
      toastText: "Hex Code Copied!!",
    },
    {
      buttonText: "Copy RGB Code",
      toastText: "RGB Code Copied!!",
    },
  ])(
    "should correctly $buttonText and display toast message",
    ({ buttonText, toastText }) => {
      render(<ColorPicker />);

      fireEvent.click(screen.getByText(buttonText));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("#ffffff");
      expect(screen.getByText(toastText)).toBeInTheDocument();
    },
  );
});

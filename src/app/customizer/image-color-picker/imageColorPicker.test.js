import ColorPicker from "./page";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

// jsdom has no canvas, so these stand in for the pieces the page uses.
const getImageData = jest.fn(() => ({ data: [255, 0, 0, 255] }));
let getContextSpy;
let getRectSpy;

beforeEach(() => {
  navigator.clipboard.writeText.mockClear();
  getImageData.mockClear();
  getContextSpy = jest
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue({ getImageData, drawImage: jest.fn() });
  getRectSpy = jest
    .spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect")
    .mockReturnValue({ left: 0, top: 0, width: 100, height: 100 });
});

afterEach(() => {
  getContextSpy.mockRestore();
  getRectSpy.mockRestore();
});

const uploadImage = async () => {
  const { container } = render(<ColorPicker />);
  const input = container.querySelector('input[type="file"]');
  const file = new File(["fake image"], "red.png", { type: "image/png" });

  fireEvent.change(input, { target: { files: [file] } });
  await waitFor(() =>
    expect(container.querySelector("canvas")).toBeInTheDocument(),
  );

  return container;
};

describe("Image Color Picker", () => {
  test("should render the upload prompt and the color labels", () => {
    render(<ColorPicker />);

    expect(screen.getByText("Click to upload")).toBeInTheDocument();
    expect(screen.getByText("Hex:")).toBeInTheDocument();
    expect(screen.getByText("RGB:")).toBeInTheDocument();
  });

  test("should only accept image files", () => {
    const { container } = render(<ColorPicker />);

    expect(container.querySelector('input[type="file"]')).toHaveAttribute(
      "accept",
      "image/*",
    );
  });

  test("should not show a canvas before an image is uploaded", () => {
    const { container } = render(<ColorPicker />);

    expect(container.querySelector("canvas")).toBeNull();
  });

  test("should not show a canvas when no file is chosen", () => {
    const { container } = render(<ColorPicker />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [] } });

    expect(container.querySelector("canvas")).toBeNull();
  });

  test("should show a canvas after an image is uploaded", async () => {
    const container = await uploadImage();

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  test("should show the picked color when the canvas is clicked", async () => {
    const container = await uploadImage();

    fireEvent.click(container.querySelector("canvas"), {
      clientX: 10,
      clientY: 10,
    });

    expect(getImageData).toHaveBeenCalledTimes(1);
    expect(screen.getByText("rgb(255, 0, 0)")).toBeInTheDocument();
    expect(screen.getByText(/ff0000/)).toBeInTheDocument();
  });

  test("should toggle dark mode when the theme button is clicked", () => {
    const { container } = render(<ColorPicker />);
    const main = container.querySelector("main");
    const toggle = screen.getByLabelText("Toggle dark mode");

    expect(main).toHaveClass("bg-white");

    fireEvent.click(toggle);

    expect(main).toHaveClass("bg-gray-900");
    expect(main).not.toHaveClass("bg-white");

    fireEvent.click(toggle);

    expect(main).toHaveClass("bg-white");
  });

  test.each([
    {
      buttonText: "RGB Code",
      toastText: "RGB Code Copied!!",
      copied: "rgb(255, 0, 0)",
    },
    {
      buttonText: "Hex Code",
      toastText: "Hex Code Copied!!",
      copied: expect.stringContaining("ff0000"),
    },
  ])(
    "should correctly copy with $buttonText and display toast message",
    async ({ buttonText, toastText, copied }) => {
      const container = await uploadImage();
      fireEvent.click(container.querySelector("canvas"), {
        clientX: 10,
        clientY: 10,
      });

      fireEvent.click(screen.getByText(buttonText));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copied);
      expect(await screen.findByText(toastText)).toBeInTheDocument();
    },
  );
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Endpoints from "@/app/endpoints/page";

beforeEach(() => {
  localStorage.clear();
});

describe("Endpoints page rendering", () => {
  test("renders the navbar with the title and the theme toggle", () => {
    render(<Endpoints />);

    expect(screen.getByRole("link", { name: "Web Dev Tools" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("/ Endpoints")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  test("renders the introduction naming the three endpoints", () => {
    render(<Endpoints />);

    expect(
      screen.getByRole("heading", {
        name: "API Endpoints for Dummy JSON Data",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("/api/users")[0]).toBeInTheDocument();
    expect(screen.getByText("/api/users/:userId")).toBeInTheDocument();
    expect(screen.getAllByText("/api/posts")[0]).toBeInTheDocument();
  });

  test("documents each endpoint in its own section", () => {
    render(<Endpoints />);

    expect(
      screen.getByRole("heading", { name: "Get All Users" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get Single User" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get All Posts" }),
    ).toBeInTheDocument();
  });

  test("shows the request line of each endpoint", () => {
    render(<Endpoints />);

    expect(screen.getByText("GET /api/users")).toBeInTheDocument();
    expect(screen.getByText("GET /api/users/:userId")).toBeInTheDocument();
    expect(screen.getAllByText("GET /api/posts").length).toBeGreaterThan(0);
  });

  test("shows an example request for the paginated users", () => {
    render(<Endpoints />);

    expect(screen.getByText("GET /api/users?page=1")).toBeInTheDocument();
    expect(screen.getByText("GET /api/users/1")).toBeInTheDocument();
  });

  test("shows the 404 response for an unknown user", () => {
    render(<Endpoints />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText(/"error": "User not found"/)).toBeInTheDocument();
  });

  test("starts in light mode", () => {
    const { container } = render(<Endpoints />);

    expect(container.firstChild).toHaveClass("bg-gray-100", "text-gray-800");
  });
});

describe("Endpoints page theme", () => {
  test("the toggle switches to dark mode and back", () => {
    const { container } = render(<Endpoints />);
    const toggle = screen.getByRole("button", { name: "Toggle dark mode" });

    fireEvent.click(toggle);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-gray-400");

    fireEvent.click(toggle);

    expect(container.firstChild).toHaveClass("bg-gray-100", "text-gray-800");
  });

  test("a dark theme saved in localStorage is applied on load", () => {
    localStorage.setItem("theme", "true");

    const { container } = render(<Endpoints />);

    expect(container.firstChild).toHaveClass("bg-gray-900", "text-gray-400");
  });
});

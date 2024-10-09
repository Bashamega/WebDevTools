import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LabelButton from "@/app/gh-finder/label";
import Pagination from "@/app/gh-finder/pagination";
import BasicModal from "@/app/gh-finder/modal";

describe("Label component", () => {
  test("Check Label name", () => {
    render(
      <LabelButton
        key={1}
        labelId={1}
        name={"Test github label"}
        bgColor={"blue"}
        isDarkColor={() => {}}
        handleSelectedLabel={() => {}}
      />,
    );

    const findText = screen.getByText("Test github label");
    expect(findText).toBeInTheDocument();
  });

  test("Check Label with random color", () => {
    const randomColor = "#123456";
    render(
      <LabelButton
        key={2}
        labelId={2}
        name={"Random Color Label"}
        bgColor={"123456"}
        isDarkColor={() => {}}
        handleSelectedLabel={() => {}}
      />,
    );

    const findText = screen.getByText("Random Color Label");

    expect(findText).toBeInTheDocument();
    expect(findText).toHaveStyle(`background-color: ${randomColor}`);
  });
});

describe("Pagination component", () => {
  test("Check if Pagination exist", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={() => {}}
        resultsPerPage={10}
        totalResults={50}
      />,
    );

    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
  });

  test("Check if Pagination have 5 tabs", () => {
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={() => {}}
        resultsPerPage={10}
        totalResults={50}
      />,
    );
    const paginationTabs = screen.getAllByRole("button");
    expect(paginationTabs).toHaveLength(5);
  });
});

describe("Modal component", () => {
  test("Check if Modal pops up and the correct checkboxes are checked", () => {
    const selectedLabels = ["enhancement", "Feature"];

    render(
      <BasicModal
        isDarkMode={false}
        selectedLabels={selectedLabels}
        setSelectedLabels={() => {}}
        handleParametersURL={() => {}}
      />,
    );

    // simulate clicking the button that opens the modal
    const openModalButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(openModalButton);

    waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // check the boxes
    const enhancementCheckbox = screen.getByRole("checkbox", {
      name: /enhancement/i,
    });
    const featureCheckbox = screen.getByRole("checkbox", { name: /feature/i });

    expect(enhancementCheckbox).toBeChecked();
    expect(featureCheckbox).toBeChecked();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Preview from "@/app/resume-builder/Preview";
import { defaultResumeData } from "@/app/resume-builder/defaultResumeData";

describe("Preview", () => {
  test("renders updated resume preview content from provided data", () => {
    const sampleData = {
      ...defaultResumeData,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "1234567890",
      workExperience: [
        {
          title: "Software Engineer",
          company: "Acme",
          description: "Built apps.",
        },
      ],
      education: [
        {
          degree: "B.Sc.",
          institution: "University",
          description: "Computer Science",
        },
      ],
      links: {
        linkedIn: "https://linkedin.com/janedoe",
        website: "https://janedoe.dev",
        github: "https://github.com/janedoe",
      },
    };

    render(<Preview isDarkMode={false} data={sampleData} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getAllByText("Software Engineer")[0]).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("B.Sc.")).toBeInTheDocument();
    expect(screen.getByText("University")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("linkedin.com/janedoe")),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("https://janedoe.dev")),
    ).toBeInTheDocument();
  });
});

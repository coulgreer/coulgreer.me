import React from "react";
import { render, screen } from "@testing-library/react";
import Projects from "../src/app/projects/page";
import "@testing-library/jest-dom";

describe("Projects", () => {
  it("renders a heading and landmarks", () => {
    render(<Projects />);

    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", {
      name: /projects/i,
    });

    expect(main).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

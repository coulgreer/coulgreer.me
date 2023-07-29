import React from "react";
import Projects from "./page";

import { render, screen } from "@testing-library/react";

describe("Projects", () => {
  it("renders a heading and landmarks", () => {
    render(<Projects />);

    const heading = screen.getByRole("heading", {
      name: /projects/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

import React from "react";
import Home from "./page";

import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading and landmarks", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

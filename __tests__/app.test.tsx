import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const nav = screen.getByRole("navigation");
    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(nav).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

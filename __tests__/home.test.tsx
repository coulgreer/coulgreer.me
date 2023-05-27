import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading and landmarks", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

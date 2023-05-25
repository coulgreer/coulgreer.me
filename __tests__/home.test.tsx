import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading and landmarks", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(main).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

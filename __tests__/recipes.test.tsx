import React from "react";
import { render, screen } from "@testing-library/react";
import Recipe from "../src/app/recipes/page";
import "@testing-library/jest-dom";

describe("Recipes", () => {
  it("renders a heading and landmarks", () => {
    render(<Recipe />);

    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", {
      name: /recipes/i,
    });

    expect(main).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

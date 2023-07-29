import React from "react";
import Recipe from "./page";

import { render, screen } from "@testing-library/react";

describe("Recipes", () => {
  it("renders a heading and landmarks", () => {
    render(<Recipe />);

    const heading = screen.getByRole("heading", {
      name: /recipes/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

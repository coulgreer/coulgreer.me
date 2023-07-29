import React from "react";
import Blog from "./page";

import { render, screen } from "@testing-library/react";

describe("Blog", () => {
  it("renders a heading and landmarks", () => {
    render(<Blog />);

    const heading = screen.getByRole("heading", {
      name: /blog/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

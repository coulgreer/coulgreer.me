import React from "react";
import { render, screen } from "@testing-library/react";
import Blog from "../../src/app/blog/page";
import "@testing-library/jest-dom";

describe("Blog", () => {
  it("renders a heading and landmarks", () => {
    render(<Blog />);

    const heading = screen.getByRole("heading", {
      name: /blog/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Dictionary from "../src/app/dictionary/page";
import "@testing-library/jest-dom";

describe("Dictionary", () => {
  it("should render a heading and a quote", () => {
    render(<Dictionary />);

    const heading = screen.getByRole("heading", {
      name: /cacophonous/i,
    });
    const quote = screen.getByRole("figure");

    expect(heading).toBeInTheDocument();
    expect(quote).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Dictionary from "../src/app/dictionary/page";
import "@testing-library/jest-dom";

describe("Dictionary", () => {
  it("renders a heading and landmarks", () => {
    render(<Dictionary />);

    const heading = screen.getByRole("heading", {
      name: /dictionary/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

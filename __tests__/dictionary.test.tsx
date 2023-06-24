import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dictionary from "../src/app/dictionary/page";

describe("Dictionary", () => {
  it("should render a list of vocabulary words", () => {
    render(<Dictionary />);

    const list = screen.getByRole("list");
    const link = screen.getByRole("link");

    expect(list).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});

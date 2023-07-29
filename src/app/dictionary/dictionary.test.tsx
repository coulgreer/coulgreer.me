import React from "react";
import Dictionary from "./page";

import { render, screen } from "@testing-library/react";

describe("Dictionary", () => {
  it("should render a list of vocabulary words", () => {
    render(<Dictionary />);

    const list = screen.getByRole("list");
    const link = screen.getAllByRole("link");

    expect(list).toBeInTheDocument();
    expect(link.length).toBeGreaterThan(0);
    link.every((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});

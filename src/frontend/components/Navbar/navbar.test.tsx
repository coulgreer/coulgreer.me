import React from "react";
import Navbar from "./navbar";

import { render, screen } from "@testing-library/react";

describe("Blog", () => {
  it("renders a heading and landmarks", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");

    expect(nav).toBeInTheDocument();
    expect(links.length).toBe(5);
  });
});

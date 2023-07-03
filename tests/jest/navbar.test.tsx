import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../../src/components/navbar";
import "@testing-library/jest-dom";

describe("Blog", () => {
  it("renders a heading and landmarks", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");

    expect(nav).toBeInTheDocument();
    expect(links.length).toBe(5);
  });
});

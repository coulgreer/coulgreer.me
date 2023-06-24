import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import helloData from "../__mocks__/hello.json";

/* Must come before the importation of unit under test */
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValue("/dictionary/hello"),
}));

import Headword from "../src/app/dictionary/[slug]/page";

describe("Headword", () => {
  it("should render loading state", () => {
    render(<Headword />);

    const loader = screen.getByText(/loading/i);

    expect(loader).toBeInTheDocument();
  });

  it("should render a heading and a quote", async () => {
    const meaningsIndex = 0;
    const definitionsIndex = 0;

    render(<Headword />);

    const heading = await screen.findByRole("heading", {
      name: new RegExp(helloData[0].word, "i"),
    });
    const partsOfSpeech = await screen.findByText(
      new RegExp(helloData[0].meanings[meaningsIndex].partOfSpeech, "i")
    );
    const definition = await screen.findByText(
      new RegExp(
        helloData[0].meanings[meaningsIndex].definitions[
          definitionsIndex
        ].definition,
        "i"
      )
    );
    const quote = await screen.findByRole("figure");

    expect(heading).toBeInTheDocument();
    expect(partsOfSpeech).toBeInTheDocument();
    expect(definition).toBeInTheDocument();
    expect(quote).toBeInTheDocument();
  });
});

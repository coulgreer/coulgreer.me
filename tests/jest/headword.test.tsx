import React from "react";
import Headword from "../../src/app/dictionary/[headword]/page";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import validHeadwordData from "../__fixtures__/hello.json";
import headwords from "../__fixtures__/headwords.json";
import fallbackData from "../../src/assets/headword.json";

describe("Headword", () => {
  it("should render the loading state", () => {
    render(<Headword params={{ headword: "hello" }} />);

    const loader = screen.getByText(/loading/i);

    expect(loader).toBeInTheDocument();
  });

  it("should render the given headword's data", async () => {
    const meaningsIndex = 0;
    const data = validHeadwordData[0];
    const partOfSpeech = data.meanings[meaningsIndex].partOfSpeech;
    const definition = data.meanings[meaningsIndex].definitions[0].definition;

    render(<Headword params={{ headword: data.word }} />);

    const heading = await screen.findByRole("heading", {
      name: new RegExp(data.word, "i"),
    });
    const partsOfSpeechEl = await screen.findByText(
      new RegExp(partOfSpeech, "i")
    );
    const definitionEl = await screen.findByText(new RegExp(definition, "i"));
    const quote = await screen.findByRole("figure");

    expect(heading).toBeInTheDocument();
    expect(partsOfSpeechEl).toBeInTheDocument();
    expect(definitionEl).toBeInTheDocument();
    expect(quote).toBeInTheDocument();
  });

  describe("Error Handling", () => {
    afterEach(async () => {
      const [data] = fallbackData;
      const [meaning] = data.meanings;
      const heading = await screen.findByRole("heading", {
        name: new RegExp(data.word, "i"),
      });
      const partsOfSpeech = await screen.findByText(
        new RegExp(meaning.partOfSpeech, "i")
      );
      const definition = await screen.findByText(
        new RegExp(meaning.definitions[0].definition, "i")
      );
      const quote = await screen.findByRole("figure");

      expect(heading).toBeInTheDocument();
      expect(partsOfSpeech).toBeInTheDocument();
      expect(definition).toBeInTheDocument();
      expect(quote).toBeInTheDocument();
    });

    it("should render the fallback data when the given headword does not exist in the Dictionary API", async () => {
      render(<Headword params={{ headword: headwords["404_RESPONSE"] }} />);
    });

    it("should render default data on failure to communicate with Dictionary API", async () => {
      render(<Headword params={{ headword: headwords["500_RESPONSE"] }} />);
    });

    it("should render the fallback data when there is no headword provided", async () => {
      render(<Headword params={{ headword: "" }} />);
    });
  });
});

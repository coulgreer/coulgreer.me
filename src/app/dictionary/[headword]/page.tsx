"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import useSWR from "swr";

import fallback from "../../../data/headword.json";
import { Data, Results, parse } from "../../../utils/dictionary-parser";
import "./index.css";

type Display = {
  vocabulary: Results;
  quote: string;
  author: string;
  bodyOfWork: string;
  granularContext: string;
};

const darkMode = createTheme({ palette: { mode: "dark" } });

const endpoint = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function fetchWord(url: string): Promise<Data> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      const word = url.replace(endpoint, "");
      throw new Error(`The word -- ${word} -- does not exist!`);
    }
    return response.json();
  });
}

function parseEntry(result: Results): Display {
  return {
    vocabulary: {
      word: result.word,
      phonetic: result.phonetic,
      partOfSpeech: result.partOfSpeech,
      definition: result.definition,
    },
    quote:
      "I was gonna say -- and I- I think this is a great thing -- I feel like I've noticed this trend where I think you lose your patients more. The threshold is lower now at reunion. [...] But I think it's a way to release the valve because you only ever do it when it really gets so cacophonous that it's, like, this has- we have to release this.",
    author: "Matt Rogers",
    bodyOfWork: "Las Culturistas with Matt Rogers and Bowen Yang",
    granularContext: '"Dishing and Kibbitzing" (w/ Andy Cohen)',
  };
}

function parseFallback(): Display {
  const [entry] = fallback;
  const [meaning] = entry.meanings;

  return {
    vocabulary: {
      word: entry.word,
      phonetic: entry.phonetic,
      partOfSpeech: meaning.partOfSpeech,
      definition: meaning.definitions[0].definition,
    },
    quote: entry.quote,
    author: entry.author,
    bodyOfWork: entry.bodyOfWork,
    granularContext: entry.granularContext,
  };
}

export default function Headword({ params }: { params: { headword: string } }) {
  const headword = params.headword ?? "";

  const {
    data: apiData,
    error,
    isLoading,
  } = useSWR<Data, Error>(`${endpoint}${headword}`, fetchWord);

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const data: Display = apiData ? parseEntry(parse(apiData)) : parseFallback();

  return (
    <ThemeProvider theme={darkMode}>
      <div className="word-entry">
        <div className="word-entry__header">
          <Typography variant="h2" className="word-entry__headword">
            {data.vocabulary.word}
          </Typography>
          <p className="word-entry__pronunciation text-small">
            {data.vocabulary.phonetic}
          </p>
          <hr className="word-entry__divider" />
          <p className="word-entry__part-of-speech">
            {data.vocabulary.partOfSpeech}
          </p>
        </div>
        <div className="word-entry__header-extension" />
        <div className="word-entry__body">
          <p className="word-entry__definition text-size-h5">
            {data.vocabulary.definition}
          </p>
          <figure className="quote">
            <blockquote className="quote__text">{data.quote}</blockquote>
            <figcaption className="quote__source text-caption">
              <p className="quote__author">{data.author},</p>
              <p className="quote__creative-work">
                <cite>{data.bodyOfWork}</cite>
              </p>
              <p className="quote__context">{data.granularContext}</p>
            </figcaption>
          </figure>
        </div>
        <div className="word-entry__body-extension" />
      </div>
    </ThemeProvider>
  );
}

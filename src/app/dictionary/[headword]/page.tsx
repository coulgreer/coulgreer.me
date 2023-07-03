"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import useSWR from "swr";

import fallback from "../../../assets/headword.json";
import "./index.css";

type HeadwordData = Array<{
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string;
    audio: string | null;
  }>;
  origin: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example: string;
      synonyms: Array<string>;
      antonyms: Array<string>;
    }>;
  }>;
}>;

type HeadwordDisplay = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  quote: string;
  author: string;
  bodyOfWork: string;
  granularContext: string;
};

const darkMode = createTheme({ palette: { mode: "dark" } });

const dictionaryApiEndpoint =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";

function sanitizePathName(pathname: string | null) {
  if (!pathname) {
    return "";
  }

  return pathname;
}

async function fetchWord(url: string): Promise<HeadwordData> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      const word = url.replace(dictionaryApiEndpoint, "");
      throw new Error(`The word -- ${word} -- does not exist!`);
    }
    return response.json();
  });
}

export default function Headword({ params }: { params: { headword: string } }) {
  const headword = sanitizePathName(params.headword);

  const {
    data: apiData,
    error,
    isLoading,
  } = useSWR<HeadwordData, Error>(
    `${dictionaryApiEndpoint}${headword}`,
    fetchWord
  );

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
  // TODO (Coul Greer): Create a helper to help with API reusability in other projects as well as encapsulate responsibility
  let apiDatum;

  if (apiData) {
    [apiDatum] = apiData;
  }
  const data: HeadwordDisplay = apiDatum
    ? {
        word: apiDatum.word,
        phonetic: apiDatum.phonetic,
        partOfSpeech: apiDatum.meanings[0].partOfSpeech,
        definition: apiDatum.meanings[0].definitions[0].definition,
        quote:
          "I was gonna say -- and I- I think this is a great thing -- I feel like I've noticed this trend where I think you lose your patients more. The threshold is lower now at reunion. [...] But I think it's a way to release the valve because you only ever do it when it really gets so cacophonous that it's, like, this has- we have to release this.",
        author: "Matt Rogers",
        bodyOfWork: "Las Culturistas with Matt Rogers and Bowen Yang",
        granularContext: '"Dishing and Kibbitzing" (w/ Andy Cohen)',
      }
    : {
        word: fallback[0].word,
        phonetic: fallback[0].phonetic,
        partOfSpeech: fallback[0].meanings[0].partOfSpeech,
        definition: fallback[0].meanings[0].definitions[0].definition,
        quote: fallback[0].quote,
        author: fallback[0].author,
        bodyOfWork: fallback[0].bodyOfWork,
        granularContext: fallback[0].granularContext,
      };

  return (
    <ThemeProvider theme={darkMode}>
      <div className="word-entry">
        <div className="word-entry__header">
          <Typography variant="h2" className="word-entry__headword">
            {data.word}
          </Typography>
          <p className="word-entry__pronunciation text-small">
            {data.phonetic}
          </p>
          <hr className="word-entry__divider" />
          <p className="word-entry__part-of-speech">{data.partOfSpeech}</p>
        </div>
        <div className="word-entry__header-extension" />
        <div className="word-entry__body">
          <p className="word-entry__definition text-size-h5">
            {data.definition}
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

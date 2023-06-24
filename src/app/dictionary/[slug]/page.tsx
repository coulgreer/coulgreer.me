"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import useSWR from "swr";

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

const darkMode = createTheme({ palette: { mode: "dark" } });

const dictionaryApiEndpoint =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function fetchWord(url: string): Promise<HeadwordData> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      const word = url.replace(dictionaryApiEndpoint, "");
      throw new Error(`The word -- ${word} -- does not exist!`);
    }
    return response.json();
  });
}

export default function Headword() {
  const headword = usePathname().replace(/\/dictionary\//i, "");
  let failureData = {
    headword: "mystique",
    definition: "a quality of being special in a mysterious and attractive way",
    phonetics: " /mɪˈstiːk/",
    partOfSpeech: "noun",
    quote:
      "Now this word is, truly, mystique! Out of the blue it's come to you. When you were expecting another? But how could that be unless... Oh, no! An error with the API call. Now this is intriguing. Sorry about that. Don't worry your pretty little head. We- I am working to fix it just for you!",
    author: "A little scientist",
    bodyOfWork: "The World We Live In",
    granularContext: "Tapped Upon a Laptop",
  };

  const { data, error, isLoading } = useSWR<HeadwordData, Error>(
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

  return (
    <ThemeProvider theme={darkMode}>
      <div className="word-entry">
        <div className="word-entry__header">
          <Typography variant="h2" className="word-entry__headword">
            {data ? data[0].word : failureData.headword}
          </Typography>
          <p className="word-entry__pronunciation text-small">
            {data ? data[0].phonetic : failureData.phonetics}
          </p>
          <hr className="word-entry__divider" />
          <p className="word-entry__part-of-speech">
            {data ? data[0].meanings[0].partOfSpeech : failureData.partOfSpeech}
          </p>
        </div>
        <div className="word-entry__header-extension" />
        <div className="word-entry__body">
          <p className="word-entry__definition text-size-h5">
            {data
              ? data[0].meanings[0].definitions[0].definition
              : failureData.definition}
          </p>
          <figure className="quote">
            <blockquote className="quote__text">
              {data
                ? "I was gonna say -- and I- I think this is a great thing -- I feel like I've noticed this trend where I think you lose your patients more. The threshold is lower now at reunion. [...] But I think it's a way to release the valve because you only ever do it when it really gets so cacophonous that it's, like, this has- we have to release this."
                : failureData.quote}
            </blockquote>
            <figcaption className="quote__source text-caption">
              <p className="quote__author">
                {data ? "Matt Rogers" : failureData.author},
              </p>
              <p className="quote__creative-work">
                <cite>
                  {data
                    ? "Las Culturistas with Matt Rogers and Bowen Yang"
                    : failureData.bodyOfWork}
                </cite>
              </p>
              <p className="quote__context">
                {data
                  ? '"Dishing and Kibbitzing" (w/ Andy Cohen)'
                  : failureData.granularContext}
              </p>
            </figcaption>
          </figure>
        </div>
        <div className="word-entry__body-extension" />
      </div>
    </ThemeProvider>
  );
}

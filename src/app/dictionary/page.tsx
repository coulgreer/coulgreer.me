"use client";

import React from "react";
import { List, ListItem, Typography } from "@mui/material";
import Link from "next/link";

import { nanoid } from "nanoid";

import "./index.css";

type HeadwordSummary = { headword: string; quote: string };

function displayWords(list: Array<HeadwordSummary>) {
  return list.map((entry) => (
    <ListItem key={nanoid()} role="none">
      <Link href={`/dictionary/${entry.headword}`} className="index__link">
        <div className="index__word-container">
          <div className="index__decor-container">
            <svg
              className="index__word-decor index__word-decor--top index__word-decor--left"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 12.7 12.7"
            >
              <path d="m4.814 9.552-.452 2.607-4.171-.722.452-2.607Z" />
              <path d="M.307 2.34 2.703.259l5.208 5.99L5.515 8.33Z" />
              <path d="M9.232 1.94h2.646v3.97H9.232Z" />
            </svg>
            <svg
              className="index__word-decor index__word-decor--bottom index__word-decor--left"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 12.7 12.7"
            >
              <path d="m4.814 9.552-.452 2.607-4.171-.722.452-2.607Z" />
              <path d="M.307 2.34 2.703.259l5.208 5.99L5.515 8.33Z" />
              <path d="M9.232 1.94h2.646v3.97H9.232Z" />
            </svg>
          </div>
          <Typography variant="h3" className="index__word">
            {entry.headword}
          </Typography>
          <div className="index__decor-container">
            <svg
              className="index__word-decor index__word-decor--right index__word-decor--top"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 12.7 12.7"
            >
              <path d="m4.814 9.552-.452 2.607-4.171-.722.452-2.607Z" />
              <path d="M.307 2.34 2.703.259l5.208 5.99L5.515 8.33Z" />
              <path d="M9.232 1.94h2.646v3.97H9.232Z" />
            </svg>
            <svg
              className="index__word-decor index__word-decor--right index__word-decor--bottom"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 12.7 12.7"
            >
              <path d="m4.814 9.552-.452 2.607-4.171-.722.452-2.607Z" />
              <path d="M.307 2.34 2.703.259l5.208 5.99L5.515 8.33Z" />
              <path d="M9.232 1.94h2.646v3.97H9.232Z" />
            </svg>
          </div>
        </div>
        <blockquote className="index__quote">{entry.quote}</blockquote>
      </Link>
    </ListItem>
  ));
}

export default function Dictionary() {
  return (
    /* TODO (Coul Greer)
      Link the display of the preview to the databse, so that the preview and detailed
      view can pull from the database and match data such as blurbs. The words match
      simply because the link queries a 3rd party database.
    */
    <List className="index">
      {displayWords([
        {
          headword: "toot",
          quote:
            "A tutor who tooted the flute tried to teach two young tooters to toot. Said the two to the tutor, 'Is it harder to toot, or to tutor two tooters to toot?'",
        },
        { headword: "goodbye", quote: "Hello and goodbye, good sir!" },
        {
          headword: "pneumonoultramicroscopicsilicovolcanoconiosis",
          quote:
            "I can't even pronounce pneumonoultramicroscopicsilicovolcanoconiosis",
        },
      ])}
    </List>
  );
}

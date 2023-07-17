"use client";

import React from "react";
import { List, ListItem, Typography } from "@mui/material";
import Link from "next/link";

import { nanoid } from "nanoid";

import "./index.css";

function displayWords(list: Array<string>) {
  return list.map((entry) => (
    <ListItem key={nanoid()} role="none">
      <Link href={`/dictionary/${entry}`} className="index__link">
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
            {entry}
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
        <blockquote className="index__quote">A placeholder blurb</blockquote>
      </Link>
    </ListItem>
  ));
}

export default function Dictionary() {
  return (
    <List className="index">
      {displayWords([
        "hello",
        "goodbye",
        "pneumonoultramicroscopicsilicovolcanoconiosis",
      ])}
    </List>
  );
}

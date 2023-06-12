"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const darkMode = createTheme({ palette: { mode: "dark" } });

export default function Dictionary() {
  return (
    <ThemeProvider theme={darkMode}>
      <div className="word-entry">
        <div className="word-entry__header">
          <Typography variant="h2" className="word-entry__headword">
            cacophonous
          </Typography>
          <p className="word-entry__pronunciation  ">/kəˈkɑː.fə.nəs/</p>
          <hr className="word-entry__divider" />
          <p className="word-entry__part-of-speech">adjective</p>
        </div>
        <div className="word-entry__header-extension" />
        <div className="word-entry__body">
          <p className="word-entry__definition">
            having an unpleasant mixture of sounds
          </p>
          <figure className="quote">
            <blockquote className="quote__text">
              Here is a sentance that I heard or read that used cacophonous.
            </blockquote>
            <figcaption className="quote__source">
              <p className="quote__author">Speaker/Writer,</p>
              <p className="quote__creative-work">
                <cite>The piece of work</cite>
              </p>
              <p className="quote__context">Granular context</p>
            </figcaption>
          </figure>
        </div>
        <div className="word-entry__body-extension" />
      </div>
    </ThemeProvider>
  );
}

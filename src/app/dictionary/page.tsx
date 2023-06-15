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
          <p className="word-entry__pronunciation text-small">
            /kəˈkɑː.fə.nəs/
          </p>
          <hr className="word-entry__divider" />
          <p className="word-entry__part-of-speech">adjective</p>
        </div>
        <div className="word-entry__header-extension" />
        <div className="word-entry__body">
          <p className="word-entry__definition text-size-h5">
            having a harsh or discordant sound
          </p>
          <figure className="quote">
            <blockquote className="quote__text">
              I was gonna say -- and I- I think this is a great thing -- I feel
              like I&apos;ve noticed this trend where I think you lose your
              patients more. The threshold is lower now at reunion. [...] But I
              think it&apos;s a way to release the valve because you only ever
              do it when it really gets so cacophonous that it&apos;s, like,
              this has- we have to release this.
            </blockquote>
            <figcaption className="quote__source text-caption">
              <p className="quote__author">Matt Rogers,</p>
              <p className="quote__creative-work">
                <cite>Las Culturistas with Matt Rogers and Bowen Yang</cite>
              </p>
              <p className="quote__context">
                &quot;Dishing and Kibbitzing&quot; (w/ Andy Cohen)
              </p>
            </figcaption>
          </figure>
        </div>
        <div className="word-entry__body-extension" />
      </div>
    </ThemeProvider>
  );
}

"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Paper>
      <Typography variant="h2">Welcome to NEXT.js!</Typography>
      <div>
        <h1>H1 :: The quick brown fox jumps over the lazy dog</h1>
        <h1>
          H1 {">"} B :: The quick brown fox <b>jumps</b> over the lazy dog
        </h1>
        <h2>H2 :: The quick brown fox jumps over the lazy dog</h2>
        <h2>
          H2 {">"} B :: The quick brown fox <b>jumps</b> over the lazy dog
        </h2>
        <h3>H3 :: The quick brown fox jumps over the lazy dog</h3>
        <h3>
          H3 {">"} B :: The quick brown fox <b>jumps</b> over the lazy dog
        </h3>
        <h4>H4 :: The quick brown fox jumps over the lazy dog</h4>
        <h5>H5 :: The quick brown fox jumps over the lazy dog</h5>
        <p>P :: The quick brown fox jumps over the lazy dog</p>
        <p>
          P {">"} B :: The quick brown fox <b>jumps</b> over the lazy dog
        </p>
      </div>
    </Paper>
  );
}

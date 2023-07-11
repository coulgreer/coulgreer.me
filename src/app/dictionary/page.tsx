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
        <Typography variant="h3" className="index__word">
          {entry}
        </Typography>
        <blockquote className="index__quote">A placeholder blurb</blockquote>
      </Link>
    </ListItem>
  ));
}

export default function Dictionary() {
  return (
    <List className="index">{displayWords(["hello", "goodbye", "twice"])}</List>
  );
}

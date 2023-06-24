"use client";

import { List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Dictionary() {
  return (
    <>
      <Typography variant="h2">Dictionary</Typography>
      <List>
        <ListItem role="none">
          <Link href="/dictionary/hello">Hello</Link>
        </ListItem>
      </List>
    </>
  );
}

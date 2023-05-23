"use client";

import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <AppBar component="nav">
        <List>
          <ListItem>
            <Typography>Homepage</Typography>
          </ListItem>
          <ListItem>
            <Link href="/about">About</Link>
          </ListItem>
        </List>
      </AppBar>
      <Typography variant="h2">Welcome to NEXT.js!</Typography>
    </>
  );
}

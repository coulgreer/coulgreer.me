"use client";

import React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";

export default function Navbar() {
  return (
    <AppBar component="nav">
      <List>
        <ListItem>
          <Link href="/">About... Me</Link>
        </ListItem>
        <ListItem>
          <Link href="/blog">Journal</Link>
        </ListItem>
        <ListItem>
          <Link href="/dictionary">Dictionary</Link>
        </ListItem>
        <ListItem>
          <Link href="/recipes">Cookbook</Link>
        </ListItem>
        <ListItem>
          <Link href="/projects">Scrapbook</Link>
        </ListItem>
      </List>
    </AppBar>
  );
}

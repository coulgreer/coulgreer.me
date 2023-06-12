"use client";

import React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";

import "./index.css";

export default function Navbar() {
  return (
    <AppBar component="nav" className="navbar">
      <List className="navbar__menu">
        <ListItem>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 12.7 12.7"
            >
              <path
                d="M7.342 6.35a.992.992 0 0 1-.992.992.992.992 0 0 1-.992-.992.992.992 0 0 1 .992-.992.992.992 0 0 1 .992.992Z"
                className="logo__focal"
              />
              <path
                d="M8.802 5.755A1.263 1.786 0 0 0 7.539 7.54h-.005A2.381 2.58 0 0 1 6.35 9.576a2.381 2.58 0 0 1-2.381 0 2.381 2.58 0 0 1-1.183-2.034h-.008a4.763 4.763 0 0 0 2.381 4.123 4.763 4.763 0 0 0 4.763 0 4.763 4.763 0 0 0 2.381-4.124h-.002a1.263 1.786 0 0 0-1.263-1.786 1.263 1.786 0 0 0-1.118.958 1.263 1.786 0 0 0-1.118-.958Z"
                className="logo__bottom"
              />
              <path
                d="M5.16.397a4.763 4.763 0 0 0-2.382.637A4.763 4.763 0 0 0 .398 5.07a1.262 1.786 0 0 0-.001.09 1.262 1.786 0 0 0 1.262 1.786 1.262 1.786 0 0 0 1.12-.962 1.262 1.786 0 0 0 1.119.962A1.262 1.786 0 0 0 5.159 5.16h.009a2.381 2.58 0 0 1 1.181-2.035 2.381 2.58 0 0 1 2.381 0 2.381 2.58 0 0 1 1.184 2.034h.008A4.763 4.763 0 0 0 7.54 1.036a4.763 4.763 0 0 0-2.382-.64Z"
                className="logo__top"
              />
            </svg>
          </Link>
        </ListItem>
        <ListItem className="navbar__link-list-container">
          <List className="navbar__link-list">
            <ListItem className="navbar__list-item">
              <Link className="navbar__link navbar__link--neon" href="/blog">
                Journal
              </Link>
            </ListItem>
            <ListItem className="navbar__list-item">
              <Link
                className="navbar__link navbar__link--neon"
                href="/dictionary"
              >
                Dictionary
              </Link>
            </ListItem>
            <ListItem className="navbar__list-item">
              <Link className="navbar__link navbar__link--neon" href="/recipes">
                Cookbook
              </Link>
            </ListItem>
            <ListItem className="navbar__list-item">
              <Link
                className="navbar__link navbar__link--neon"
                href="/projects"
              >
                Scrapbook
              </Link>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </AppBar>
  );
}

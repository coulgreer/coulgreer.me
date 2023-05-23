"use client";

import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function About() {
  return (
    <div>
      <Typography variant="h1">About Page</Typography>
      <Link href="/">Homepage</Link>
    </div>
  );
}

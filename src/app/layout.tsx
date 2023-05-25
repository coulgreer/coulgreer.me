import React from "react";
import Navbar from "../components/navbar";

import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coul Greer, Here",
  description:
    "The personal portfolio of Coul Greer. Take a load off and look around. I've been cleaning up the place just for you. *smile*",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

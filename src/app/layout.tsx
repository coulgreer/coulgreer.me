import React from "react";
import Navbar from "../components/Navbar";

import "../globals.css";

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
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

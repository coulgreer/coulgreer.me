import React from "react";
import { Ubuntu, Literata } from "next/font/google";
import Navbar from "../frontend/components/Navbar";
import Footer from "../frontend/components/Footer";
import FireflyDecor from "../frontend/components/FireflyDecor";

import "../frontend/globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
});

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
    <html lang="en" className={`${ubuntu.variable} ${literata.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <FireflyDecor />
        <Footer />
      </body>
    </html>
  );
}

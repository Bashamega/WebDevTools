"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Banner from "free-ps-banner";

const inTer = Inter({ subsets: ["latin"] });

export const mETADatA = {
  title: "Web Dev Tools",
  description:
    "Cool web dev tools, that can help you with your journey as a web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden scrollbar">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inTer.className}>
        <Banner showButton={false} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

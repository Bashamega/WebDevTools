import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Banner from "free-ps-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
      <body className={inter.className}>
        <div id="banner" className="sticky top-0 z-50">
          <Banner showButton={false} className="mb-7" />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

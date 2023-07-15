import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Dev Tools",
  description: "Cool tools!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Web dev tools</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

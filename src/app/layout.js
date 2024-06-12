import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Dev Tools",
  description:
    "Cool web dev tools, that can help you with your journey as a web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

"use client";
import Link from "next/link";
import React from "react";

interface CardProps {
  link: string;
  title: string;
  isDarkMode: boolean;
}

const Card: React.FC<CardProps> = ({ link, title, isDarkMode }) => {
  return (
    <Link
      href={link}
      className="group relative block p-10 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
            : "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 group-hover:opacity-90 transition-opacity"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-2xl font-bold transition-colors group-hover:text-yellow-300 text-center">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default Card;

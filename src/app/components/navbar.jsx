"use client"
import React from "react";
import Search from "./search";
import Link from "next/link";
export function NavBar({ title }) {
    return (
        <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between">
            <Link
                href="/"
                className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
            >
                <h1 className="text-white text-lg md:text-2xl font-bold mr-2">
                    Web Dev Tools
                </h1>
                <p>{title}</p>
            </Link>
            <Search />
        </nav>
    );
}
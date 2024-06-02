"use client";
import Nav from "./components/nav";
import React from "react";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";

export default function Home({ state }) {
  const [contributors, setContributors] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/bashamega/webdevtools/contributors"
      );
      const data = await response.json();
      setContributors(data);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="" class="bg-gray-900">

      <Nav></Nav>
      <div class="flex justify-center flex-col items-center w-full">
        

        

        <Footer/>
      </div>
    </main>
  );
}

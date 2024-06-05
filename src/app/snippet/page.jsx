"use client";
import React, { useState } from "react";

import { NavBar } from "@/app/components/navbar";
import Footer from "../components/Footer";

export default function ButtonCustomizer() {
  const [articles, setarticles] = useState([])
  return (
    <main className="h-screen w-screen flex flex-col gap-10">
      <NavBar title={"Snippets"}/>
      <div className="flex items-center justify-center w-full h-full">
        <Footer/>
      </div>
    </main>
  );
}

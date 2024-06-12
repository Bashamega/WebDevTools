"use client";
import React, { useState } from "react";

import { NavBar } from "@/app/components/navbar";

export default function ButtonCustomizer() {
  return (
    <main className="h-screen flex flex-col gap-10">
      <NavBar title={"Snippets"} />
    </main>
  );
}

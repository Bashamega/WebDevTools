"use client";
import { NavBar } from "@/app/components/navbar";
import CardForm from "./components/CardForm";
import Heroish from "./components/Heroish";
export function JsonGeneratorMain() {
  return (
    <main>
      <NavBar title={"Json Generator"} />
      <Heroish />
      <CardForm />
    </main>
  );
}

export default JsonGeneratorMain;

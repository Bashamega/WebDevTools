import React from "react";
//import Footer from "@/app/components/Footer";
import { NavBar } from "@/app/components/navbar";
import Editor from "./components/Editor";
import Nav from "../components/nav";
const page = () => {
  return (
    <div className=" max-h-[100vh] overflow-hidden">
      <Nav />
      <Editor />
    </div>
  );
};

export default page;

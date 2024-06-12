import React from "react";
//import Footer from "@/app/components/Footer";
import { NavBar } from "@/app/components/navbar";
import Editor from "./components/Editor";
const page = () => {
  return (
    <div className=" max-h-[100vh] overflow-hidden">
      <NavBar title={"Box Shadow generator"} />
      <Editor />
    </div>
  );
};

export default page;

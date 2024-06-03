import React from "react";
import Footer from "@/app/components/Footer";
import { NavBar } from "@/app/components/navbar";
import Link from "next/link";
const page = () => {

  return (
    <div>
      <NavBar title={"Box Shadow generator"}/>
      <main className="flex justify-center flex-col items-center w-full">
        
        <Footer />
      </main>
    </div>
  );
};

export default page;

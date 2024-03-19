"use client";
import { faker } from "@faker-js/faker";
import React, { useState } from "react";

const Button = ({ onClick, title, size }) => {
  const buttonSize = size === "small" ? " w-20" : " w-48";
  return (
    <button
      onClick={() => {
        onClick();
      }}
      type="button"
      className={
        "m-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" +
        buttonSize
      }
    >
      {title}
    </button>
  );
};

export default Button;

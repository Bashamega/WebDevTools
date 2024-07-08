import React from "react";
import { FaGithub, FaHome } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer class="w-[26rem] md:w-[40rem] max-w-full bg-white rounded-lg shadow-lg m-4 dark:bg-gray-800 fixed bottom-0 min-w-80">
      <div class="w-full mx-auto max-w-screen-xl p-4 flex justify-center flex-col items-center md:flex-row md:justify-between">
        <span class="text-sm text-gray-500 text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" class="hover:underline">
            WebDevTools
          </Link>
          . All Rights Reserved.
        </span>{" "}
        &emsp;
        <ul class="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="/"
              class="mr-4 hover:underline md:mr-6 flex items-center justify-center gap-2"
            >
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/Bashamega/WebDevTools"
              class="hover:underline flex items-center justify-center gap-2"
            >
              <FaGithub />
              Repository
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

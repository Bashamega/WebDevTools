import React from "react";
import { FaGithub, FaHome } from "react-icons/fa";

const Footer = () => {
  return (
    <footer class="w-[26rem] md:w-[40rem] max-w-full bg-white rounded-lg shadow-lg m-4 dark:bg-gray-800 fixed bottom-0">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://web-dev-tools.vercel.app/" class="hover:underline">
            WebDevTools
          </a>
          . All Rights Reserved.
        </span>{" "}
        &emsp;
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://web-dev-tools.vercel.app/"
              class="mr-4 hover:underline md:mr-6 flex items-center justify-center gap-2"
            >
              <FaHome />
              Home
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Bashamega/WebDevTools"
              class="hover:underline flex items-center justify-center gap-2"
            >
              <FaGithub />
              Repository
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

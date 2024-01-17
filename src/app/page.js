"use client";
import Nav from "./assets/nav";
import React from "react";
import { useState, useEffect } from "react";
import { FaGithub, FaHome } from "react-icons/fa";

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
      <title>Web dev tools</title>
      <Nav></Nav>
      <div class="flex justify-center flex-col items-center w-full">
        <div
          id="about"
          class="my-9 break-words block max-w-[26rem] md:max-w-[40rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            About
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            WebDev Tools is a comprehensive online platform designed to empower
            web developers with a wide array of code samples and snippets.
            Whether you are a seasoned professional or just starting your
            journey in web development, our website provides you with a vast
            collection of code examples to streamline your workflow, enhance
            productivity, and create exceptional websites and web applications.
          </p>
        </div>

        <div class="p-4 text-center max-w-[26rem] md:max-w-[40rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Want to contribute?
          </h5>
          <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Visit the Github repo, make sure to follow the guidelines and
            contribute!
          </p>
          <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
            <a
              href="https://github.com/Bashamega/WebDevTools"
              class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 hover:shadow-card-shadow  transition-all duration-500 ease-in"
            >
              <svg
                class="mr-3 w-7 h-7"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                  fill="#fff"
                />
              </svg>

              <div class="text-left ">
                <div class="mb-1 text-xs">Go to the</div>
                <div class="-mt-1 font-sans text-sm font-semibold ">
                  Github Repo
                </div>
              </div>
            </a>
          </div>
        </div>

        <div
          id="contributers"
          className="my-9 max-w-[26rem] md:max-w-[40rem]  break-words block py-6 md:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex justify-center items-center">
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {contributors && contributors.length > 0 ? (
                contributors.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-card-shadow  transition-all duration-500 ease-in "
                  >
                    <a
                      href={item.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-col hover:scale-105 transition-all duration-500 ease"
                    >
                      <img
                        src={item.avatar_url}
                        alt={item.login}
                        width={48}
                        height={48}
                        className="w-12 h-12 mr-2 rounded-full self-center "
                      />
                      {item.login}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-white">No data available</p>
              )}
            </div>
          </div>
        </div>

        <footer class="w-[26rem] md:w-[40rem] max-w-full bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://web-dev-tools.vercel.app/"
                class="hover:underline"
              >
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
      </div>
    </main>
  );
}

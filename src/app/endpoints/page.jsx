"use client";
import Footer from "../components/Footer";
import { NavBar } from "../components/navbar";
import React, { useState } from "react";

export default function Endpoints() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sectionStyle =
    "p-4 text-left w-full max-w-[26rem] md:max-w-[40rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700";

  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"} min-h-screen pb-10`}
    >
      <NavBar
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        title="Endpoints"
      />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          id="about"
          className="my-9 break-words block max-w-[26rem] md:max-w-[40rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            API Endpoints for Dummy JSON Data
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            There are three api endpoints available for fetching dummy JSON
            data: <code>/api/users</code>, <code>/api/users/:userId</code>, and{" "}
            <code>/api/posts</code>. The data is stored in JSON files in the{" "}
            <code>db</code> directory.
          </p>
        </div>

        <div className={sectionStyle}>
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Get All Users
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/users
            </code>
            <br />
            Fetches a paginated list of users. Accepts an optional{" "}
            <code>page</code> query parameter to specify the page of results.
            Renders 10 users per page.
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Example:{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/users?page=1
            </code>
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Response:
            <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded mt-2 text-gray-800 dark:text-gray-300">
              {`[
  {
    "userId": 1,
    "name": "starrynight",
    "followers": [2, 3, 4],
    "following": [2, 5, 6],
    "email": "alice.johnson@example.com"
  },
  {
    "userId": 2,
    "name": "blueocean",
    "followers": [1, 3],
    "following": [1, 4],
    "email": "bob.smith@example.com"
  },
    ...`}
            </pre>
          </p>
        </div>

        <div className={sectionStyle}>
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Get Single User
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/users/:userId
            </code>
            <br />
            Fetches the details of a single user by their userId.
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Example:{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/users/1
            </code>
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Response:
            <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded mt-2 text-gray-800 dark:text-gray-300">
              {`{
  "userId": 1,
  "name": "starrynight",
  "followers": [2, 3, 4],
  "following": [2, 5, 6],
  "email": "alice.johnson@example.com"
}`}
            </pre>
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            If the user is not found, a{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              404 Not Found
            </code>{" "}
            status is returned:
            <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded mt-2 text-gray-800 dark:text-gray-300">
              {`{
  "error": "User not found"
}`}
            </pre>
          </p>
        </div>

        <div className={sectionStyle}>
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Get All Posts
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/posts
            </code>
            <br />
            Fetches a list of all posts. Accepts an optional <code>
              page
            </code>{" "}
            query parameter to specify the page of results. Renders 10 posts per
            page. Default page is 1.
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Example:{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              GET /api/posts
            </code>
          </p>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Response:
            <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded mt-2 text-gray-800 dark:text-gray-300">
              {`[
  {
    "postId": 1,
    "userId": 1,
    "title": "My First Post",
    "content": "This is the content of my first post."
  },
  {
    "postId": 2,
    "userId": 2,
    "title": "Another Post",
    "content": "This is some other post content."
  },
    ...
]`}
            </pre>
          </p>
        </div>

        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </main>
  );
}

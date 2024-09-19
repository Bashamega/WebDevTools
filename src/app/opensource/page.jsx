"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import repos from "./repos.json";

const MainPage = () => {
  const [repoDetails, setRepoDetails] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // To toggle dark mode
  const [repoName, setRepoName] = useState("");
  const [repoOwner, setRepoOwner] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const repoData = await Promise.all(
        repos.map(async (repo) => {
          try {
            const response = await axios.get(
              `https://api.github.com/repos/${repo.repoOwner}/${repo.repoName}`,
            );
            return response.data;
          } catch (error) {
            console.error(
              `Failed to fetch repo: ${repo.repoOwner}/${repo.repoName}`,
              error,
            );
            return null; // If there's an error, return null for that repo
          }
        }),
      );

      // Filter out any null values (repos that failed to fetch)
      const validRepoData = repoData.filter((repo) => repo !== null);

      // Sort the valid repos by stars
      const sortedData = validRepoData.sort(
        (a, b) => b.stargazers_count - a.stargazers_count,
      );
      setRepoDetails(sortedData);
    };

    fetchRepos();
  }, []);

  return (
    <div
      className={`${isDarkMode ? "bg-black-900 text-amber-500" : "bg-white text-black"} min-h-screen transition-colors duration-500`}
    >
      {/* Dark mode toggle */}
      <div className="flex justify-center items-center p-6">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-5 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-transform duration-300 transform hover:scale-105"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-5xl font-extrabold text-center mb-12">
        Open Source Projects Collection
      </h1>
      {/* Contribution Link */}
      <div className="flex justify-center mb-6">
        {" "}
        {/* Reduced margin-bottom */}
        <a
          href="https://github.com/Bashamega/WebDevTools" // Replace with your GitHub repo link
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#00FF00] text-black font-semibold rounded-lg shadow-lg hover:bg-[#00CC00] transition-transform duration-300 transform hover:scale-105"
          style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.8)" }} // Neon effect
        >
          Contribute Your Repo to JSON File
        </a>
      </div>
      <div className="flex justify-center mb-6">
        {" "}
        {/* Reduced margin-bottom */}
        <a
          href="/Contribution_Guide.pdf" // This assumes the PDF is in the public folder
          download="Contribution_Guide.pdf"
          className="px-6 py-3 bg-[#FF00FF] text-black font-semibold rounded-lg shadow-lg hover:bg-[#CC00CC] transition-transform duration-300 transform hover:scale-105"
          style={{ boxShadow: "0 0 10px rgba(255, 0, 255, 0.8)" }} // Neon effect
        >
          Download Contribution Guide (PDF)
        </a>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {repoDetails.map((repo) => (
          <div
            key={repo.id}
            className="p-5 rounded-xl shadow-lg overflow-hidden bg-white border border-gray-300 hover:shadow-xl transition-all"
          >
            <a
              href={`https://github.com/${repo.owner?.login}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {repo.name}
              </h2>

              <p className="mb-1">
                ⭐{" "}
                <span className="font-bold">
                  {repo.stargazers_count || "N/A"}
                </span>{" "}
                Stars
              </p>

              <p className="mb-1">
                📌 Tags:{" "}
                <span className="font-bold">
                  {repo.topics?.length > 0 ? repo.topics.join(", ") : "No Tags"}
                </span>
              </p>

              <p className="mb-1">
                🛠️ Language:{" "}
                <span className="font-bold">{repo.language || "Unknown"}</span>
              </p>

              <p className="mb-1">
                🗓️ Last Updated:{" "}
                <span className="font-bold">
                  {repo.updated_at
                    ? new Date(repo.updated_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>

              <p className="mb-1">
                🐛 Open Issues:{" "}
                <span className="font-bold">
                  {repo.open_issues_count || "N/A"}
                </span>
              </p>

              <p className="mb-1">
                📂 Pull Requests:{" "}
                <span className="font-bold">
                  {repo.pull_requests_count || "N/A"}
                </span>
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

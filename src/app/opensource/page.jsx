"use client";
import React, { useEffect, useState } from "react";
import repos from "../../db/repos.json";
import { NavBar } from "../../components/navbar.jsx";

const MainPage = () => {
  const [repoDetails, setRepoDetails] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // To toggle dark mode
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const repoData = await Promise.all(
        repos.map(async (repo) => {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${repo.repoOwner}/${repo.repoName}`,
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch repo: ${repo.repoOwner}/${repo.repoName}`,
              );
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(
              `Error fetching repo: ${repo.repoOwner}/${repo.repoName}`,
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

  // Filter the repo list based on search term (by repo name or owner)
  const filteredRepos = repoDetails.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.owner?.login.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-500`}
    >
      {/* Navbar with Dark Mode Toggle */}
      <NavBar
        title="Open Source Projects"
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Heading and Buttons */}
      <div className="flex flex-col items-center py-4">
        <h1 className="text-3xl font-bold mb-4">Open Source Projects</h1>

        <div className="flex space-x-4 mb-4">
          {/* Contribute Button */}
          <a
            href="https://github.com/Bashamega/WebDevTools"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-[#00FF00] text-black font-semibold rounded-lg shadow-lg hover:bg-[#00CC00] transition-transform duration-300 transform hover:scale-105"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.8)" }}
          >
            Contribute Repo
          </a>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex justify-center py-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by repo or owner..."
          className="px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-700"
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-12">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className={`p-5 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800 text-white border border-gray-600 shadow-lg "
                : "bg-gray-100 text-black border border-gray-300 shadow-lg "
            }`}
            style={
              isDarkMode
                ? { boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }
                : {}
            }
          >
            <a
              href={`https://github.com/${repo.owner?.login}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h2
                className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-teal-400" : "text-blue-800"
                }`}
              >
                {repo.name}
              </h2>

              {/* Display Owner Name */}
              <p className="mb-1">
                👤 Owner:{" "}
                <span
                  className={`font-bold ${
                    isDarkMode ? "text-pink-400" : "text-red-800"
                  }`}
                >
                  {repo.owner?.login || "Unknown"}
                </span>
              </p>

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

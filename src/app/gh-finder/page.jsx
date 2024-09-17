"use client";
import { useEffect, useState, useCallback } from "react";
import { NavBar } from "../../components/navbar";
import Link from "next/link";
import BasicModal from "./modal";
import Pagination from "./pagination";

export default function GhFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);

  // New states
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [currentPage, setCurrentPage] = useState(10);
  const [maxResults, setMaxResults] = useState(10);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resultPerPageChoices = [5, 10, 25, 50];

  const cacheKey = selected === 1 ? "webdevtools-issues" : `github-issues-100`;
  const cacheExpirationKey = `${cacheKey}-timestamp`;
  const cacheExpirationTime = 1000 * 60 * 30; // Cache expiration time (e.g., 30 minutes)

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // New function to fetch PRs linked to issues
  const fetchPRsForIssue = async (issue) => {
    const timelineUrl = `${issue.url}/timeline`;
    try {
      const response = await fetch(timelineUrl, {
        headers: {
          Accept: "application/vnd.github.mockingbird-preview+json",
        },
      });
      const events = await response.json();
      const linkedPRs = events?.filter(
        (event) =>
          event.event === "cross-referenced" &&
          event.source?.issue?.pull_request,
      );
      return linkedPRs.map((pr) => pr.source.issue.pull_request.html_url);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const addPRsInfoToIssues = useCallback(async (issues) => {
    const issuesWithPRsInfo = await Promise.all(
      issues.map(async (issue) => {
        const linkedPRs = await fetchPRsForIssue(issue);
        return { ...issue, linkedPRs: linkedPRs };
      }),
    );
    return issuesWithPRsInfo;
  }, []);

  // Fetch new data
  useEffect(() => {
    const urlWebDevTools =
      "https://api.github.com/repos/bashamega/webdevtools/issues";
    const urlGitHub =
      "https://api.github.com/search/issues?q=state:open+is:issue&per_page=100&page=1";

    const url = selected === 1 ? urlWebDevTools : urlGitHub;

    const updateData = (newData) => {
      const now = new Date().getTime();
      localStorage.setItem(cacheKey, JSON.stringify(newData));
      localStorage.setItem(cacheExpirationKey, now.toString());

      setData(newData);
    };

    const fetchDataAndSet = async () => {
      const result = await fetchData(url);
      let filteredData =
        selected === 1
          ? result.filter((item) => !item.node_id.includes("PR_"))
          : result.items;

      if (url === urlWebDevTools) {
        filteredData = await addPRsInfoToIssues(filteredData);
      }

      updateData(filteredData);
    };

    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheExpirationKey);
    const now = new Date().getTime();

    if (
      !(
        cachedData &&
        cacheTimestamp &&
        now - cacheTimestamp < cacheExpirationTime
      )
    ) {
      fetchDataAndSet();
    } else {
      setData(JSON.parse(cachedData));
    }
  }, [
    selected,
    cacheKey,
    cacheExpirationKey,
    cacheExpirationTime,
    addPRsInfoToIssues,
  ]);

  // Filter issues by search keywords and assignment status
  useEffect(() => {
    const issuesBySearch = (issues) => {
      return issues.filter((issue) => {
        const matchesSearch = issue.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesAssignment = isAssigned
          ? issue.assignees.length > 0
          : true;
        return matchesSearch && matchesAssignment;
      });
    };

    // Filter issues by label
    const issuesByLabel = (issues) => {
      return issues.filter((issue) => {
        return selectedLabels.every((selectedLabel) => {
          return issue.labels.some((label) => label.name === selectedLabel);
        });
      });
    };

    setFilteredIssues(issuesByLabel(issuesBySearch(data)));
    setCurrentPage(1);
  }, [data, isAssigned, searchQuery, selectedLabels]);

  const getIssuesByPage = useCallback(() => {
    const startResult = (currentPage - 1) * maxResults + 1;
    const endResult = Math.min(currentPage * maxResults, filteredIssues.length);
    return filteredIssues.slice(startResult - 1, endResult);
  }, [currentPage, filteredIssues, maxResults]);

  const issuesByPage = getIssuesByPage();

  function isDarkColor(color) {
    // Convert the color to RGB
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if luminance is less than 0.5 (considered dark)
    return luminance < 0.5;
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div
            className={
              "h-24 w-24 rounded-full border-t-8 border-b-8 " +
              (isDarkMode ? "border-gray-900" : "border-gray-100")
            }
          ></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          <p className="mt-2 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
      } min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="mt-10 flex w-screen justify-center">
        <header>
          <h1 className="relative z-10 font-sans text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
            Github Issue Finder
          </h1>

          <div className="flex flex-col md:flex-row justify-between w-full  lg:whitespace-nowrap my-5 items-center">
            <input
              type="text"
              className="p-2 rounded border border-gray-400 text-black"
              placeholder="Search issues"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center mx-4 my-4">
              <input
                type="checkbox"
                id="isAssigned"
                checked={isAssigned}
                onChange={() => setIsAssigned(!isAssigned)}
                className="mr-2"
              />
              <label htmlFor="isAssigned">Is assigned</label>
            </div>
            <div>
              <p>Results per page</p>
              <div className="flex justify-between">
                {resultPerPageChoices.map((num) => (
                  <button key={num} onClick={() => setMaxResults(num)}>
                    <span
                      className={`underline mx-1 ${
                        num === maxResults && "text-cyan-600 font-bold"
                      }`}
                    >
                      {num}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full my-5 items-center">
            <button
              className={
                "hover:bg-blue-800 transition-colors md:min-w-1/3 duration-100 px-3 py-2 md:p-5 text-sm rounded-full hover:text-white " +
                (selected === 1 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(1)}
            >
              Web Dev Tools Issues
            </button>
            <button
              className={
                "hover:bg-blue-800 transition-colors md:w-1/3 duration-100 px-3 py-2 md:p-5 text-sm rounded-full hover:text-white " +
                (selected === 2 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(2)}
            >
              Github
            </button>
            <BasicModal
              isDarkMode={isDarkMode}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          </div>
        </header>
      </div>
      <div className=" mx-auto w-[80%] md:w-1/2">
        {filteredIssues.length === 0 ? (
          <div className="bg-red-700 dark:bg-black rounded-lg pl-5 py-5 flex w-full">
            <h3 className="text-white font-bold text-3xl">
              No issues satisfying the criteria
            </h3>
          </div>
        ) : (
          issuesByPage.map((item) => (
            <div
              key={item.id}
              className="bg-slate-500 rounded-lg mb-5 last:mb-0 pl-5 py-5 flex justify-between items-end w-full"
            >
              <div className=" overflow-hidden">
                <Link
                  href={item.html_url}
                  className="text-white font-bold text-3xl hover:underline truncate block"
                >
                  {item.title}
                </Link>
                <Link
                  className="text-slate-300"
                  href={item.repository_url.replace(
                    "https://api.github.com/repos",
                    "https://github.com",
                  )}
                >
                  {item.repository_url.replace(
                    "https://api.github.com/repos/",
                    "",
                  )}
                </Link>
                <div
                  className={
                    "flex flex-wrap items-center mt-3 gap-2 " +
                    (isDarkMode ? "text-gray-300" : "text-gray-600")
                  }
                >
                  {item.labels?.map((label) => (
                    <span
                      key={label.id}
                      className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full truncate"
                      style={{
                        backgroundColor: `#${label.color}`,
                        color: isDarkColor(`#${label.color}`)
                          ? "white"
                          : "black",
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm truncate text-white mx-3">
                  {item.comments} Comments
                </div>
                {item.linkedPRs?.length > 0 && (
                  <div className="mt-2">
                    {item.linkedPRs.map((prUrl, index) => (
                      <Link
                        key={index}
                        href={prUrl}
                        className="text-white hover:underline"
                      >
                        PR #{index + 1}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        resultsPerPage={maxResults}
        totalResults={filteredIssues.length}
      />
    </div>
  );
}

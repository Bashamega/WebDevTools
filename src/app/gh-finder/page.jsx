"use client";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar";
import Link from "next/link";
import Image from "next/image";
import BasicModal from "./modal";
import { InsertLink, LinkOff } from "@mui/icons-material";
// import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function GhFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState();
  const [displayData, setDisplayData] = useState();
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [filteredIssue, setFilteredIssue] = useState([]);

  // New states
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [maxResults, setMaxResults] = useState(10); //   TODO FEATURE => Add Pages

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setData([]);
    const url =
      selected === 1
        ? "https://api.github.com/repos/bashamega/webdevtools/issues"
        : `https://api.github.com/search/issues?q=state:open+is:issue&per_page=${maxResults}&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((d) =>
        selected === 1
          ? setData(d.filter((item) => !item.node_id.includes("PR_")))
          : setData(d.items),
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [selected]);

  // Filter issues by label
  const issuesByLabel = () => {
    if (data?.length) {
      const newFilterIssues = data.filter((issue) => {
        return selectedLabels.every((selectedLabel) => {
          return issue.labels.some((label) => label.name === selectedLabel);
        });
      });
      setFilteredIssue(newFilterIssues);
    }
  };

  useEffect(() => {
    issuesByLabel();
  }, [selectedLabels]);

  //  Filter function for search, assign and fork
  // useEffect(() => {
  const filteredData = data?.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAssignment = isAssigned ? issue.assignees.length > 0 : true;
    // console.log({ matchesAssignment, matchesSearch });
    return matchesSearch && matchesAssignment;
  });

  const issuesToDisplay =
    filteredIssue.length > 0 ? filteredIssue : filteredData;

  // setDisplayData(filteredData);
  // }, [searchQuery, isAssigned]);

  // New function to fetch PRs linked to issues
  const fetchPRsForIssue = async (issue) => {
    const timelineUrl = `${issue.url}/timeline`;
    const response = await fetch(timelineUrl, {
      headers: {
        Accept: "application/vnd.github.mockingbird-preview+json",
      },
    });
    const events = await response.json();
    const linkedPRs = events?.filter(
      (event) =>
        event.event === "cross-referenced" && event.source?.issue?.pull_request,
    );
    return linkedPRs.map((pr) => pr.source.issue.pull_request.html_url);
  };

  //TODO
  // New useEffect to add PRs linked to issues
  useEffect(() => {
    const fetchPRsInfo = async () => {
      const issuesWithPRsInfo = await Promise.all(
        data.map(async (issue) => {
          const linkedPRs = await fetchPRsForIssue(issue);
          return { ...issue, linkedPRs };
        }),
      );
      setData(issuesWithPRsInfo);
    };

    //&& !data?.linkedPRs

    if (data?.length > 0) {
      fetchPRsInfo();
    }
  }, [data]);

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

  // useEffect(() => {
  //   if (filteredIssue.length > 0) {
  //     setDisplayData(filteredIssue);
  //   }
  // }, [filteredIssue]);

  if (!issuesToDisplay?.length) {
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
        <header className="lg:w-2/3">
          <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
            Github Issue Finder
          </h1>

          <div className="flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5 items-center">
            <input
              type="text"
              className="p-2 rounded border border-gray-400"
              placeholder="Search issues"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAssigned"
                checked={isAssigned}
                onChange={() => setIsAssigned(!isAssigned)}
                className="mr-2"
              />
              <label htmlFor="isAssigned">Is assigned</label>
            </div>
          </div>

          <div className="flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5 items-center">
            <button
              className={
                "hover:bg-blue-800 transition-colors min-w-1/3 duration-100 p-5 rounded-full hover:text-white " +
                (selected === 1 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(1)}
            >
              Web Dev Tools Issues
            </button>
            <button
              className={
                "hover:bg-blue-800 transition-colors w-1/3 duration-100 p-5 rounded-full hover:text-white " +
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
      <div className="ml-[25%] w-1/2">
        {issuesToDisplay.map((item) => (
          <div
            key={item.id}
            className="bg-slate-500 rounded mb-5 pl-5 pb-5 flex w-full"
          >
            <div className="w-2/3 overflow-hidden">
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

              <br />
              <div className="flex flex-wrap mt-2 items-center sm:w-2/3 gap-1 max-h-[50px] overflow-auto w-full">
                {item.labels && item.labels.length > 0 ? (
                  item.labels.map((label) => {
                    const isDark = isDarkColor(label.color);
                    const textColor = isDark ? "text-white" : "text-gray-800";

                    return (
                      <p
                        key={label.id}
                        className={`bg-gray-300 text-center ${textColor} px-2 py-1 rounded mr-2 mb-2 cursor-pointer truncate w-[calc(30%)]`}
                        style={{ backgroundColor: `#${label.color}` }}
                      >
                        {label.name}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-white">No labels</p>
                )}
              </div>
              <div className="mt-2">
                {item.linkedPRs && item.linkedPRs.length > 0 ? (
                  <>
                    <p className="text-green-500">
                      {" "}
                      <InsertLink /> Linked PRs:
                    </p>
                    <ul className="list-disc ml-5 text-blue-500">
                      {item.linkedPRs.map((prUrl, index) => (
                        <li key={index}>
                          <Link
                            href={prUrl}
                            className="text-blue-500 hover:underline"
                          >
                            {prUrl}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-red-800">
                    <LinkOff /> No linked PRs
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <p className="text-white">Created by:</p>
                <Link
                  href={item.user.html_url}
                  className="flex items-center text-white ml-5"
                >
                  <Image
                    src={item.user.avatar_url}
                    className="rounded-full w-6 h-6 mr-2"
                    alt="User Avatar"
                    width={0}
                    height={0}
                  />
                  <p className="text-white">{item.user.login}</p>
                </Link>
              </div>
              <div className="text-white w-full">
                <p>Reactions: </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    👍 <p className="ml-1">{item.reactions["+1"]}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    👎 <p className="ml-1">{item.reactions["-1"]}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    😄 <p className="ml-1">{item.reactions.laugh}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    🎉 <p className="ml-1">{item.reactions.hooray}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    😕 <p className="ml-1">{item.reactions.confused}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    ❤️ <p className="ml-1">{item.reactions.heart}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    🚀 <p className="ml-1">{item.reactions.rocket}</p>
                  </div>
                  <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                    👀 <p className="ml-1">{item.reactions.eyes}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 p-5">
              <div className="text-white flex overflow-hidden items-center justify-between">
                <p>Assignees: </p>
                {item.assignees.length > 0 ? (
                  <div className="flex -space-x-4">
                    {item.assignees.map((assignee, key) => (
                      <Link href={assignee.html_url} key={key}>
                        <Image
                          alt={assignee.login}
                          src={assignee.avatar_url}
                          className=" rounded-full w-5 h-5 border border-white"
                          width={0}
                          height={0}
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>0</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

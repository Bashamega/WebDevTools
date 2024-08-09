import { FaGithub } from "react-icons/fa";

export function Sidebar({ author, darkmode }) {
  return (
    <aside className=" lg:w-1/4 w-full flex items-center h-full p-5">
      <div
        className={`p-4 rounded-lg ${darkmode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <h2 className="text-2xl font-semibold">About the author</h2>
        <h3 className="text-lg font-semibold">{author?.name}</h3>
        <p className=" text-ellipsis  line-clamp-6">{author?.about}</p>
        {author?.githubLink && (
          <a
            href={author?.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-full border rounded mt-2 p-2 ${
              darkmode
                ? "text-blue-300 hover:text-blue-500 border-blue-300 hover:border-blue-500"
                : "text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700"
            }`}
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        )}
      </div>
    </aside>
  );
}

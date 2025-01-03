// import { FaGithub } from "react-icons/fa";

// interface SidebarProps {
//   author: {
//     name: string;
//     about: string;
//     githubLink?: string;
//   };
//   darkmode: boolean;
// }

// export function Sidebar({ author, darkmode }: SidebarProps) {
//   return (
//     <aside className="w-full flex items-center lg:h-full p-5">
//       <div
//         className={`p-4 rounded-lg ${darkmode ? "bg-gray-700" : "bg-gray-100"}`}
//       >
//         <h2 className="text-2xl font-semibold">About the author</h2>
//         <h3 className="text-lg font-semibold">{author?.name}</h3>
//         <p className=" text-ellipsis  line-clamp-6">{author?.about}</p>
//         {author?.githubLink && (
//           <a
//             href={author?.githubLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`flex items-center justify-center w-full border rounded mt-2 p-2 ${
//               darkmode
//                 ? "text-blue-300 hover:text-blue-500 border-blue-300 hover:border-blue-500"
//                 : "text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700"
//             }`}
//           >
//             <FaGithub className="mr-2" /> GitHub
//           </a>
//         )}
//       </div>
//     </aside>
//   );
// }

import { FaGithub } from "react-icons/fa";

interface SidebarProps {
  author: {
    name?: string;
    about?: string;
    githubLink?: string;
  };
  darkmode: boolean;
}

export function Sidebar({ author, darkmode }: SidebarProps) {
  return (
    <aside className="w-full lg:w-auto flex items-center lg:h-full p-5">
      <div
        className={`p-4 rounded-lg shadow-md ${
          darkmode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-2">About the Author</h2>
        {author?.name ? (
          <>
            <h3 className="text-lg font-bold">{author.name}</h3>
            <p className="line-clamp-6 my-2">
              {author.about || "No bio available."}
            </p>
            {author.githubLink && (
              <a
                href={author.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-full border rounded mt-2 p-2 transition-all duration-200 ${
                  darkmode
                    ? "text-blue-300 hover:text-blue-500 border-blue-300 hover:border-blue-500"
                    : "text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700"
                }`}
                aria-label={`Visit ${author.name}'s GitHub profile`}
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
          </>
        ) : (
          <p className="text-sm italic">Author information not available.</p>
        )}
      </div>
    </aside>
  );
}

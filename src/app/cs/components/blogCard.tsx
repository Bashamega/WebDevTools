// import React from "react";
// import Link from "next/link";
// import { FaGithub } from "react-icons/fa";

// interface BlogCardProps {
//   data: {
//     title: string;
//     author: {
//       name: string;
//       about: string;
//       githubLink?: string;
//     };
//   };
//   darkmode: boolean;
// }

// const BlogCard: React.FC<BlogCardProps> = ({ data, darkmode }) => {
//   return (
//     <Link
//       href={`${window.location.href}/${data.title}`}
//       className={`block shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 ${
//         darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
//       }`}
//     >
//       <article>
//         <h1 className="text-2xl font-bold mb-4 line-clamp-2">{data.title}</h1>
//         <div
//           className={`p-4 rounded-lg ${darkmode ? "bg-gray-700" : "bg-gray-100"}`}
//         >
//           <h2 className="text-2xl font-semibold">About the author</h2>
//           <h3 className="text-lg font-semibold">{data?.author?.name}</h3>
//           <p className="line-clamp-3">{data?.author?.about}</p>
//           {data?.author?.githubLink && (
//             <a
//               href={data?.author?.githubLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`flex items-center justify-center w-full border rounded mt-2 p-2 ${
//                 darkmode
//                   ? "text-blue-300 hover:text-blue-500 border-blue-300 hover:border-blue-500"
//                   : "text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700"
//               }`}
//             >
//               <FaGithub className="mr-2" /> GitHub
//             </a>
//           )}
//         </div>
//       </article>
//     </Link>
//   );
// }

// export default BlogCard;

import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface BlogCardProps {
  data: {
    title: string;
    author: {
      name: string;
      about: string;
      githubLink?: string;
    };
  };
  darkmode: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ data, darkmode }) => {
  if (!data || !data.title || !data.author) {
    return null; // Avoid rendering incomplete data
  }

  return (
    <Link
      href={`/${data.title.replace(/\s+/g, "-").toLowerCase()}`}
      aria-label={`Read more about ${data.title}`}
      className={`block shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 ${
        darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <article>
        <h1 className="text-2xl font-bold mb-4 line-clamp-2">{data.title}</h1>
        <section
          className={`p-4 rounded-lg ${
            darkmode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">About the Author</h2>
          <h3 className="text-lg font-semibold">{data.author.name}</h3>
          <p className="line-clamp-3 mb-2">{data.author.about}</p>
          {data.author.githubLink && (
            <a
              href={data.author.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full border rounded mt-2 p-2 ${
                darkmode
                  ? "text-blue-300 hover:text-blue-500 border-blue-300 hover:border-blue-500"
                  : "text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700"
              }`}
            >
              <FaGithub className="mr-2" />
              GitHub
            </a>
          )}
        </section>
      </article>
    </Link>
  );
};

export default BlogCard;

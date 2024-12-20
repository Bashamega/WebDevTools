// "use client";
// import Nav from "@/components/nav";
// import { useState, useEffect } from "react";
// import Footer from "../../components/Footer";
// import apis from "@/db/api.json";
// import Card from "../../components/card";
// import NavBar from "../../components/navbar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup,
// } from "../../components/ui/select";

// //export default function Home() {

// interface ExtendedSelectProps {
//   className?: string;
// }

// const MySelect: React.FC<ExtendedSelectProps> = ({ className, ...props }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [apiList, setApiList] = useState(apis);
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedTag, setSelectedTag] = useState("all");
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(e.target.value);
//     filterApis(e.target.value, selectedTag);
//   };
//   interface Api {
//     name: string;
//     link: string;
//     ctg: string;
//   }

//   const handleTagChange = (e: string) => {
//     setSelectedTag(e);
//     filterApis(searchValue, e);
//   };
//   interface FilterApis {
//     (search: string, tag: string): void;
//   }

//   const filterApis: FilterApis = (search, tag) => {
//     if (search && tag !== "All") {
//       setApiList(
//         apis.filter(
//           (api: Api) =>
//             api.name.toLowerCase().includes(search.toLowerCase()) &&
//             api.ctg === tag,
//         ),
//       );
//     } else if (search && tag === "All") {
//       setApiList(
//         apis.filter((api: Api) =>
//           api.name.toLowerCase().includes(search.toLowerCase()),
//         ),
//       );
//     } else if (!search && tag !== "All") {
//       setApiList(apis.filter((api: Api) => api.ctg === tag));
//     } else {
//       setApiList(apis);
//     }
//   };
//   return (
//     <main
//       className={`${
//         isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
//       } min-w-80 min-h-screen `}
//     >
//       <NavBar
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//         title={"Public APIS"}
//       />
//       <div className="flex justify-center flex-col items-center w-full">
//         <div
//           className={`mr-4 p-5 my-9 mb-28 w-4/5 break-words py-6 md:p-6 rounded-lg shadow-md ${
//             isDarkMode
//               ? "bg-gray-800 text-white"
//               : "bg-white border-gray-200 text-black"
//           }`}
//         >
//           <h1 className="text-center text-3xl pb-2">Popular APIs</h1>
//           <div className="flex justify-center mb-5">
//             <input
//               type="text"
//               placeholder="search"
//               value={searchValue}
//               onChange={handleSearch}
//               className={`w-full p-2 mb-5 mr-5 border rounded-lg shadow ${
//                 isDarkMode
//                   ? "bg-gray-800 border-gray-700 text-white"
//                   : "bg-white border-gray-200 text-black"
//               }`}
//             />

//             <Select
//               value={selectedTag}
//               onValueChange={handleTagChange}
//               className="p-2 border rounded-lg shadow"
//             >
//               <SelectTrigger className="w-[280px]">
//                 <SelectValue placeholder="Filter by Tags" />
//                 {selectedTag == "all" && "All"}
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem key={"All"} value={"All"}>
//                   All
//                 </SelectItem>
//                 {Array.from(new Set(apis.map((api) => api.ctg))).map((tag) => (
//                   <SelectItem key={tag} value={tag}>
//                     {tag}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {apiList.map((item, index) => (
//               <Card
//                 key={index}
//                 title={item.name}
//                 link={item.link}
//                 isDarkMode={isDarkMode}
//               />
//             ))}
//           </div>
//           {!apiList.length && (
//             <p className="text-center">
//               No match for <strong>&quot;{searchValue}&quot;</strong>
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <Footer isDarkMode={isDarkMode} />
//       </div>
//     </main>
//   );
// }

"use client";
import Nav from "@/components/nav";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import apis from "@/db/api.json";
import Card from "../../components/card";
import NavBar from "../../components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Define the types for API and Props
interface Api {
  name: string;
  link: string;
  ctg: string;
}

interface SelectProps {
  value: string;
  onValueChange: (e: string) => void;
  className?: string; // Add className to props
  children: React.ReactNode;
}

const MySelect: React.FC<SelectProps> = ({ className, ...props }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [apiList, setApiList] = useState<Api[]>(apis);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    filterApis(e.target.value, selectedTag);
  };

  const handleTagChange = (e: string) => {
    setSelectedTag(e);
    filterApis(searchValue, e);
  };

  // Define the filterApis function type
  const filterApis = (search: string, tag: string): void => {
    if (search && tag !== "All") {
      setApiList(
        apis.filter(
          (api: Api) =>
            api.name.toLowerCase().includes(search.toLowerCase()) &&
            api.ctg === tag,
        ),
      );
    } else if (search && tag === "All") {
      setApiList(
        apis.filter((api: Api) =>
          api.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else if (!search && tag !== "All") {
      setApiList(apis.filter((api: Api) => api.ctg === tag));
    } else {
      setApiList(apis);
    }
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-w-80 min-h-screen `}
    >
      <NavBar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        title={"Public APIS"}
      />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          className={`mr-4 p-5 my-9 mb-28 w-4/5 break-words py-6 md:p-6 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <h1 className="text-center text-3xl pb-2">Popular APIs</h1>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              placeholder="search"
              value={searchValue}
              onChange={handleSearch}
              className={`w-full p-2 mb-5 mr-5 border rounded-lg shadow ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200 text-black"
              }`}
            />

            <Select
              value={selectedTag}
              onValueChange={handleTagChange}
              //className="p-2 border rounded-lg shadow"
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filter by Tags" />
                {selectedTag === "all" && "All"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"All"} value={"All"}>
                  All
                </SelectItem>
                {Array.from(new Set(apis.map((api) => api.ctg))).map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {apiList.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                link={item.link}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          {!apiList.length && (
            <p className="text-center">
              No match for <strong>&quot;{searchValue}&quot;</strong>
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </main>
  );
};

export default MySelect;

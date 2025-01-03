// "use client";

// import { useState } from "react";
// import CodeEditor from "./components/Editor";
// import NavBar  from "../../components/navbar";
// import Asciidoctor from "asciidoctor";

// const asciidoctor = Asciidoctor();

// export default function AsciiDocEditor() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [value, setValue] = useState("");
//   const [HTML, setHTML] = useState("");

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleChange = (val: string | undefined) => {
//     setValue(val || "");
//     if (val !== undefined) {
//       setHTML(asciidoctor.convert(val) as string);
//     }
//   };

//   return (
//     <div
//       className={`h-screen overflow-hidden ${
//         isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
//       }`}
//     >
//       <NavBar
//         title={"Ascii Doc Editor"}
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//       />
//       <div className="flex h-full">
//         <CodeEditor
//           theme={isDarkMode ? "vs-dark" : "vs-light"}
//           value={value}
//           onChange={handleChange}
//           className="w-1/2 h-full"
//         />
//         <div
//           dangerouslySetInnerHTML={{ __html: HTML }}
//           className="p-10 w-1/2 h-full overflow-auto"
//         ></div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import CodeEditor from "./components/Editor";
// import NavBar from "../../components/navbar";
// import Asciidoctor from "asciidoctor";

// // Initialize Asciidoctor
// const asciidoctor = Asciidoctor();

// interface AsciiDocEditorProps {
//   title: string;
// }

// const AsciiDocEditor: React.FC<AsciiDocEditorProps> = () => {
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Type the state as boolean
//   const [value, setValue] = useState<string>(""); // Type the value as string
//   const [HTML, setHTML] = useState<string>(""); // Type the HTML state as string

//   const toggleTheme = (): void => {
//     setIsDarkMode((prevMode) => !prevMode); // Toggling dark mode
//   };

//   const handleChange = (val: string | undefined): void => {
//     setValue(val || ""); // Set value with default empty string if undefined
//     if (val !== undefined) {
//       setHTML(asciidoctor.convert(val) as string); // Convert AsciiDoc content to HTML
//     }
//   };

//   return (
//     <div
//       className={`h-screen overflow-hidden ${
//         isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
//       }`}
//     >
//       <NavBar
//         title={"Ascii Doc Editor"}
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//       />
//       <div className="flex h-full">
//         <CodeEditor
//           language="asciidoc"
//           theme={isDarkMode ? "vs-dark" : "vs-light"}
//           value={value}
//           onChange={handleChange}
//           className={`w-1/2 h-full `}
//         />
//         <div
//           dangerouslySetInnerHTML={{ __html: HTML }}
//           className="p-10 w-1/2 h-full overflow-auto"
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default AsciiDocEditor;

"use client";

import { useState } from "react";
import CodeEditor from "./components/Editor";
import NavBar from "../../components/navbar";
import Asciidoctor from "asciidoctor";

// Initialize Asciidoctor
const asciidoctor = Asciidoctor();

// Define the props interface for the AsciiDoc editor
interface AsciiDocEditorProps {
  title?: string; // Optional title property
}

const AsciiDocEditor: React.FC<AsciiDocEditorProps> = ({
  title = "Ascii Doc Editor",
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [HTML, setHTML] = useState<string>("");

  const toggleTheme = (): void => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (val: string | undefined): void => {
    setValue(val || "");
    if (val !== undefined) {
      setHTML(asciidoctor.convert(val) as string);
    }
  };

  return (
    <div
      className={`h-screen overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      }`}
    >
      <NavBar title={title} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex h-full">
        <CodeEditor
          language="asciidoc"
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={value}
          onChange={handleChange}
          className="w-1/2 h-full"
        />
        <div
          dangerouslySetInnerHTML={{ __html: HTML }}
          className="p-10 w-1/2 h-full overflow-auto"
        ></div>
      </div>
    </div>
  );
};

export default AsciiDocEditor;

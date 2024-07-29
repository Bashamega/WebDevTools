"use client";

import React, { useState, useEffect } from "react";
import * as sass from "sass";
import SnippetBox from "./components/SnippetBox";
import ResultBox from "./components/ResultBox";
import Footer from "@/app/components/Footer";
// import Image from "next/image";
// import icon from "./switch_icon.png";
import { NavBar } from "@/app/components/navbar";

export default function CSS_TO_SCSS() {
  //only nav content
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  //page content

  const [snippet, setSnippet] = useState("");
  const [resultSnippet, setResultSnippet] = useState("");
  const [mode, setMode] = useState({ from: "scss", to: "css" });

  //CSStoSCSS converter function

  // const cssToScss = (css) => {

  //   function storeAndRemoveImports(cssSnippet) {
  //     //Store imports for later inyection
  //     //This is done to not mess with the regexSpliter that will accept @ as a selector
  //     const atRegex = /@import\s+url\(([^)]+)\);/gi
  //     let importsArray = []
  //     let matchAtImport
  //     while ((matchAtImport = atRegex.exec(cssSnippet)) !== null){
  //       importsArray.push(matchAtImport[0])
  //     }
  //     //After store just replace them all with empty string
  //     let removeImportsCss = cssSnippet.replace(atRegex, "")
  //     const result = {
  //       cssNoImports : removeImportsCss,
  //       storedImports: importsArray
  //     }
  //     return result
  //   }

  //   const {cssNoImports, storedImports} = storeAndRemoveImports(css)

  //   function storeAndRemoveKeyFrames(cssSnippet) {
  //     //Store Key Frames for later inyection
  //     //This is done to not mess with the regexSpliter that will accept @ as a selector
  //     const keyFramesRegex = /@keyframes\s+[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g;
  //     let storeKeyFrames = [];
  //     let match;

  //     while ((match = keyFramesRegex.exec(cssSnippet)) !== null) {
  //       storeKeyFrames.push(match[0]);
  //     }

  //     let removeKeyFramesCss = cssSnippet.replace(keyFramesRegex, "");
  //     const result = {
  //       cssNoImportsNoKeyFrames: removeKeyFramesCss,
  //       storeKeyFrames: storeKeyFrames
  //     };
  //     return result;
  //   }

  //   const {cssNoImportsNoKeyFrames, storeKeyFrames} = storeAndRemoveKeyFrames(cssNoImports)

  //   //Create nested dictionary to store all with proper "key:values"
  //   function cssToDictionary(cssSnippet) {
  //     const dict = {};
  //     //Match 2 groups, first group will be the selector and second group will be declaration block of said selector
  //     const regexSpliter = /([^{]+)\{([^}]+)\}/g;
  //     let match;

  //     while ((match = regexSpliter.exec(cssSnippet)) !== null) {
  //       //Remove extra spaces in between selectors and only leave one, that will be use to split them
  //       const selectorsArray = match[1].replace(/\s+/g,' ').trim().split(" ")

  //       //modify selector to match proper distribution of characters
  //       function specialCharacterOrder(arr) {
  //         //Reference for special characters
  //         const specialChars = ['+', '>', '~'];
  //         for (let i = 0; i < arr.length; i++) {
  //           for (const char of specialChars) {
  //             const charIndex = arr[i].indexOf(char);
  //             if (charIndex !== -1 && i < arr.length - 1) {
  //               arr[i + 1] = char + arr[i + 1];
  //               arr[i] = arr[i].replace(char, '').trim(); // Remove the special character and trim whitespace
  //               if (arr[i] === '') {
  //                 arr.splice(i, 1);
  //                 i--; // Adjust index after removal
  //               }
  //             }
  //           }
  //         }
  //         return arr;
  //       }

  //       const parts = specialCharacterOrder(selectorsArray)
  //       const declarationBlock = match[2].trim();

  //       // Split the declaration block with ";" so each item in the array its "key:value" string
  //       const declarationBlockArray = declarationBlock
  //         .split(";")
  //         .filter(Boolean) //Remove all falsy values (Empty strings mostly)
  //         .map((prop) => prop.trim());

  //       let currentDict = dict;

  //       parts.forEach((part, index) => {
  //         // Regular expression to capture selector and pseudo-class (No other way to check for selector :root)
  //         const pseudoClassRegex = /^(:root|[^:]+)(:{1,2}[a-zA-Z0-9_-]+)?$/;
  //         const match = part.match(pseudoClassRegex);
  //         if (match) {
  //           const mainSelector = match[1].trim();
  //           const pseudoClass = match[2] || '';

  //           //Conditions that will nest all the selectors
  //           if (!currentDict[mainSelector]) {
  //             currentDict[mainSelector] = {};
  //           }
  //           if (pseudoClass) {
  //             if (!currentDict[mainSelector][`&${pseudoClass}`]) {
  //               currentDict[mainSelector][`&${pseudoClass}`] = {};
  //             }
  //             currentDict = currentDict[mainSelector][`&${pseudoClass}`];
  //           } else {
  //             currentDict = currentDict[mainSelector];
  //           }

  //           // When it gets to the last selector, add the declaration block (styles) to the selector
  //           if (index === parts.length - 1) {
  //             declarationBlockArray.forEach((prop) => {
  //               const [key, value] = prop.split(":").map((item) => item.trim());
  //               currentDict[key] = value;
  //             });
  //           }
  //         }
  //       });
  //     }

  //     return dict
  //   }

  //   const cssDictionary = cssToDictionary(cssNoImportsNoKeyFrames);

  //   //This can be modified to match SCSS and SASS
  //   function dictionaryToScss(dict, indentLevel = 0) {
  //     let Scss = "";
  //     const indent = "  ".repeat(indentLevel);
  //     for (const key in dict) {
  //       if (typeof dict[key] === "object" && !Array.isArray(dict[key])) {
  //         Scss += `${indent}${key} {\n`;
  //         Scss += dictionaryToScss(dict[key], indentLevel + 1);
  //         Scss += `${indent}}\n`;
  //       } else {
  //         Scss += `${indent}${key}: ${dict[key]};\n`;
  //       }
  //     }
  //     return Scss;
  //   }

  //   const scssSnippet = dictionaryToScss(cssDictionary, 2);

  //   // Regular expression to capture variables inside :root
  //   const rootVarRegex = /:root\s*{([^}]*)}/;
  //   const varRegex = /--([a-zA-Z0-9_-]+):\s*([^;]+);/g;

  //   const rootMatch = scssSnippet.match(rootVarRegex)

  //   let finalScssSnippet

  //   //If there is nothing to change it will return the same snippet
  //   if (!rootMatch){
  //     finalScssSnippet = scssSnippet
  //   }else {
  //     const rootContent = rootMatch[1];
  //     let variables = '';
  //     let newRootContent = rootContent;

  //     // Extract variables from :root
  //     let match;
  //     while ((match = varRegex.exec(rootContent)) !== null) {
  //       const variableName = match[1];
  //       const variableValue = match[2];
  //       variables += `$${variableName}: ${variableValue};\n`;
  //       newRootContent = newRootContent.replace(match[0], '');
  //     }

  //     // Remove :root if empty, otherwise update its content
  //     let newScss = scssSnippet.replace(rootVarRegex, newRootContent.trim() ? `:root {${newRootContent}}` : '');

  //     // Add the extracted variables at the beginning
  //     newScss = variables + '\n' + newScss;

  //     //Replace var(*) to $* in classnames
  //     const cssVarRegex = /var\(--([a-zA-Z0-9\-]+)\)/g;
  //     const finishedSnippetScss = newScss.replace(
  //       cssVarRegex,
  //       (match, variableName) => {
  //         return `$${variableName}`;
  //       },
  //     );
  //     finalScssSnippet = finishedSnippetScss
  //   }

  //   //At the end add all the imports that were remove at the start
  //   let importsString = ""
  //   storedImports.forEach((atImport) => {
  //     importsString += `${atImport}\n`
  //   });
  //   //Add the string at the start
  //   finalScssSnippet = importsString + finalScssSnippet

  //   let keyFramesString = ""
  //   storeKeyFrames.forEach((keyFrame) => {
  //     keyFramesString += `${keyFrame}\n`
  //   });
  //   //Add the string at the end
  //   finalScssSnippet += keyFramesString

  //   //For good mesure trim the final result
  //   return finalScssSnippet.trim();
  // };

  //SCSStoCSS convert function
  const scssToCss = (scss) => {
    try {
      const result = sass.compileString(scss);
      return result.css;
    } catch (err) {
      console.log(err);
    }
  };

  const handleConvert = () => {
    return setResultSnippet(scssToCss(snippet));
  };

  // const handleSwitchConvertMode = () => {
  //   if (mode.from === "css") setMode({ from: "scss", to: "css" });
  //   else setMode({ from: "css", to: "scss" });

  //   setSnippet("")
  //   setResultSnippet("")
  // }

  return (
    <main
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar
        title={"scss to css converter"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex justify-center flex-col items-center w-full py-10">
        <h1 className="text-sm md:text-2xl font-bold mr-4 ml-1">
          Scss to css converter
        </h1>
        <div
          //Responsive
          className={`h-auto p-4 m-4 w-5/6 break-words border rounded-lg shadow ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} flex flex-col items-center gap-4 sm:w-100 md:flex-row `}
        >
          <SnippetBox
            from={mode.from}
            setSnippet={setSnippet}
            snippet={snippet}
            isDarkMode={isDarkMode}
          />
          {/* <Image
            src={icon}
            width={40}
            height={20}
            alt="Switch icon for changing convertion mode"
            onClick={() => handleSwitchConvertMode()}
            className={"cursor-pointer"}
          /> */}
          <ResultBox
            to={mode.to}
            resultSnippet={resultSnippet}
            isDarkMode={isDarkMode}
          />
        </div>
        <div
          className={`flex my-4 mb-20 p-1 w-4/5 justify-around items-center`}
        >
          <h2>
            From {mode.from} to {mode.to}
          </h2>
          <button
            onClick={() => handleConvert()}
            className="rounded-lg bg-blue-600 p-3 text-md font-semibold text-white w-60 text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200"
          >
            Convert
          </button>
        </div>
        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </main>
  );
}

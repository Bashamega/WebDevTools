"use client"
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
export default function Editor() {
    const [value, setValue] = useState("console.log('Hello, World!');");
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState('script.js');
    const [lang, setLang] = useState(null);
    useEffect(() => {
        const availableLanguages = [
            {
                name: "TypeScript",
                extension: "ts"
            },
            {
                name: "JavaScript",
                extension: "js"
            },
            {
                name: "CSS",
                extension: "css"
            },
            {
                name: "LESS",
                extension: "less"
            },
            {
                name: "SCSS",
                extension: "scss"
            },
            {
                name: "JSON",
                extension: "json"
            },
            {
                name: "HTML",
                extension: "html"
            },
            {
                name: "XML",
                extension: "xml"
            },
            {
                name: "PHP",
                extension: "php"
            },
            {
                name: "C#",
                extension: "cs"
            },
            {
                name: "C++",
                extension: "cpp"
            },
            {
                name: "Razor",
                extension: "cshtml"
            },
            {
                name: "Markdown",
                extension: "md"
            },
            {
                name: "Java",
                extension: "java"
            },
            {
                name: "VB",
                extension: "vb"
            },
            {
                name: "CoffeeScript",
                extension: "coffee"
            },
            {
                name: "Handlebars",
                extension: "hbs"
            },
            {
                name: "Batch",
                extension: "bat"
            },
            {
                name: "Pug",
                extension: "pug"
            },
            {
                name: "F#",
                extension: "fs"
            },
            {
                name: "Lua",
                extension: "lua"
            },
            {
                name: "Powershell",
                extension: "ps1"
            },
            {
                name: "Python",
                extension: "py"
            },
            {
                name: "Ruby",
                extension: "rb"
            },
            {
                name: "SASS",
                extension: "sass"
            },
            {
                name: "R",
                extension: "r"
            },
            {
                name: "Objective-C",
                extension: "m"
            }
        ]
        if (activeFile) {
            const fileExtension = activeFile.split(".").pop();
            availableLanguages.forEach(availableLang => {
                if (availableLang.extension === fileExtension) {
                    setLang(availableLang.name);
                    return;
                }
            })
        }
    }, [activeFile]);
    return (
        <div className="h-screen">
            {activeFile &&
                <CodeEditor language={lang} theme="vs-dark" value={value} onChange={setValue} />
            }
        </div>
    )
}


"use client"
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
import Sider from "./Sider";
export default function Editor() {
    const [value, setValue] = useState("console.log('Hello, World!');");
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [lang, setLang] = useState(null);
    const fileTypeToLanguage = (extension) => {
        const fileTypes = {
          js: 'JavaScript',
          jsx: 'JavaScript (React)',
          ts: 'TypeScript',
          tsx: 'TypeScript (React)',
          py: 'Python',
          java: 'Java',
          rb: 'Ruby',
          php: 'PHP',
          html: 'HTML',
          css: 'CSS',
          scss: 'Sass',
          less: 'Less',
          md: 'Markdown',
          json: 'JSON',
          xml: 'XML',
          yaml: 'YAML',
          yml: 'YAML',
          sh: 'Shell Script',
          cpp: 'C++',
          c: 'C',
          cs: 'C#',
          go: 'Go',
          rs: 'Rust',
          swift: 'Swift',
          kt: 'Kotlin',
          lua: 'Lua',
          r: 'R',
          perl: 'Perl',
          pl: 'Perl',
          sql: 'SQL',
          ps1: 'PowerShell',
          vb: 'Visual Basic',
          // Add more file types and their corresponding languages as needed
        };
      
        return fileTypes[extension.toLowerCase()] || 'Unknown';
      };
    useEffect(() => {
        if (activeFile) {
            const fileExtension = activeFile.name.split(".").pop();
            setLang(fileTypeToLanguage(fileExtension));
            console.log(lang)
            setValue(activeFile.content)

        }
    }, [activeFile]);
    const handleChange = (val, ev)=>{
        //console.log(val)
        setValue(val);
        files.forEach(element => {
            //console.log(element)
            if(element.name == activeFile.name){
                element.content = val
                //console.log(true)
            }
        });
    }
    return (
        <div className="h-screen flex">
            {activeFile?
                <CodeEditor language={lang} theme="vs-dark" value={value} onChange={handleChange} />
                :
                <div className=" bg-[#3c3c3c] w-[80vw] h-[90vh] flex justify-center items-center">
                    <h1 className="text-white text-2xl">No file selected</h1>
                </div>
            }
            <Sider files={files} newfile={setFiles} activateFile={setActiveFile}/>
        </div>
    )
}


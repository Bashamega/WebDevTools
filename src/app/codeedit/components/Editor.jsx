"use client"
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
import Sider from "./Sider";
export default function Editor() {
    const [value, setValue] = useState("console.log('Hello, World!');");
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [lang, setLang] = useState(null);
    useEffect(() => {
        if (activeFile) {
            const fileExtension = activeFile.name.split(".").pop();
            setLang(fileExtension);
            setValue(activeFile.content)

        }
    }, [activeFile]);
    const handleChange = (val, ev)=>{
        setValue(val);
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


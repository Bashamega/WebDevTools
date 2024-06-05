"use client"
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
import Sider from "./Sider";
import { FooterOptions } from "./FooterOptions";
export default function Editor() {
    const [value, setValue] = useState("console.log('Hello, World!');");
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState({
        name: '',
        content: '',
        lang: ''
    });
    useEffect(() => {
        if (activeFile) {
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
            {activeFile.name !=""?
                <div>
                    <CodeEditor language={activeFile.lang} theme="vs-dark" value={value} onChange={handleChange} />
                    <FooterOptions file={activeFile} setFile={setActiveFile} files={files}/>
                </div>
                :
                <div className=" bg-[#3c3c3c] w-[80vw] h-[90vh] flex justify-center items-center">
                    <h1 className="text-white text-2xl">No file selected</h1>
                </div>
            }
            <Sider files={files} newfile={setFiles} activateFile={setActiveFile}/>
        </div>
    )
}


import React from "react";
export function FooterOptions({file, setFile, files}){
    const chooseLang = ()=>{
        
    }
    return(
        <footer className="h-[5vh] w-full bg-slate-400">
            <div onClick={chooseLang} className="bg-slate-600 hover:bg-slate-700 cursor-pointer h-full w-[200px] flex items-center  justify-center">
                {file.lang?(
                    <p>{file.lang}</p>
                ):(
                    <p>Choose a language</p>
                )}
            </div>
        </footer>
    )
}
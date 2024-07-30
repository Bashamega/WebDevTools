import { NoteAdd } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Sider({ files, newfile, activateFile }) {
  const [newFile, setNewFile] = useState(false);
  const [fileName, setFile] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let fileExists = false;
    files.forEach((element) => {
      if (element.name === fileName) {
        fileExists = true;
        return;
      }
    });
    if (fileExists) {
      Swal.fire("Error", "File name exists", "error");
      return;
    }
    setNewFile(false);
    files.push({
      name: fileName,
      content: "",
      lang: "",
    });
    setFile("");
  };
  return (
    <div className="w-[20vw] h-[90vh] bg-slate-800 shadow-2xl">
      <nav className="h-[10vh] bg-slate-900 shadow-2xl">
        <div className="h-full w-full flex justify-center items-center flex-col">
          <h1 className="text-white text-2xl">Code Editor</h1>
          <div className="flex justify-center items-center bg-black h-full w-full text-slate-400">
            <NoteAdd
              className="cursor-pointer hover:text-slate-100"
              onClick={() => setNewFile(true)}
            />
          </div>
        </div>
      </nav>
      <section className="p-1 h-[90vh]">
        {newFile ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFile(e.target.value)}
              placeholder="File Name"
              required
              minLength={1}
              className="w-full h-full bg-slate-900 p-2 rounded-lg text-white "
            />
          </form>
        ) : null}
        <div className="mt-2 gap-3 grid grid-cols-1">
          {files.length > 0 ? (
            files.map((file, index) => (
              <button
                key={index}
                className="flex justify-center items-center bg-slate-900 p-2 rounded-lg text-white"
                onClick={() => activateFile(file)}
              >
                {file.name}
              </button>
            ))
          ) : (
            <div className="flex justify-center items-center h-1/2 p-2 rounded-lg text-white">
              <p>No Files</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

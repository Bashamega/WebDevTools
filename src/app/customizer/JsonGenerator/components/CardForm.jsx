import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Reorder, useDragControls } from "framer-motion";
import { GrAdd } from "react-icons/gr";
import { saveAs } from "file-saver";
import Item from "./Item";
import Categories from "../utils";

export default function CardForm({ isDarkMode }) {
  const [fields, setFields] = useState([
    { id: uuidv4(), fieldName: "id", fieldType: "" },
    { id: uuidv4(), fieldName: "first_name", fieldType: "" },
    { id: uuidv4(), fieldName: "last_name", fieldType: "" },
    { id: uuidv4(), fieldName: "email", fieldType: "" },
    { id: uuidv4(), fieldName: "gender", fieldType: "" },
  ]);
  const [numRows, setNumRows] = useState(5);
  const [previewClicked, setPreviewClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const MappedSchema = categoryData.getCurrentSchema(fields);
    function jsonPopulate() {
      console.log(MappedSchema);
      const data = Array.from({ length: numRows }, () => {
        const newData = {};
        for (const [key, value] of Object.entries(MappedSchema)) {
          if (typeof value !== "undefined" && typeof value === "function") {
            newData[key] = value();
          }
        }
        return newData;
      });
      setResponseData(data.filter((item) => Object.keys(item).length !== 0));
    }
    if (
      previewClicked &&
      !submitClicked &&
      !categoryData.isDataCached(numRows, responseData, MappedSchema)
    ) {
      jsonPopulate();
      setShowPreview(true);
    }
    if (submitClicked && !previewClicked) {
      jsonPopulate();

      if (Object.keys(MappedSchema).length > 0) {
        const blob = new Blob(
          [
            JSON.stringify(
              responseData,
              (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
              2,
            ),
          ],
          { type: "application/json" },
        );
        saveAs(blob, "WebDevTools.json");
      }
    }
    setIsLoading(false);
    setPreviewClicked(false);
    setSubmitClicked(false);
  }, [previewClicked, submitClicked]);

  const addField = () => {
    setFields([...fields, { id: uuidv4(), fieldName: "", fieldType: "" }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleChange = (id, event) => {
    const newFields = fields.map((field) => {
      if (id === field.id) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  const controls = useDragControls();
  const categoryData = new Categories();

  return (
    <Reorder.Group
      className={`mt-10 ${isDarkMode ? "dark" : ""}`}
      axis="y"
      values={fields}
      onReorder={setFields}
    >
      <div className="flex justify-around">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-5 font-sans text-2xl font-bold text-gray-500 ml-9">
            <h1 className="w-full">Field Name</h1>
            <h1 className="w-full">Field Type</h1>
          </div>
          {fields.map((field) => (
            <Reorder.Item
              key={field.id}
              value={field}
              className="flex items-center bg-black-200 w-fit"
            >
              <Item
                field={field}
                handleChange={handleChange}
                removeField={removeField}
                controls={controls}
                categoryData={categoryData}
                isDarkMode={isDarkMode}
              />
            </Reorder.Item>
          ))}
          <button
            onClick={addField}
            className="flex p-1 pl-3 pr-3 mt-2 text-zinc-300 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800"
          >
            <span className="pt-1 pr-2 text-zinc-300">
              <GrAdd />
            </span>{" "}
            ADD ANOTHER FIELD
          </button>
          <div className="fixed bottom-5 bg-white left-1/2 -translate-x-1/2 px-40 rounded flex gap-2 justify-center items-center py-2 dark:bg-gray-800">
            <button
              onClick={() => {
                setIsLoading(true);
                setPreviewClicked(true);
              }}
              className="flex p-1 pl-3 pr-3 bg-black border border-gray-700 rounded-md ml-0 w-fit hover:bg-gray-800  hover:text-white dark:text-gray-400"
            >
              <span className="p-1 text-zinc-300">Preview</span>
            </button>
            <button
              onClick={() => {
                setIsLoading(true);
                setSubmitClicked(true);
              }}
              className="flex p-1 pl-3 pr-3 bg-black border border-gray-700 rounded-md ml-2 w-fit hover:bg-gray-800 hover:text-white dark:text-gray-400"
            >
              <span className="p-1 text-zinc-300">Export</span>
            </button>
          </div>
          <div>
            <span className="border-b"># rows</span>
            <input
              type="text"
              className="w-40 p-2 mt-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 text-zinc-300 focus:bg-gray-800 ml-7"
              placeholder="# Rows"
              value={numRows}
              label="Number of Rows"
              onChange={(e) => setNumRows(e.target.value)}
            />
          </div>
        </div>
        <div className="absolute top-1/2 shadow-lg rounded-md -translate-y-1/2 z-10 flex flex-col flex-shrink-0 h-[50vh] dark:bg-gray-800">
          {responseData.length > 0 && showPreview && (
            <div className="flex flex-col max-h-[50vh] max-w-[40vw] min-w-[45vw] overflow-auto mr-2 p-2 ">
              <div className="relative flex justify-center pt-2 mb-1 font-sans text-2xl font-bold text-center bg-gray-500 text-white">
                <span>Preview</span>
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-400"
                  onClick={() => {
                    setShowPreview(false);
                  }}
                >
                  x
                </span>
              </div>
              <div className="flex max-w-full pr-2 ">
                {isLoading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress disableShrink size={50} />
                    </Box>
                  </div>
                ) : (
                  <pre className="p-3 overflow-auto break-words whitespace-pre-wrap">
                    {JSON.stringify(
                      responseData,
                      (_, value) =>
                        typeof value === "bigint" ? value.toString() : value,
                      2,
                    )}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reorder.Group>
  );
}

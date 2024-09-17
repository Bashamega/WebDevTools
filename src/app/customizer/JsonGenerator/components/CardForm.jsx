import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Reorder, useDragControls } from "framer-motion";
import { saveAs } from "file-saver";
import Categories from "../utils";
import { FieldsSection } from "./FieldsSection";
import { ActionButtons } from "./ActionButtons";
import { PreviewSection } from "./PreviewSection";
import { initialFields } from "./Init";

export default function CardForm({ isDarkMode }) {
  const [fields, setFields] = useState(initialFields());
  const [numRows, setNumRows] = useState(5);
  const [previewClicked, setPreviewClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const controls = useDragControls();
  const categoryData = new Categories();

  useEffect(() => {
    const MappedSchema = categoryData.getCurrentSchema(fields);

    if (previewClicked || submitClicked) {
      if (!categoryData.isDataCached(numRows, responseData, MappedSchema)) {
        const newData = generateJsonData(MappedSchema, numRows);
        setResponseData(newData);
      }

      if (previewClicked) setShowPreview(true);
      if (submitClicked) exportJsonData(responseData);

      resetClicks();
    }
  }, [previewClicked, submitClicked]);

  const generateJsonData = (schema, rows) => {
    return Array.from({ length: rows }, () => {
      const entry = {};
      Object.entries(schema).forEach(([key, value]) => {
        if (typeof value === "function") entry[key] = value();
      });
      return entry;
    }).filter((item) => Object.keys(item).length > 0);
  };

  const exportJsonData = (data) => {
    const blob = new Blob(
      [
        JSON.stringify(
          data,
          (_, value) => (typeof value === "bigint" ? value.toString() : value),
          2,
        ),
      ],
      { type: "application/json" },
    );
    saveAs(blob, "WebDevTools.json");
  };

  const resetClicks = () => {
    setIsLoading(false);
    setPreviewClicked(false);
    setSubmitClicked(false);
  };

  const addField = () => {
    setFields([...fields, { id: uuidv4(), fieldName: "", fieldType: "" }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, event) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? { ...field, [event.target.name]: event.target.value }
          : field,
      ),
    );
  };

  return (
    <Reorder.Group
      className={`mt-10 ${isDarkMode ? "dark" : ""}`}
      axis="y"
      values={fields}
      onReorder={setFields}
    >
      <div className="flex justify-around">
        <FieldsSection
          fields={fields}
          handleFieldChange={handleFieldChange}
          removeField={removeField}
          addField={addField}
          controls={controls}
          isDarkMode={isDarkMode}
          categoryData={categoryData}
        />
        <ActionButtons
          setIsLoading={setIsLoading}
          setPreviewClicked={setPreviewClicked}
          setSubmitClicked={setSubmitClicked}
          numRows={numRows}
          setNumRows={setNumRows}
        />
        <PreviewSection
          responseData={responseData}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </div>
    </Reorder.Group>
  );
}

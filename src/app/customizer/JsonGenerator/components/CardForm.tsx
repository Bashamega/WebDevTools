"use client";
import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Reorder, useDragControls } from "framer-motion";
import { saveAs } from "file-saver";
import Categories from "../utils";
import { FieldsSection } from "./FieldsSection";
import { ActionButtons } from "./ActionButtons";
import { PreviewSection } from "./PreviewSection";
import { initialFields } from "./Init";

interface Field {
  id: string;
  fieldName: string;
  fieldType: string;
}

interface CardFormProps {
  isDarkMode: boolean;
}

export const exportJsonData = (data: object) => {
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

export default function CardForm({ isDarkMode }: CardFormProps) {
  const [fields, setFields] = useState<Field[]>(initialFields());
  const [numRows, setNumRows] = useState<number>(5);
  const [previewClicked, setPreviewClicked] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<object[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const controls = useDragControls();
  //const categoryData = new Categories();
  const categoryData = useMemo(() => new Categories(), []);

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
  }, [
    previewClicked,
    submitClicked,
    categoryData,
    fields,
    numRows,
    responseData,
  ]);

  const generateJsonData = (schema: any, rows: number): object[] => {
    return Array.from({ length: rows }, () => {
      const entry: Record<string, any> = {};
      Object.entries(schema).forEach(([key, value]) => {
        if (typeof value === "function") entry[key] = value();
      });
      return entry;
    }).filter((item) => Object.keys(item).length > 0);
  };

  const resetClicks = () => {
    setIsLoading(false);
    setPreviewClicked(false);
    setSubmitClicked(false);
  };

  const addField = () => {
    setFields([...fields, { id: uuidv4(), fieldName: "", fieldType: "" }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (
    id: string,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
      className={`mt-5 ${isDarkMode ? "dark" : ""}`}
      axis="y"
      values={fields}
      onReorder={setFields}
    >
      <div className="flex justify-around">
        <FieldsSection
          fields={fields}
          handleFieldChange={handleFieldChange}
          handleChange={handleFieldChange}
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

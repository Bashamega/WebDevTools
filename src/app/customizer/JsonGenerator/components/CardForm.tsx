// import { useState, useEffect, useMemo } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { Reorder, useDragControls } from "framer-motion";
// import { saveAs } from "file-saver";
// import Categories from "../utils";
// import { FieldsSection } from "./FieldsSection";
// import { ActionButtons } from "./ActionButtons";
// import { PreviewSection } from "./PreviewSection";
// import { initialFields } from "./Init";
// import { C } from "@faker-js/faker/dist/airline-BnpeTvY9";

// interface Field {
//   id: string;
//   fieldName: string;
//   fieldType: string;
// }

// interface Schema {
//   [key: string]: () => any;
// }

// interface CardFormProps {
//   isDarkMode: boolean;
// }

// export const exportJsonData = (data: any[]): void => {
//   const blob = new Blob(
//     [
//       JSON.stringify(
//         data,
//         (_, value) => (typeof value === "bigint" ? value.toString() : value),
//         2,
//       ),
//     ],
//     { type: "application/json" },
//   );
//   saveAs(blob, "WebDevTools.json");
// };

// export default function CardForm({ isDarkMode }: CardFormProps) {
//   const [fields, setFields] = useState<Field[]>(initialFields());
//   const [numRows, setNumRows] = useState<number>(5);
//   const [previewClicked, setPreviewClicked] = useState<boolean>(false);
//   const [submitClicked, setSubmitClicked] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [responseData, setResponseData] = useState<any[]>([]);
//   const [showPreview, setShowPreview] = useState<boolean>(false);

//   const controls = useDragControls();
//   //const categoryData = new Categories();
//   //const categoryData = new Categories();
//   const categoryData = useMemo(() => new Categories(), []);

//   useEffect(() => {
//     const MappedSchema: Schema = categoryData.getCurrentSchema(fields);

//     if (previewClicked || submitClicked) {
//       if (!categoryData.isDataCached(numRows, responseData, MappedSchema)) {
//         const newData = generateJsonData(MappedSchema, numRows);
//         setResponseData(newData);
//       }

//       if (previewClicked) setShowPreview(true);
//       if (submitClicked) exportJsonData(responseData);

//       resetClicks();
//     }
//   }, [
//     previewClicked,
//     submitClicked,
//     categoryData,
//     fields,
//     numRows,
//     responseData,
//   ]);

//   const generateJsonData = (schema: Schema, rows: number): any[] => {
//     return Array.from({ length: rows }, () => {
//       const entry: { [key: string]: any } = {};
//       Object.entries(schema).forEach(([key, value]) => {
//         if (typeof value === "function") entry[key] = value();
//       });
//       return entry;
//     }).filter((item) => Object.keys(item).length > 0);
//   };

//   const resetClicks = (): void => {
//     setIsLoading(false);
//     setPreviewClicked(false);
//     setSubmitClicked(false);
//   };

//   // const addField = (): void => {
//   //   setFields([...fields, { id: uuidv4(), fieldName: "", fieldType: "" }]);
//   // };

//   const addField = (): void => {
//     const newField = {
//       id: uuidv4(),
//       fieldName: `field_${fields.length + 1}`,  // Set a default field name
//       fieldType: "string"  // Set a default field type
//     };
//     setFields((prevFields) => [...prevFields, newField]);
//   };

//   const removeField = (id: string): void => {
//     setFields(fields.filter((field) => field.id !== id));
//   };

//   const handleFieldChange = (
//     id: string,
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ): void => {
//     setFields(
//       fields.map((field) =>
//         field.id === id
//           ? { ...field, [event.target.name]: event.target.value }
//           : field,
//       ),
//     );
//   };

//   return (
//     <Reorder.Group
//       className={`mt-5 ${isDarkMode ? "dark" : ""}`}
//       axis="y"
//       values={fields}
//       onReorder={setFields}
//     >
//       <div className="flex justify-around">
//         <FieldsSection
//           fields={fields}
//           handleFieldChange={handleFieldChange}
//           removeField={removeField}
//           handleChange={handleFieldChange}
//           addField={addField}
//           controls={controls}
//           isDarkMode={isDarkMode}
//           categoryData={categoryData}
//         />
//         <ActionButtons
//           setIsLoading={setIsLoading}
//           setPreviewClicked={setPreviewClicked}
//           setSubmitClicked={setSubmitClicked}
//           numRows={numRows}
//           setNumRows={setNumRows}
//         />
//         <PreviewSection
//           responseData={responseData}
//           showPreview={showPreview}
//           setShowPreview={setShowPreview}
//           isLoading={isLoading}
//           isDarkMode={isDarkMode}
//         />
//       </div>
//     </Reorder.Group>
//   );

// import { useState, useEffect, useMemo } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { Reorder, useDragControls } from "framer-motion";
// import { saveAs } from "file-saver";
// import Categories from "../utils";
// import { FieldsSection } from "./FieldsSection";
// import { ActionButtons } from "./ActionButtons";
// import { PreviewSection } from "./PreviewSection";
// import { initialFields } from "./Init";

// interface Field {
//   id: string;
//   fieldName: string;
//   fieldType: string;
// }

// interface Schema {
//   [key: string]: () => any;
// }

// interface CardFormProps {
//   isDarkMode: boolean;
// }

// // Function to export JSON data
// export const exportJsonData = (data: any[]): void => {
//   const blob = new Blob(
//     [
//       JSON.stringify(
//         data,
//         (_, value) => (typeof value === "bigint" ? value.toString() : value),
//         2
//       ),
//     ],
//     { type: "application/json" }
//   );
//   saveAs(blob, "WebDevTools.json");
// };

// export default function CardForm({ isDarkMode }: CardFormProps) {
//   const [fields, setFields] = useState<Field[]>(initialFields());
//   const [numRows, setNumRows] = useState<number>(5);
//   const [previewClicked, setPreviewClicked] = useState<boolean>(false);
//   const [submitClicked, setSubmitClicked] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [responseData, setResponseData] = useState<any[]>([]);
//   const [showPreview, setShowPreview] = useState<boolean>(false);

//   const controls = useDragControls();
//   const categoryData = useMemo(() => new Categories(), []);

//   // Handle preview and submit logic
//   useEffect(() => {
//     if (!previewClicked && !submitClicked) return;

//     const MappedSchema: Schema = categoryData.getCurrentSchema(fields);

//     // Generate data if not cached
//     if (!categoryData.isDataCached(numRows, responseData, MappedSchema)) {
//       const newData = generateJsonData(MappedSchema, numRows);
//       setResponseData(newData);
//     }

//     // Handle preview or submit action
//     if (previewClicked) setShowPreview(true);
//     if (submitClicked) exportJsonData(responseData);

//     resetClicks();
//   }, [previewClicked, submitClicked, fields, numRows, responseData, categoryData]);

//   // Generate JSON data
//   const generateJsonData = (schema: Schema, rows: number): any[] => {
//     return Array.from({ length: rows }, () => {
//       const entry: { [key: string]: any } = {};
//       Object.entries(schema).forEach(([key, value]) => {
//         if (typeof value === "function") entry[key] = value();
//       });
//       return entry;
//     }).filter((item) => Object.keys(item).length > 0);
//   };

//   // Reset click flags
//   const resetClicks = (): void => {
//     setIsLoading(false);
//     setPreviewClicked(false);
//     setSubmitClicked(false);
//   };

//   // Add a new field
//   const addField = (): void => {
//     const newField = {
//       id: uuidv4(),
//       fieldName: `field_${fields.length + 1}`,
//       fieldType: "string",
//     };
//     setFields((prevFields) => [...prevFields, newField]);
//   };

//   // Remove a field
//   const removeField = (id: string): void => {
//     setFields((prevFields) => prevFields.filter((field) => field.id !== id));
//   };

//   // Handle field updates
//   const handleChange = (
//     id: string,
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ): void => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id
//           ? { ...field, [event.target.name]: event.target.value }
//           : field
//       )
//     );
//   };

//   // Optional: Handle generic input changes
//   // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//   //   console.log(event.target.name, event.target.value);
//   // };

//   return (
//     <Reorder.Group
//       className={`mt-5 ${isDarkMode ? "dark" : ""}`}
//       axis="y"
//       values={fields}
//       onReorder={setFields}
//     >
//       <div className="flex justify-around">
//         <FieldsSection
//           fields={fields}
//           handleFieldChange={handleChange}
//           handleChange={handleChange}
//           removeField={removeField}
//           addField={addField}
//           controls={controls}
//           isDarkMode={isDarkMode}
//           categoryData={categoryData}
//         />
//         <ActionButtons
//           setIsLoading={setIsLoading}
//           setPreviewClicked={setPreviewClicked}
//           setSubmitClicked={setSubmitClicked}
//           numRows={numRows}
//           setNumRows={setNumRows}
//         />
//         <PreviewSection
//           responseData={responseData}
//           showPreview={showPreview}
//           setShowPreview={setShowPreview}
//           isLoading={isLoading}
//           isDarkMode={isDarkMode}
//         />
//       </div>
//     </Reorder.Group>
//   );
// }

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Reorder, useDragControls } from "framer-motion";
import { saveAs } from "file-saver";
import Categories from "../utils";
import { FieldsSection } from "./FieldsSection";
import { ActionButtons } from "./ActionButtons";
import { PreviewSection } from "./PreviewSection";
import { initialFields } from "./Init";

type Field = {
  id: string;
  fieldName: string;
  fieldType: string;
};

type CardFormProps = {
  isDarkMode: boolean;
};

export const exportJsonData = (data: any) => {
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
  const [responseData, setResponseData] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

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

  const generateJsonData = (schema: Record<string, any>, rows: number) => {
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

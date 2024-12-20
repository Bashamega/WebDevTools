// import { FieldHeader } from "./FieldHeader";
// import { Reorder } from "framer-motion";
// import Item from "./Item";
// import { AddFieldButton } from "./AddFieldButton";
// interface Field {
//   id: string;
//   // Add other field properties here
// }

// interface FieldsSectionProps {
//   fields: Field[];
//   handleFieldChange: (field: Field) => void;
//   removeField: (id: string) => void;
//   addField: () => void;
//   controls: any; // Replace 'any' with the appropriate type
//   // isDarkMode: boolean;
//   categoryData: any; // Replace 'any' with the appropriate type
//   isDarkMode: boolean;
// }

// export const FieldsSection: React.FC<FieldsSectionProps> = ({
//   fields,
//   handleFieldChange,
//   removeField,
//   addField,
//   controls,
//   isDarkMode,
//   categoryData,
// }) => (
//   <div className="flex flex-col">
//     {!!fields.length && <FieldHeader />}
//     <div className="h-40 overflow-auto">
//       {fields.map((field) => (
//         <Reorder.Item
//           key={field.id}
//           value={field}
//           className="flex items-center bg-black-200 w-fit"
//         >
//           <Item
//             field={field}
//             handleChange={handleFieldChange}
//             removeField={removeField}
//             controls={controls}
//             categoryData={categoryData}
//             isDarkMode={isDarkMode}
//           />
//         </Reorder.Item>
//       ))}
//     </div>
//     <AddFieldButton onClick={addField} />
//   </div>
// );

import { FieldHeader } from "./FieldHeader";
import { Reorder } from "framer-motion";
import Item from "./Item";
import { AddFieldButton } from "./AddFieldButton";

// Define the Field interface
interface Field {
  id: string;
  fieldName: string;
  fieldType: string;
}

// Define a specific type for 'controls' and 'categoryData' if possible
interface Controls {
  // Add the actual controls properties here
  [key: string]: any; // Temporary placeholder
}

interface CategoryData {
  getECategoriesArr: () => string[];
  getOptionNameArr: () => string[];
  [key: string]: any; // Temporary placeholder
}

// Props for the FieldsSection component
interface FieldsSectionProps {
  // fields: Field[];
  // handleFieldChange: (field: Field) => void;
  // removeField: (id: string) => void;
  // addField: () => void;
  // controls: Controls; // Replace placeholder when types are known
  // categoryData: CategoryData; // Replace placeholder when types are known
  // isDarkMode: boolean;
  fields: Field[];
  handleFieldChange: (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleChange: (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  addField: () => void;
  removeField: (id: string) => void;
  controls: { start: (event: React.PointerEvent<HTMLDivElement>) => void };
  categoryData: CategoryData;
  isDarkMode: boolean;
}

export const FieldsSection: React.FC<FieldsSectionProps> = ({
  fields,
  handleFieldChange,
  handleChange,
  removeField,
  addField,
  controls,
  isDarkMode,
  categoryData,
}) => {
  return (
    <div className="flex flex-col">
      {/* Display the header if fields exist */}
      {fields.length > 0 && <FieldHeader />}

      {/* Fields list with reordering */}
      <div className="h-40 overflow-auto">
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
      </div>

      {/* Add Field Button */}
      <AddFieldButton onClick={addField} />
    </div>
  );
};

import { FieldHeader } from "./FieldHeader";
import { Reorder } from "framer-motion";
import Item from "./Item";
import { AddFieldButton } from "./AddFieldButton";
export const FieldsSection = ({
  fields,
  handleFieldChange,
  removeField,
  addField,
  controls,
  isDarkMode,
  categoryData,
}) => (
  <div className="flex flex-col">
    <FieldHeader />
    {fields.map((field) => (
      <Reorder.Item
        key={field.id}
        value={field}
        className="flex items-center bg-black-200 w-fit"
      >
        <Item
          field={field}
          handleChange={handleFieldChange}
          removeField={removeField}
          controls={controls}
          categoryData={categoryData}
          isDarkMode={isDarkMode}
        />
      </Reorder.Item>
    ))}
    <AddFieldButton onClick={addField} />
  </div>
);

import { v4 as uuidv4 } from "uuid";
export const initialFields = () => [
  { id: uuidv4(), fieldName: "id", fieldType: "" },
  { id: uuidv4(), fieldName: "first_name", fieldType: "" },
  { id: uuidv4(), fieldName: "last_name", fieldType: "" },
];

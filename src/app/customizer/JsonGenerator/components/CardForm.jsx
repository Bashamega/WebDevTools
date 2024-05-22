import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import { Reorder, useDragControls} from 'framer-motion';
import { GrAdd } from "react-icons/gr";
import Item from './Item'
export default function CardForm() {
    const [fields, setFields] = useState([
        { id: uuidv4(), fieldName: "id", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "first_name", fieldType: "sometype"},
        { id: uuidv4(), fieldName: "last_name", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "email", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "gender", fieldType: "sometype" },
    ]);

    const addField = () => {
        setFields([...fields, { id: uuidv4(), fieldName: "", fieldType: "" }]);
    };
    
    const removeField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const handleChange = (id, event) => {
        const newFields = fields.map((field) => {
            if (id === field.id) {
                field[event.target.name] = event.target.value;
            }
            return field;
        });
        setFields(newFields);
    };
    const controls = useDragControls();


    return (
        <Reorder.Group className='mt-40 ml-4' axis='y' values={fields} onReorder={setFields}>
            <div className='flex items-center justify-between w-[50vw] mb-5 text-2xl text-gray-500 font-sans font-bold'>
            <h1 className='w-full pl-14'>Field Name</h1>
            <h1 className='w-full'>Field Type</h1> 
            </div>
            {fields.map((field) => (
                <Reorder.Item 
                    key={field.id} 
                    value={field} 
                    dragControls={controls} 
                    dragListener={true} 
                    className='flex items-center bg-black-200 w-fit' 
                    >
                    <Item 
                        field={field} 
                        handleChange={handleChange} 
                        removeField={removeField} 
                        controls={controls} 
                    />

                </Reorder.Item>
            ))}
            <button onClick={addField} className='flex p-1 pl-3 pr-3 mt-2 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800'><span className='pt-1 pr-2'><GrAdd/></span> ADD ANOTHER FIELD</button>
        </Reorder.Group>
    );
}
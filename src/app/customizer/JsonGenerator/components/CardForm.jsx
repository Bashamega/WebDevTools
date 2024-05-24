import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { Reorder, useDragControls} from 'framer-motion';
import { GrAdd } from "react-icons/gr";
import Item from './Item'
import Categories from '../utils';



export default function CardForm() {

    const [fields, setFields] = useState([
        { id: uuidv4(), fieldName: "id", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "first_name", fieldType: "sometype"},
        { id: uuidv4(), fieldName: "last_name", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "email", fieldType: "sometype" },
        { id: uuidv4(), fieldName: "gender", fieldType: "sometype" },
    ]);
    const [numRows, setNumRows] = useState(5);
    const [previewClicked, setPreviewClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
 
    useEffect(() => {
        if (previewClicked && categoryData) {
            const MappedSchema = categoryData.getCurrentSchema(fields);
            (async () => {
                const data = await Promise.all(Array.from({ length: numRows }, async () => {
                    const newData = {};
                    for (const [key, value] of Object.entries(MappedSchema)) {
                        newData[key] = await value();
                    }
                    return newData;
                }));
                console.log(data);
                setIsLoading(false);
            })();
        }
        setPreviewClicked(false);
    }, [previewClicked]);

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
                        categoryData={categoryData}
                    />

                </Reorder.Item>
            ))}
            <button onClick={addField} className='flex p-1 pl-3 pr-3 mt-2 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800'><span className='pt-1 pr-2'><GrAdd/></span> ADD ANOTHER FIELD</button>
            <button onClick={() => setPreviewClicked(true) && setIsLoading(true)} className='flex p-1 pl-3 pr-3 mt-2 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800'><span className='p-1'>Preview</span></button>
            <input 
            type='text' className='p-2 mt-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 focus:bg-gray-800' 
            placeholder='# Rows'
            value={numRows}
            onChange={(e) => setNumRows(e.target.value)}
            
            />
        </Reorder.Group>
    );
}
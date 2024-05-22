import { RxDragHandleDots2 } from 'react-icons/rx';
import { CiCircleRemove } from 'react-icons/ci';
import { Autocomplete, TextField } from '@mui/material';
import Categories from '../utils';

const Item = ({ field, handleChange, removeField, controls }) => {
    const categoryData = new Categories();
    return (
        <div 
            key={field.id} 
            value={field} 
            dragControls={controls} 
            dragListener={true} 
            className='flex items-center bg-black-200 w-fit' 
        >
            <div 
                className='p-1 mb-2 rounded-md cursor-pointer reorder-handle hover:bg-gray-800' 
                onPointerDown={(e) => controls.start(e)}
            >
                <RxDragHandleDots2 size={25} color='gray'/>
            </div>
            <div>
                <input
                    type="text"
                    name="fieldName"
                    value={field.fieldName}
                    onChange={(e) => handleChange(field.id, e)}
                    onFocus={e => e.target.select()}
                    onBlur={e => e.target.setSelectionRange(0, 0)}
                    autoComplete='off'
                    className='p-2 mb-2 mr-2 text-gray-500 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 focus:bg-gray-800'
                />
                <select 
                    name="fieldType" 
                    value={field.fieldType} 
                    onChange={(e) => handleChange(field.id, e)} 
                    className='p-2 mr-3 text-gray-500 bg-black border border-gray-700 rounded-md'
                >
                    <option value="defualt">Select field type</option>
                    {categoryData.getECategoriesArr().map((category, index) => (
                        <optgroup key={index} label={category}>
                            {categoryData.getOptionNameArr(category).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                <button onClick={() => removeField(field.id)} className='text-gray-500 hover:text-red-400'>
                    <CiCircleRemove  size={20} className='transition-colors duration-300 ' />
                </button>
            </div>
        </div>
    );
}

export default Item;
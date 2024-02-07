import React, { useState, useCallback } from 'react';
import { Input } from 'components/shadcn/input';
interface IProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const ListInput = ({ items, setItems }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setItems((prevItems) => [...prevItems, inputValue.trim()]);
      setInputValue(''); // Reset input field after adding
    }
  };

  const handleRemove = useCallback(
    (index: number) => {
      setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    },
    [setItems],
  );

  return (
    <div>
      <div className='relative'>
        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
          Skills
        </label>

        <Input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder='Input a skill and press enter to save'
          className='w-full w-full rounded-md  border-gray-300 p-2 py-4 pl-3 text-secondary-3 placeholder:text-xs placeholder:text-secondary-1'
        />
      </div>

      <div className='my-4 flex flex-wrap gap-2'>
        {items.map((item, index) => (
          <div key={index}>
            <button
              type='button'
              onClick={() => handleRemove(index)}
              className=' group flex items-center justify-center gap-2 rounded-lg border px-4 py-1  text-[0.5rem] leading-[24px] tracking-[0.4px] text-gray-600 transition-all duration-300 ease-in-out hover:opacity-90 md:text-[0.75rem]'
            >
              <span>{item} </span>
              <span>|</span>
              <span>X</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInput;

import React, { useState, useCallback } from 'react';
import { Input } from 'components/shadcn/input';
import Icon from 'utils/Icon';
interface IProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}
const ListInput = ({ items, setItems }: IProps) => {
  const [inputValue, setInputValue] = useState({ name: '', quantity: '' });

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' && inputValue.trim() !== '') {
  //     setItems((prevItems) => [...prevItems, inputValue.trim()]);
  //     setInputValue('');
  //   }
  // };

  const handleRemove = useCallback(
    (index: number) => {
      setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    },
    [setItems],
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className='relative  my-8 flex flex-col gap-4'>
        <label className=' rounded-full bg-white px-1 text-base font-bold text-secondary-1'>
          List of Materials
        </label>

        <div className='flex gap-4'>
          <Input
            type='text'
            name='name'
            value={inputValue.name}
            onChange={handleInputChange}
            // onKeyDown={handleKeyPress}
            placeholder='Enter Material Name'
            className='border-0 bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
          />
          <Input
            type='text'
            name='quantity'
            value={inputValue.quantity}
            onChange={handleInputChange}
            // onKeyDown={handleKeyPress}
            placeholder='Enter Quantity'
            className='border-0 bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
          />

          <button
            type='button'
            onClick={() => {
              if (inputValue.name.trim() === '' || inputValue.quantity.trim() === '') return;
              setItems((prevItems) => [...prevItems, inputValue]);
              setInputValue({ name: '', quantity: '' });
            }}
            className='group flex items-center justify-center gap-2 rounded-lg border bg-gray-200 px-4 py-1  text-[0.8rem] font-semibold leading-[24px] tracking-[0.4px] text-gray-600 transition-all duration-300 ease-in-out hover:opacity-90 md:text-[0.9rem]'
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <div className='my-4 grid grid-cols-3 gap-6'>
        {items.map((item, index) => (
          <div key={index}>
            <button
              type='button'
              onClick={() => handleRemove(index)}
              className=' file: group flex w-full items-center justify-center gap-2 rounded-lg border bg-gray-200 px-4 py-1  text-[0.8rem] font-semibold leading-[24px] tracking-[0.4px] text-gray-600 transition-all duration-300 ease-in-out hover:opacity-90 md:text-[0.9rem]'
            >
              <div className='flex w-full justify-between '>
                <span>{item.name} </span>

                <span>{item.quantity}</span>
              </div>

              <span>
                <Icon name='trash' />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className='relative  my-8 flex flex-col gap-4'>
        <label className=' rounded-full bg-white px-1 text-base font-bold text-secondary-1'>
          List of Materials
        </label>

        <Input
          type='text'
          value={inputValue.name}
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
          placeholder='Input a material and press enter to save'
          className='border-0 bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
        />
        <Input
          type='text'
          value={inputValue.quantity}
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
          placeholder='Input a material and press enter to save'
          className='border-0 bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
        />
      </div>
      <div className='my-4 grid grid-cols-2 gap-2'>
        {items.map((item, index) => (
          <div key={index}>
            <button
              type='button'
              onClick={() => handleRemove(index)}
              className=' file: group flex w-full items-center justify-center gap-2 rounded-lg border bg-gray-200 px-4 py-1  text-[0.8rem] font-semibold leading-[24px] tracking-[0.4px] text-gray-600 transition-all duration-300 ease-in-out hover:opacity-90 md:text-[0.9rem]'
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

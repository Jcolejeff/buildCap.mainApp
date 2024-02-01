import React from 'react';
import { cn } from 'lib/utils';

interface Props {
  title: string;
  value: number;
  description: string;
  border?: boolean;
}

const NormalTableInfoCard = ({ title, value, description, border }: Props) => {
  return (
    <article
      className={cn(
        ` h-full w-full cursor-pointer rounded-xl  bg-green-100 px-5 py-6 transition-all duration-500 ease-in-out ${
          border && 'border '
        }`,
      )}
    >
      <div className='flex flex-col gap-1  px-2'>
        <h3 className='text-sm font-semibold'>{title}</h3>
        <p>
          <span className='font-bold md:text-[1.7rem]'>{value}</span>
          {/* <span className='text-[0.8rem] font-semibold'>%</span> */}
        </p>
      </div>
    </article>
  );
};

export default NormalTableInfoCard;

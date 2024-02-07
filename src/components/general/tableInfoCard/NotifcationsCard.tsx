import React from 'react';
import { cn } from 'lib/utils';
import { iconTypes } from 'utils/Icon';
import Icon from 'utils/Icon';

interface Props {
  title: string;
  icon?: iconTypes;
  description: string;
  border?: boolean;
  bgColor?: string;
  children?: React.ReactNode;
}

const NotificationsCard = ({ title, icon, description, border, bgColor, children }: Props) => {
  return (
    <article className='flex h-full w-full cursor-pointer items-start gap-2   border-b border-b-gray-300    py-6 transition-all duration-500 ease-in-out'>
      <Icon name={'demoDp'} svgProp={{ className: 'text-lg h-8' }} />
      <div className='flex flex-col   px-2'>
        <h3 className='text-base  font-bold'>{title}</h3>
        <p>
          <span className='text-sm text-gray-400'>{description}</span>
        </p>
        {children}
      </div>
    </article>
  );
};

export default NotificationsCard;

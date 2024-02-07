import React from 'react';
import { cn } from 'lib/utils';
import Icon, { iconTypes } from 'utils/Icon';

interface Props {
  title: string;
  icon?: iconTypes;

  border?: boolean;
  bgColor?: string;
  children?: React.ReactNode;
  text?: string;
  url?: string;
  type: 'approved' | 'pending' | 'review';
}

interface Content {
  approved: {
    text: string;
    icon: iconTypes;
    buttonIcon: iconTypes;
    bgColor: string;
    border: boolean;
    description: string;
  };
  pending: {
    text: string;
    icon: iconTypes;
    buttonIcon: iconTypes;
    bgColor: string;
    border: boolean;
    description: string;
  };
  review: {
    text: string;
    icon: iconTypes;
    buttonIcon: iconTypes;
    bgColor: string;
    border: boolean;
    description: string;
  };
}

const DoubleTableInfoCard = ({ title, type, bgColor, border }: Props) => {
  const content: Content = {
    approved: {
      text: 'Download',
      icon: 'Approved',
      buttonIcon: 'downloadIcon',
      bgColor: 'bg-green-100',
      border: true,
      description: 'Registration is up-to-date. Document is uploaded.',
    },
    pending: {
      text: 'Upload',
      icon: 'Pending',
      description: 'Registration is pending. Document not yet uploaded.',

      buttonIcon: 'uploadIcon',
      bgColor: 'bg-primary-20',
      border: true,
    },
    review: {
      text: 'Review',
      icon: 'Review',
      description: 'Registration is not complete. Add necessary details',

      buttonIcon: 'editPenBlue',
      bgColor: 'bg-red-100',
      border: true,
    },
  };

  return (
    <article
      className={cn(
        ` h-full w-full cursor-pointer rounded-xl px-4   py-6 shadow-sm transition-all duration-500 ease-in-out ${content[type].bgColor}`,
      )}
    >
      <div className='flex flex-col gap-4  '>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>{title}</p>
          <Icon name={content[type].icon} svgProp={{ className: 'text-current color-current' }} />
        </div>
        <div className='flex flex-col '>
          <h3 className='text-sm font-bold'>{title}</h3>

          <p className='text-[0.79rem] leading-[100%] tracking-[0.02rem] md:leading-[1.1rem] md:tracking-[0.0125rem]'>
            {content[type].description}
          </p>
        </div>
        <button className='flex w-full items-center justify-center gap-2 rounded-[6px]  bg-black px-3 py-2 text-sm font-[400] leading-[1.5rem] tracking-[0.02875rem] text-white shadow-lg shadow-muted-foreground  '>
          <Icon
            name={content[type].buttonIcon}
            svgProp={{ className: 'text-current color-current' }}
          />
          <span>{content[type].text}</span>
        </button>
      </div>
    </article>
  );
};

export default DoubleTableInfoCard;

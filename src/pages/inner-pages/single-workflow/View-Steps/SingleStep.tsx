import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shadcn/accordion';
import Icon from 'utils/Icon';
import { ArrowBigRightDash } from 'lucide-react';
import { ArrowBigRight } from 'lucide-react';
import { ArrowRightCircle } from 'lucide-react';
import EditStep from 'components/modal/EditStep';

interface IProps {
  title?: string;
  description?: string;
  stepNumber?: string;
  isLast?: boolean;
  elementId?: string;
  elementType?: string;
  url?: string;
  narration?: string;
  refetch: any;
  id?: string;
  workflowId?: number;
}

export default function SingleStep({
  title,
  description,
  stepNumber,
  elementId,
  elementType,
  url,
  narration,
  refetch,
  id,
  workflowId,
}: IProps) {
  return (
    <Accordion type='single' collapsible className='w-full shadow-md'>
      <AccordionItem value='item-1' className='border-0'>
        <AccordionTrigger className='bg-slate-200/50 px-6'>
          <div>
            <p className='text-start text-lg font-semibold text-gray-700'>
              Step
              <span className='ml-1'>{stepNumber}</span>
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <section className='gap-4 px-6 py-4 md:grid md:grid-cols-2'>
            <div className='space-y-1'>
              <p className='font-semibold'>Title</p>
              <p className='border p-4 text-gray-600'>{title}</p>
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>Description</p>
              <p className='border p-4 text-gray-600'>{description}</p>
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>Narration</p>
              <p className='border p-4 text-gray-600'>{narration}</p>
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>Page</p>
              <p className='border p-4 text-gray-600'>{url}</p>
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>Element Type</p>
              <p className='border p-4 text-gray-600'>{elementType}</p>
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>Element ID</p>
              <p className='border p-4 text-gray-600'>{elementId}</p>
            </div>
          </section>
          <div className='flex justify-end px-6'>
            <EditStep
              name={title}
              description={description}
              position={stepNumber}
              narration={narration}
              url={url}
              id={id}
              element_id={elementId}
              element_type={elementType}
              refetch={refetch}
              trigger={
                <button className=' self-end rounded-md border border-primary-1 p-2 px-6 text-sm capitalize text-gray-800'>
                  edit
                </button>
              }
            ></EditStep>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

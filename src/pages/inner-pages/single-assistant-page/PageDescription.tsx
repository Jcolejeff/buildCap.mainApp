import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shadcn/accordion';
import EditPage from 'components/modal/EditPage';

export function PageDescription({ desc }: { desc: string }) {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      <AccordionItem value='item-1' className='border-0'>
        <AccordionTrigger className='bg-slate-200/50 px-6 text-[1.07rem] font-semibold text-gray-700'>
          This is brief description of this page
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col gap-3 p-6'>
            <p className='text-base text-gray-500'>{desc}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

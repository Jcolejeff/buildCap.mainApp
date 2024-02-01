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
import { Link } from 'react-router-dom';
import CONSTANTS from 'constant';

export function PossibleWorkFlows() {
  const sections = [
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
    {
      heading: 'How to review booking details ',
      link: '88383883',
    },
  ];
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      <AccordionItem value='item-1' className='border-0'>
        <AccordionTrigger className='bg-slate-200/50 px-6'>
          <div>
            <p className='text-start text-lg font-semibold text-gray-700'>Possible Workflows</p>
            <p className='text-sm text-gray-500'>
              Below are suggestions of some workflows that can be created on this page, click to
              edit and save them
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/* <div className='flex flex-col gap-3 py-6'>
            <section className='grid gap-[1rem] rounded-lg md:grid-cols-[1fr_1fr_1fr]'>
              {sections.map((item, index) => {
                return (
                  <Link to={`/${CONSTANTS.ROUTES['payment-plans']}/workflow/83899`}>
                    <article className=' rounded-lg border-[2.5px] px-5 py-5' key={index}>
                      <div className='flex  items-center gap-4 '>
                        <p>{index + 1}</p>
                        <h3 className='text-sm font-semibold'>{item.heading}</h3>
                        <ArrowRightCircle className=' font-light'></ArrowRightCircle>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </section>
          </div> */}
          <p className='py-6 text-center text-lg font-semibold'>
            no possible workflows suggested for this page
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

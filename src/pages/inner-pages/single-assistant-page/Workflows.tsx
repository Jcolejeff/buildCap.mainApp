import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shadcn/accordion';
import React from 'react';
import CreateWorkflow from 'components/modal/CreateWorkflow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { Button } from 'components/shadcn/ui/button';
import Icon from 'utils/Icon';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface } from 'types';
import contentService from 'services/content';
import CONSTANTS from 'constant';
import { processError } from 'helper/error';
import { formatDate } from 'lib/utils';
import FeaturedLoader from 'components/Loaders/FeaturedLoader';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import useStore from 'store';
import { useParams } from 'react-router-dom';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import toast from 'helper';
import API from 'services';
export function WorkFlows() {
  const OpenJobs = [
    {
      name: 'DevOps',
      type: 'How to use the search bar',
      location: 'Remote',
      link: 'a7f1477dc36041aabd2c40d5c8598e3f',
    },
    {
      name: 'DevOps',
      type: 'How to use the search bar',

      location: 'Remote',
      link: 'a7f1477dc36041aabd2c40d5c8598e3f',
    },
    {
      name: 'DevOps',
      type: 'How to use the search bar',
      location: 'Remote',
      link: 'a7f1477dc36041aabd2c40d5c8598e3f',
    },
    {
      name: 'DevOps',
      type: 'Fulltime',
      location: 'Remote',
      link: 'a7f1477dc36041aabd2c40d5c8598e3f',
    },
    {
      name: 'DevOps',
      type: 'Fulltime',
      location: 'Remote',
      link: 'a7f1477dc36041aabd2c40d5c8598e3f',
    },
  ];
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { pageId } = useParams();

  const {
    data: allWorkflows,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<any, any, apiInterface<any[]>>({
    queryKey: ['get-allWorkflows'],
    queryFn: () => contentService.getAllWorkflows(pageId || ''),
    onError: (err) => {
      processError(err);
    },
  });
  const deleteWorkflow = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await API.delete(`/workflows/${id}?page_id=${pageId}`);
      toast.success('Workflow deleted successfully');
      setTimeout(() => {
        refetch();
      }, 10);
    } catch (error) {
      processError(error);
    }
    setIsDeleting(false);
  };

  return (
    <section>
      <div className='flex items-center justify-between bg-slate-200/50 p-4 px-6'>
        <div>
          <p className='text-start text-lg font-semibold text-gray-700'>Your Workflows</p>
          <p className='text-sm text-gray-500'>
            View the workflows that you have created ({OpenJobs.length})
          </p>
        </div>
        <CreateWorkflow
          refetch={refetch}
          trigger={
            <button className='w-fit rounded-md border border-primary-1 p-2 px-6 text-sm font-normal capitalize text-gray-800'>
              Add New Workflow
            </button>
          }
        ></CreateWorkflow>
      </div>
      <TextContentLoader isLoading={isLoading || isFetching} className='my-4'>
        <div className='space-y-3 py-8'>
          {allWorkflows?.items?.map((item, index) => {
            return (
              <article
                className='flex cursor-pointer justify-between rounded-md border bg-white px-8 py-4 pt-6'
                key={index}
              >
                <p className=' text-base font-normal capitalize'>{index + 1}</p>
                <Link
                  to={`/${CONSTANTS.ROUTES['payment-plans']}/workflow/${item?.id}`}
                  className=' w-10/12 py-0'
                >
                  <span className='text-base font-semibold capitalize'>{item.name}</span>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='px-4 py-2'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className='flex items-center gap-2'>
                      <Link
                        to={`/${CONSTANTS.ROUTES['payment-plans']}/workflow/${item?.id}`}
                        className='flex items-center gap-2'
                      >
                        <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                        <p> Edit Workflow</p>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => deleteWorkflow(item?.id || '')}
                      className='flex items-center gap-2 text-red-500'
                    >
                      <Icon name='trash' svgProp={{ className: 'text-black' }}></Icon>
                      <p> Delete Workflow</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </article>
            );
          })}
        </div>
      </TextContentLoader>
    </section>
  );
}

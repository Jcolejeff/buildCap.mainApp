import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import blogImg from 'assets/image/blogImageBig.png?format=webp&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';

import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useState } from 'react';
import BlogCard from 'components/general/Card';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import { apiInterface, apiInterfaceV2, contentApiItemInterface } from 'types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import InlineLoader from 'components/Loaders/InlineLoader';
import CONSTANTS from 'constant';
import ContentLoader from 'components/general/ContentLoader';
import { formatDate } from 'lib/utils';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import CreateNewPageModal from 'components/modal/CreateNewPage';
import { ChevronLeftIcon, ChevronsRightIcon, ChevronRight } from 'lucide-react';
import UploadVideoSteps from './UploadVideoSteps';
import SingleStep from './SingleStep';
import SaveWorkflow from 'components/modal/SaveWorkflow';
import CreateNewWorkflowStep from 'components/modal/CreateNewWorkflowStep';
import useStore from 'store';
import InfoAboutWorkflow from './InfoAboutWorkflow';

const ViewStepsTab = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    setAuthDetails,
    setLoggedIn,
    authDetails,
    pageId,
    setCurrentWorkflow,
    currentWorkflow,
    currentPage,
  } = useStore((store) => store);

  const { workflowId } = useParams();

  const { data, isLoading, isFetching, refetch } = useQuery<any, any, any>({
    queryKey: ['get-workflow'],
    queryFn: () => contentService.getSingleWorkflow(workflowId ?? '', pageId),
    onSuccess: (data) => {
      setCurrentWorkflow(data?.data);
    },
    onError: (err) => {
      processError(err);
    },
  });

  const sortedSteps = [...(data?.data?.steps || [])].sort((a, b) => a.position - b.position);

  return (
    <TextContentLoader
      isLoading={isLoading || isFetching}
      className=' my-[3.5rem] w-full py-[1rem] sm:px-[0.5rem] '
    >
      <main className='relative w-full'>
        <div className=' flex w-full flex-col gap-12 bg-white '>
          <article className=' flex items-center justify-between'>
            <div className='w-full'>
              <p className='font-bold md:text-[19px] '>
                {currentWorkflow?.name || 'How to search for hotel'}
              </p>
              <p className='text-base text-gray-400'>
                {currentWorkflow?.description || 'This is a descripti'}
              </p>
            </div>

            <SaveWorkflow
              title='Add New Page'
              trigger={
                <button className='group   flex items-center justify-center gap-2 rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-12'>
                  <span className=''>Save</span>
                </button>
              }
            ></SaveWorkflow>
          </article>
          <InfoAboutWorkflow
            url={currentWorkflow?.url}
            title={currentWorkflow?.name}
            refetch={refetch}
            description={currentWorkflow?.description}
            narration={currentWorkflow?.narration}
            workflowId={workflowId}
          ></InfoAboutWorkflow>

          <p className='text-lg font-semibold text-gray-600'>
            Record a video of this flow using our chrome extension.{' '}
            <span className='font-bold text-black underline'>
              {' '}
              {'   '}
              <button
                className='underline'
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              >
                See how
              </button>
            </span>
          </p>
          {show && (
            <section>
              <div className='flex  w-full flex-col rounded-[0.375rem]  bg-white p-4 py-12 shadow-lg md:px-[2rem] md:py-6'>
                <p className='mb-2 text-base text-gray-500'>
                  Specify work flow using our chrome extension in 3 steps{' '}
                </p>
                <div className='py-2 text-base text-gray-500'>
                  <ol className='list-decimal space-y-1 pl-5'>
                    <li className=''>
                      Click to install our chrome extension if you haven’t already
                    </li>
                    <li className=''>
                      Record your workflow with our extension as you interact with the pages
                    </li>
                    <li className=''>Save your video and return here to continue</li>
                  </ol>
                </div>
              </div>
              <button className='group mt-12 flex w-fit items-center justify-center gap-2 rounded-[6px] border border-primary-1 bg-white px-5 py-2 transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-sm font-[600] leading-[1.5rem] tracking-[0.02875rem]  disabled:cursor-not-allowed disabled:opacity-50'>
                  Start recording
                </span>
              </button>
            </section>
          )}

          <section className='space-y-3'>
            <p className='text-lg font-semibold text-gray-600'>Enter the steps for this workflow</p>
            <TextContentLoader isLoading={isFetching || isLoading} className='py-1'>
              <section className='space-y-3'>
                {sortedSteps.map((i, idx) => (
                  <SingleStep
                    title={i?.name}
                    description={i?.description}
                    key={idx}
                    elementId={i?.element_id}
                    elementType={i?.element_type}
                    id={i?.id}
                    refetch={refetch}
                    narration={i?.narration}
                    url={i?.url}
                    workflowId={i?.workflow_id}
                    stepNumber={i?.position}
                  ></SingleStep>
                ))}
              </section>
            </TextContentLoader>
            <div className='flex flex-col items-center gap-3 py-6'>
              <CreateNewWorkflowStep
                refetch={refetch}
                trigger={
                  <button className='w-fit rounded-md border border-primary-1 p-2 px-6 text-sm font-normal capitalize text-gray-800'>
                    Create New Step
                  </button>
                }
              ></CreateNewWorkflowStep>
            </div>
          </section>
          {/* <div className=' w-full'>
          <TextContentLoader isLoading={false} className='py-1'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className='my-[1rem] text-[1.2rem] font-[500] text-secondary-9/[0.87]'
                  />
                ),
                b: ({ node, ...props }) => <span {...props} className='' />,
                i: ({ node, ...props }) => <span {...props} className='' />,
                blockquote: ({ node, ...props }) => (
                  <span
                    {...props}
                    className='mb-[2.5rem] leading-[2rem] tracking-[0.00938rem] text-primary-9/[0.87]'
                  />
                ),
                ol: ({ node, ...props }) => <ol {...props} className='' />,
                ul: ({ node, ...props }) => <ul {...props} className='' />,
                a: ({ node, ...props }) => <a {...props} className='' />,
                img: ({ node, ...props }) => (
                  <div className='my-8 flex h-auto max-w-full items-center justify-center overflow-hidden'>
                    {' '}
                    <img {...props} className='h-full w-full' />
                  </div>
                ),
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className='mb-[1.5rem] leading-[2rem] tracking-[0.00938rem] text-primary-9/[0.87]'
                  ></p>
                ),
              }}
            >{`${data?.data?.content || 'hello'}`}</ReactMarkdown>
          </TextContentLoader>
        </div> */}
          <UploadVideoSteps></UploadVideoSteps>
        </div>
      </main>
    </TextContentLoader>
  );
};

export default ViewStepsTab;

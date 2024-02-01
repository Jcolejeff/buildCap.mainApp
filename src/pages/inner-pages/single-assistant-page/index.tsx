import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import blogImg from 'assets/image/blogImageBig.png?format=webp&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';

import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useState, useEffect } from 'react';
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
import ReloadPageUrl from './ReloadUrl';
import { PageDescription } from './PageDescription';
import { PossibleWorkFlows } from './PossibleWorkFlows';
import { WorkFlows } from './Workflows';
import SaveWorkflow from 'components/modal/SaveWorkflow';
import CreateWorkflow from 'components/modal/CreateWorkflow';
import SavePage from 'components/modal/SavePage';
import useStore from 'store';
import EditPage from 'components/modal/EditPage';

const SingleAssistantPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const { setPageId, currentApp, setCurrentPage, currentPage } = useStore((store) => store);

  const { pageId: currentPageId } = useParams();
  const { data, isLoading, isFetching, refetch } = useQuery<any, any, apiInterface<any[]>>({
    queryKey: ['get-singlePage'],
    queryFn: () => contentService.getSinglePage(currentApp?.data?.id || '', currentPageId || ''),
    onSuccess: (data) => {
      setCurrentPage(data?.data);
    },

    onError: (err) => {
      processError(err);
    },
  });

  useEffect(() => {
    setPageId(currentPageId || '');
  }, []);

  return (
    <TextContentLoader
      isLoading={isLoading || isFetching}
      className=' my-[3.5rem] h-full py-[1rem] sm:px-[2.5rem] '
    >
      <main className='relative w-full px-container-base '>
        <div className='my-[1.5rem] flex w-full flex-col gap-8 rounded-[1rem] bg-white px-4 py-[1rem] sm:px-[2.5rem] sm:py-[2.25rem] '>
          <div className='flex w-full  items-center gap-4 md:flex-row'>
            <div
              onClick={() => navigate(-1)}
              className='flex w-max cursor-pointer items-center gap-1 rounded-[8px] px-[2px] py-1  transition-colors duration-300 ease-in-out hover:bg-slate-100 active:bg-slate-200'
            >
              <Icon
                name='arrowBack'
                svgProp={{ width: '1.5rem', height: '1.5rem', className: 'text-secondary-9' }}
              />
            </div>
            <InlineLoader isLoading={false}>
              <div className='flex items-center gap-1'>
                <h5 className='text-sm font-[500] capitalize leading-[113%] text-gray-400'>page</h5>
                <ChevronRight className='w-3'></ChevronRight>
                <h5 className='text-sm font-[500] capitalize leading-[113%]'>
                  {currentPage?.title || 'Page Name'}
                </h5>
              </div>
            </InlineLoader>
          </div>
          <article className=' flex items-center justify-between'>
            <div>
              <p className='font-bold md:text-[19px] '> {currentPage?.title || 'Page Name'}</p>
              <p className='text-sm text-gray-400'>
                Below are some details we have about this page, you can choose to provide more
                details
              </p>
            </div>

            <SavePage
              trigger={
                <button className='group   flex items-center justify-center gap-2 rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-8'>
                  <span className='opacity-95'>Save</span>
                </button>
              }
            ></SavePage>
          </article>

          <ReloadPageUrl url={currentPage?.url || 'Page Name'}></ReloadPageUrl>
          <section className='space-y-3'>
            <PageDescription desc={currentPage?.description || 'Page Name'}></PageDescription>
            <div className='flex justify-end px-4 py-6'>
              <EditPage
                refetch={refetch}
                trigger={
                  <button className=' self-end rounded-md border border-primary-1 p-2 px-6 text-sm capitalize text-gray-800'>
                    edit
                  </button>
                }
              ></EditPage>
            </div>

            <PossibleWorkFlows></PossibleWorkFlows>
            <WorkFlows></WorkFlows>
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
        </div>
      </main>
    </TextContentLoader>
  );
};

export default SingleAssistantPage;

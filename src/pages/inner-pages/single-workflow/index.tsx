import Icon from 'utils/Icon';
import { useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import InlineLoader from 'components/Loaders/InlineLoader';
import { ChevronRight } from 'lucide-react';
import ViewStepsTab from './View-Steps/ViewSteps';
import PreviewWorkflow from './Preview-Workflow/PreviewWorkflow';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import useStore from 'store';
type filterTypes = 'View Steps' | 'Preview workflow';

interface Filter {
  name: filterTypes;
}
const settingsFilters: Filter[] = [{ name: 'View Steps' }, { name: 'Preview workflow' }];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    'View Steps': <ViewStepsTab />,
    'Preview workflow': <PreviewWorkflow />,
  };

  return components[title];
};

const SingleWorkFlowPage = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('View Steps');
  const navigate = useNavigate();
  const { currentWorkflow, currentPage } = useStore((store) => store);
  const { workflowId } = useParams();

  return (
    <section className='relative my-[1.5rem] flex w-full flex-col gap-8 rounded-[1rem] bg-white px-4 py-[1rem] sm:px-[2.5rem]  sm:py-[2.25rem]'>
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
            <h5 className='text-sm font-[500] capitalize leading-[113%] text-gray-400'>
              {currentPage?.title || 'How to search for hotel'}
            </h5>
            <ChevronRight className='w-3'></ChevronRight>

            <h5 className='text-sm font-[500] capitalize leading-[113%]'>
              {currentWorkflow?.name || 'How to search for hotel'}
            </h5>
          </div>
        </InlineLoader>
      </div>
      {/* tabs */}
      <div className='container flex h-full w-full flex-col overflow-auto px-container-base py-[1.875rem]'>
        <div className='relative grid w-full'>
          <div className='grid max-w-full justify-start'>
            <div className='no-scrollbar flex w-full overflow-auto whitespace-nowrap'>
              {settingsFilters?.map((i, idx) => (
                <button
                  key={idx}
                  className={`${
                    i?.name === currFilter
                      ? `bg-primary-1 text-white`
                      : `bg-transparent text-secondary-2 hover:text-primary-1`
                  } flex h-[1.8rem] w-max items-center rounded-[5px]  px-4 transition-all ease-in-out lg:h-[2.5rem] lg:px-[1.5rem] `}
                  onClick={() => setCurrFilter(i?.name)}
                >
                  <span className='mt-[3px] whitespace-nowrap text-[13px] leading-3 tracking-[0.15px] md:mt-0 lg:text-[16px]'>
                    {i?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* ... */}

          <div className='mt-7'>
            <DisplayTab title={currFilter} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleWorkFlowPage;

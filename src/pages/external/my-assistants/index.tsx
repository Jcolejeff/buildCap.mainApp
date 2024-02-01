import FunkyPagesHero from 'components/general/FunkyPagesHero';
import PillTabs from 'components/general/PillTabs';
import SearchComboBox from 'components/general/SearchComboBox';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import demoBlogImg from 'assets/image/blogImg.png';
import demoDp from 'assets/image/demoDp.jpg';
import Card from 'components/general/Card';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface } from 'types';
import contentService from 'services/content';
import CONSTANTS from 'constant';
import { processError } from 'helper/error';
import { formatDate } from 'lib/utils';
import FeaturedLoader from 'components/Loaders/FeaturedLoader';
import ContentLoader from 'components/general/ContentLoader';
import EmptyContentWrapper from 'components/Hocs/EmptyContentWrapper';
import assistantsList from './data';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import useStore from 'store';
import img1 from 'assets/svg/bot.svg';
import { useEffect } from 'react';

const AllAssistantsPage = () => {
  const navigate = useNavigate();
  const { setAuthDetails, setLoggedIn, authDetails, searchInput, setFilteredApps, filteredApps } =
    useStore((store) => store);
  const { data: allAssistants, isLoading: Loading } = useQuery<any, any, apiInterface<any[]>>({
    queryKey: ['get-allAssistants'],
    queryFn: () => contentService.getContent(authDetails?.data?.id?.toString() || ''),
    onError: (err) => {
      processError(err);
    },
  });

  useEffect(() => {
    const filtered: any[] =
      searchInput === ''
        ? allAssistants?.items || []
        : allAssistants?.items?.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()),
          ) || [];
    setFilteredApps(filtered);
  }, [searchInput, Loading]);
  console.log(filteredApps);

  return (
    <div className='container my-[1.125rem] flex flex-col px-container-base lg:px-container-lg'>
      <article className='mb-12 mt-7 flex items-center justify-between'>
        <div>
          <p className='font-bold md:text-[19px] '>My App Assistant</p>
          <p className='text-sm text-gray-400'>
            A list of all assistants in your account that you have created
          </p>
        </div>
        <button
          onClick={() => navigate(`/${CONSTANTS.ROUTES['create-assistant']}`)}
          className='hidden rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90 md:flex'
        >
          Create App Assistant
        </button>
      </article>
      <EmptyContentWrapper
        isEmpty={!Loading && allAssistants?.items && allAssistants?.items?.length < 1}
        customMessage="You haven't created an assistant yet?. Create App Assistant"
      >
        <div className='mb-[7.68rem] flex w-full  flex-col gap-[2.5rem]'>
          <ContentLoader isLoading={Loading}>
            <div className='grid grid-cols-1 gap-[2.69rem] sm:grid-cols-2   md:grid-cols-3 xl:grid-cols-4'>
              {filteredApps?.map((i, idx) => (
                <div key={idx} className='h-full w-full'>
                  <Card
                    authorImg={demoDp}
                    authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                    authorRole={`${i?.content_author?.email}`}
                    blogImage={img1}
                    category={`5 times`}
                    date={formatDate(i?.last_updated)}
                    description={i?.subtitle}
                    title={i?.name}
                    link={`/payment-plans?app_id=${i?.id}`}
                  />
                </div>
              ))}
              {/* {allAssistants?.items?.map((i, idx) => (
                <div key={idx} className='h-full w-full'>
                  <Card
                    authorImg={demoDp}
                    authorName={`${i?.content_author?.first_name} ${i?.content_author?.last_name}`}
                    authorRole={`${i?.content_author?.email}`}
                    blogImage={img1}
                    category={`5 times`}
                    date={formatDate(i?.last_updated)}
                    description={i?.subtitle}
                    title={i?.name}
                    link={`/payment-plans?app_id=${i?.id}`}
                  />
                </div>
              ))} */}
            </div>
          </ContentLoader>
        </div>
      </EmptyContentWrapper>
    </div>
  );
};

export default AllAssistantsPage;

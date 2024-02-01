import CommentThreadCard from 'components/general/CommentThreadCard';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import InputAddComboBox from 'components/general/InputAddComboBox';
import LinksFilter from 'components/general/LinksFilter';
import AllPagesTable from 'components/general/PagesTable';
import PillTabs from 'components/general/PillTabs';
import CreateNewPageModal from 'components/modal/CreateNewPage';
import { useState, useEffect } from 'react';
import Icon from 'utils/Icon';
import contentService from 'services/content';
import { processError } from 'helper/error';
import { useQuery } from '@tanstack/react-query';
import { apiInterface, contentApiItemInterface } from 'types';
import { getContentInterface, getSingleContentInterface } from 'services/content/content.types';
import { useLocation } from 'react-router-dom';
import useStore from 'store';
import TextContentLoader from 'components/Loaders/TextContentLoader';
import { is } from 'date-fns/locale';
import { set } from 'date-fns';

const PaymentPlans = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const app_id = searchParams.get('app_id');
  const {
    setAuthDetails,
    setLoggedIn,
    setAppId,
    appId: currentAppId,
    setCurrentApp,
    currentApp,
    setIsLoading,
  } = useStore((store) => store);

  const {
    data,
    isLoading: Loading,
    refetch,
    isFetching,
    isFetched,
  } = useQuery<any, any, apiInterface<any[]>>({
    queryKey: ['get-allAssistantPages'],
    queryFn: () => contentService.getSingleContent({ app_id: app_id ?? currentAppId }),
    onError: (err) => {
      processError(err);
    },
  });
  useEffect(() => {
    if (app_id) {
      setAppId(app_id);
      refetch();
    }
  }, [app_id]);
  useEffect(() => {
    if (isFetched) {
      setCurrentApp(data?.currentApp);
      setIsLoading(false);
    }
    if (isFetching) {
      setIsLoading(true);
    }
  }, [app_id, isFetched, isFetching]);

  return (
    <div className='container flex w-full flex-col px-container-base py-[1.875rem]'>
      <FunkyPagesHero
        description='Create and manage your payment plans here.'
        title='Payment Plans'
      />
      {/* <article className='mb-12 mt-7 flex items-center justify-between'>
        <div>
          <p className='font-bold md:text-[19px] '>List of Pages</p>
          <p className='text-sm text-gray-400'>
            Below is a list of all the pages we found on your website{' '}
          </p>
        </div>

        <CreateNewPageModal
          title='Add New Page'
          refetch={refetch}
          trigger={
            <button className='group   flex items-center justify-center gap-2 rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90'>
              <Icon
                name='addIcon'
                svgProp={{
                  className:
                    'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <span className='opacity-95'>Add New page </span>
            </button>
          }
        ></CreateNewPageModal>
      </article>
      <TextContentLoader isLoading={Loading || isFetching}>
        <div className='h-full w-full'>
          <AllPagesTable pages={data?.allPages} refetch={refetch} />
        </div>
      </TextContentLoader> */}
    </div>
  );
};

export default PaymentPlans;

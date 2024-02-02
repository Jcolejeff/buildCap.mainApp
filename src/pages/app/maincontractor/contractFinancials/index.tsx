import { useState } from 'react';
import Icon from 'utils/Icon';
import { cn } from 'lib/utils';
import sections from './tempData';
import { useQuery } from '@tanstack/react-query';
import contentService from 'services/content';
import { processError } from 'helper/error';
import ContentLoader from 'components/general/ContentLoader';
import { apiInterface, contentApiItemInterface } from 'types';
import FeaturedLoader from 'components/Loaders/FeaturedLoader';
import CONSTANTS from 'constant';
import { useNavigate } from 'react-router-dom';
import UserPageGuard from 'guards/UserPageGuard';
import useStore, { StoreType } from 'store';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import PatientsTableComponent from 'components/Tables/ProjectsTable/ProjectsTable';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';

const MainContractorContractorFinancial = () => {
  return (
    <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col overflow-auto border   bg-white px-container-base py-[1.1rem]'>
      <div className='   w-full   py-[1.875rem] '>
        <FunkyPagesHero
          description='list of your active and inactive projects'
          title='Contractor Dashboard'
          customBgClass='bg-primary-20'
          textColor='text-black'
        />
      </div>
      <div>
        <p className='font-bold md:text-[19px] '>Contract Financials</p>
      </div>
      <div className='relative mt-12 grid w-full'>
        <section>
          <PatientsTableComponent />
        </section>
      </div>
    </div>
  );
};

export default MainContractorContractorFinancial;

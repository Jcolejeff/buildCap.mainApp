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
import PatientsTableComponent from 'components/Tables/MainContractor/ProjectStatusTable';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import ContractAgreementTable from 'components/Tables/MainContractor/ContractsTable';
import { ExternalNav } from 'components/partials/external-nav';

const MainContractorContractorFinancial = () => {
  return (
    <UserPageGuard page={CONSTANTS.ROUTES['contract-financials']}>
      <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col  border   bg-white px-container-base py-[1.1rem]'>
        <ExternalNav />
        <div className='   w-full   py-[1.875rem] '>
          <FunkyPagesHero
            description='list of your active and inactive projects'
            title='Contractor Dashboard'
          />
        </div>
        <div>
          <p className='font-bold md:text-[19px] '>Contract Financials</p>
        </div>
        <div className='relative mt-12 grid w-full'>
          <section>
            <ContractAgreementTable />
          </section>
        </div>
      </div>
    </UserPageGuard>
  );
};

export default MainContractorContractorFinancial;

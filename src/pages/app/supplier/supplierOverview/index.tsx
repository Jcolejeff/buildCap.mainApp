import UserPageGuard from 'guards/UserPageGuard';
import { useState } from 'react';
import Icon from 'utils/Icon';
import { cn } from 'lib/utils';
import sections from './tempData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import useStore, { StoreType } from 'store';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import ProjectStatusTable from 'components/Tables/MainContractor/ProjectStatusTable';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import CreateProjectModal from 'components/modal/AddSubcontractor';
import { ExternalNav } from 'components/partials/external-nav';
import { Link } from 'react-router-dom';
import CONSTANTS from 'constant';

const SupplierOverview = () => {
  return (
    <UserPageGuard page={CONSTANTS.ROUTES['supplier-overview']}>
      <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col overflow-auto border   bg-white px-container-base py-[1.1rem]'>
        <ExternalNav />

        <div className='   w-full   py-[1.875rem] '>
          <FunkyPagesHero
            description='list of your active and inactive projects'
            title='Subcontractor Dashboard'
            customBgClass='bg-primary-18'
          />

          <article className=' mt-7 flex w-full items-center justify-end'>
            <Link
              to={`/${CONSTANTS.USER_ROUTES_PREFIX.maincontractor}/${CONSTANTS.ROUTES['create-project']}`}
              className='group flex  items-center justify-center gap-2  rounded-md bg-green-200 px-6 py-2 text-[0.9rem] font-semibold leading-[24px]  tracking-[0.15px] text-[#008000] transition-opacity duration-300 ease-in-out hover:opacity-90'
            >
              <span className='opacity-95'>New Project </span>
              <Icon
                name='addThreadIcon'
                svgProp={{
                  className:
                    'w-4 cursor-pointer fill-current hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
            </Link>
          </article>
        </div>
        <div>
          <p className='font-bold md:text-[19px] '>Project Management</p>
          <section className='mt-8 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr_1fr]  '>
            <NormalTableInfoCard
              title='All Projects'
              value={40}
              bgColor='bg-primary-15'
              description='This is the total number of patients you have registered today'
            />
            <NormalTableInfoCard
              title='Active Projects '
              value={45}
              bgColor='bg-primary-16'
              description='This is the total number of patients you have registered this month.'
            />
            <NormalTableInfoCard
              title='Completed Projects'
              bgColor='bg-primary-17'
              value={89}
              description='This is the total number of patients that are linked to another.'
            />
            {/* <NormalTableInfoCard
          title='Linked Patients'
          value={0}
          border
          description='This is the total number of patients that are linked to another.'
        /> */}
          </section>
        </div>
        <div className='relative mt-12 grid w-full'>
          <section>
            <ProjectStatusTable />
          </section>
        </div>
      </div>
    </UserPageGuard>
  );
};

export default SupplierOverview;

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
import PatientsTableComponent from 'components/Tables/ProjectsTable/ProjectsTable';

const MainContractorOverview = () => {
  return (
    <div className='container mt-8 flex  h-full w-full max-w-[150.75rem] flex-col overflow-auto border  border-red-600 bg-white px-container-base py-[2.1rem]'>
      <div className='   w-full  px-container-base py-[1.875rem] '>
        <FunkyPagesHero
          description='list of your active and inactive projects'
          title='Contractor Dashboard'
        />

        <section className='container bg-white px-container-base'>
          <article className='mb-12 mt-7 flex items-center justify-between'>
            <div>
              <p className='font-bold md:text-[19px] '>Customize your Avatar</p>
              <p className='text-sm text-gray-400'>
                Personalize your avatar to look the way you want.
              </p>
            </div>

            <button className='group   flex items-center justify-center gap-2 rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90'>
              <Icon
                name='addIcon'
                svgProp={{
                  className:
                    'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <span className='opacity-95'>Save Avatar </span>
            </button>
          </article>
        </section>
      </div>

      <div className='relative grid w-full'>
        <section>
          <PatientsTableComponent />
        </section>
      </div>
    </div>
  );
};

export default MainContractorOverview;

import BlogCard from 'components/general/Card';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import LinksFilter from 'components/general/LinksFilter';
import SearchComboBox from 'components/general/SearchComboBox';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import demoAd from 'assets/image/blogImg.png';
import Icon from 'utils/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
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
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import PatientsTableComponent from 'components/Tables/MainContractor/ProjectStatusTable';
import { ExternalNav } from 'components/partials/external-nav';
import SubcontractorsPerProjectTable from 'components/Tables/MainContractor/SubContractorsPerProjectTable';
import PaymentToSubcontractorsTable from 'components/Tables/MainContractor/PaymentToSubcontractorsTable';
import AddSubcontractorModal from 'components/modal/AddSubcontractor';
import GeneralTable from 'components/Tables/general/GeneralTable';
import FinancialRequestsTable from 'components/Tables/Subcontractor/FinancialRequestsTable';
import LoanStatusTable from 'components/Tables/Subcontractor/LoanStatusTable';

const MaterialFinancing = () => {
  const navigate = useNavigate();

  const { supplierName } = useStore((state: StoreType) => state);
  // const { data, isLoading } = useQuery<any, any, apiInterface<contentApiItemInterface[]>>({
  //   queryKey: ['get-blogs'],
  //   queryFn: () => contentService.getContent(),
  //   onError: (err) => {
  //     processError(err);
  //   },
  // });

  console.log(supplierName);

  return (
    <UserPageGuard page={CONSTANTS.ROUTES['subcontractor-financial-overview']}>
      <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col overflow-auto border   bg-white px-container-base py-[1.1rem]'>
        <ExternalNav />
        <div className='   w-full   py-[1.875rem] '>
          <FunkyPagesHero
            description='list of your active and inactive projects'
            title='Subcontractor Dashboard'
            customBgClass='bg-primary-18'
          />
        </div>
        <div>
          <p className='font-bold md:text-[19px] '>Material Financing</p>
          <section className='mt-8 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr_1fr_1fr]  '>
            <NormalTableInfoCard
              title='Total Requests'
              value={40}
              bgColor='bg-primary-19'
              description='This is the total number of patients you have registered today'
            />
            <NormalTableInfoCard
              title='Total Loans Disbursed'
              value={45}
              bgColor='bg-primary-16'
              description='This is the total number of patients you have registered this month.'
            />
            <NormalTableInfoCard
              title='Approved Requests'
              bgColor='bg-primary-17'
              value={89}
              description='This is the total number of patients that are linked to another.'
            />
            <NormalTableInfoCard
              title='Pending Loans Disbursed'
              bgColor='bg-primary-13'
              value={9}
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
            <FinancialRequestsTable />
          </section>
        </div>
        <div className='relative mt-12 grid w-full'>
          <section>
            <LoanStatusTable />
          </section>
        </div>
      </div>
    </UserPageGuard>
  );
};

export default MaterialFinancing;

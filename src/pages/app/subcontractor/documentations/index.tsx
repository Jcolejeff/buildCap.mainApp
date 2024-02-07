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
import ContractAgreementTableSubcontractor from 'components/Tables/Subcontractor/ContractsAgreementTable';
import FinancialStatementsTable from 'components/Tables/Subcontractor/FinancialStatements';
import DoubleTableInfoCard from 'components/general/tableInfoCard/DoubleTableInfoCard';

const SubcontractorDocumentation = () => {
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
            title='Contractor Dashboard'
            iconType='funkyPagesHero2'
            customBgClass='bg-primary-20'
            textColor='text-black'
          />
        </div>
        <div>
          <p className='font-bold md:text-[19px] '>Documentation</p>
          <div>
            <p className='my-4 font-semibold'>Registrations</p>
            <div className=' flex gap-6 text-sm font-semibold'>
              <p className='text-green-600'>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-green-600 text-green-600'></span>
                Approved
              </p>
              <p className='text-yellow-400'>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-yellow-400 text-green-600'></span>
                Pending
              </p>
              <p className='text-red-400'>
                <span className='mr-2 inline-block h-2 w-2 rounded-full bg-red-400 text-green-600'></span>
                Needs your attention
              </p>
            </div>
          </div>
          <section className='mt-8 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr_1fr_1fr] '>
            <DoubleTableInfoCard title='CAC' type='approved'></DoubleTableInfoCard>
            <DoubleTableInfoCard title='FIRS' type='pending'></DoubleTableInfoCard>
            <DoubleTableInfoCard title='TIN' type='review'></DoubleTableInfoCard>
            <DoubleTableInfoCard title='NIN' type='approved'></DoubleTableInfoCard>
          </section>
        </div>

        <div className='relative mt-12 grid w-full'>
          <section>
            <ContractAgreementTableSubcontractor />
          </section>
        </div>
        <div className='relative mt-12 grid w-full'>
          <section>
            <FinancialStatementsTable />
          </section>
        </div>
      </div>
    </UserPageGuard>
  );
};

export default SubcontractorDocumentation;

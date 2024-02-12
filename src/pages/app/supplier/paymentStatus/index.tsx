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
import InvoicePaymentTable from 'components/Tables/supplier/invoicePaymentstable';

const PaymentStatus = () => {
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
    <UserPageGuard page={CONSTANTS.ROUTES['payment-status']}>
      <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col border   bg-white px-container-base py-[1.1rem]'>
        <ExternalNav />
        <div className='   w-full   py-[1.875rem] '>
          <FunkyPagesHero
            description='list of your active and inactive projects'
            title='Supplier Dashboard'
          />
        </div>
        <div>
          <p className='font-bold md:text-[19px] '>Payment Status</p>
          <section className='mt-8 grid grid-cols-[1fr_1fr]  gap-[2rem] rounded-lg md:grid-cols-[1fr_1fr] '>
            <NormalTableInfoCard
              title='Received Payments'
              value={10}
              bgColor='bg-primary-1/10'
              description='This is the total number of patients you have registered today'
            />
            <NormalTableInfoCard
              title='Pending Payments '
              value={20}
              bgColor='bg-primary-20'
              description='This is the total number of patients you have registered this month.'
            />
          </section>
        </div>

        <div className='relative mt-12 grid w-full'>
          <section>
            <InvoicePaymentTable />
          </section>
        </div>
      </div>
    </UserPageGuard>
  );
};

export default PaymentStatus;

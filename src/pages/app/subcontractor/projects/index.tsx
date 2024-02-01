import BlogCard from 'components/general/Card';

import LinksFilter from 'components/general/LinksFilter';
import SearchComboBox from 'components/general/SearchComboBox';
import blogImg from 'assets/image/blogImg.png?format=webp&w=330&h=280&imagetools';
import dpIcon from 'assets/image/demoDp.jpg?format=webp&imagetools';
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
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shimmer, toBase64 } from 'utils/general/shimmer';

const CustomizeYourAvatarPage = () => {
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
    <UserPageGuard page={CONSTANTS.ROUTES.projects}>
      <div className='container   w-full  px-container-base py-[1.875rem] '>
        <FunkyPagesHero description='list of your active and inactive projects' title='Projects' />

        <section className='container  bg-white px-container-base'>
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
          <FeaturedLoader isLoading={false}>
            <div className='mb-[2.5rem] flex flex-col items-center gap-8 lg:flex-row'>
              <div className='w-full max-w-[424px] overflow-hidden rounded-[8px]'>
                <LazyLoadImage
                  placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  className='h-full w-full bg-cover'
                  // src={`${CONSTANTS.TIMBU_KEYS.IMAGE_BASE_URL}/${data?.items[0]?.photos?.[0]?.url}`}
                  effect='blur'
                  alt=' '
                />
              </div>
            </div>
          </FeaturedLoader>
        </section>
      </div>
    </UserPageGuard>
  );
};

export default CustomizeYourAvatarPage;

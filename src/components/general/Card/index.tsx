import CONSTANTS from 'constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { shimmer, toBase64 } from 'utils/general/shimmer';

interface IBlogCard {
  blogImage: string;
  category: string;
  date: string;
  title: string;
  description: string;
  authorImg: string;
  authorName: string;
  authorRole: string;
  link?: string;
}

const BlogCard = ({
  authorImg,
  authorName,
  authorRole,
  blogImage,
  category,
  date,
  description,
  title,
  link = `/test-blog`,
}: IBlogCard) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className='group flex h-max w-full cursor-pointer flex-col justify-between rounded-[8px] shadow-md  transition-all duration-300 ease-in-out'
    >
      <div className='flex flex-col'>
        <div
          className='relative h-[10rem] w-full  cursor-cardCursor  overflow-hidden rounded-t-[8px]
        transition-all duration-300 ease-in-out after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-black/30 after:transition-all after:duration-300 hover:after:bg-black/50
        '
        >
          <LazyLoadImage
            placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            src={blogImage}
            alt=' '
            className='h-full w-full bg-cover bg-top object-contain px-4 transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <div className='flex  w-full flex-col gap-2  px-4 py-4'>
          <h5 className='  text-[1.15rem] font-[700] leading-[27px]'>{title}</h5>

          <p className='text-[14px] font-[600] leading-[21px] tracking-[0.1px] text-primary-1 '>
            <span className='font-light'> Times used</span> : {category}
          </p>
          <p className='text-[14px] font-[300] leading-[21px] tracking-[0.1px] text-secondary-2 '>
            <span className=''>Last Edited</span> {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

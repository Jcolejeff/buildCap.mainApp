import CustomInput from 'components/shadcn/CustomInput';
import { Switch } from 'components/shadcn/switch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import masterCard from 'assets/image/mastercard.png';

const PreviewWorkflow = () => {
  return (
    <main className='relative w-full  '>
      <div className=' flex w-full flex-col gap-8 bg-white '>
        <article className=' flex items-center justify-between'>
          <div>
            <p className='font-bold md:text-[19px] '> Preview Workflow</p>
            <p className='text-sm text-gray-400'>A full preview mode of your commands.</p>
          </div>

          <button className='group   flex items-center justify-center gap-2 rounded-md bg-primary-1 px-6 py-2 text-[0.81rem] leading-[24px] tracking-[0.15px] text-white transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-8'>
            <span className=''>End Preview</span>
          </button>
        </article>
        <div className='flex flex-col'>
          <div className='w-100 rounded-md bg-white px-5 py-7 text-[16px] shadow-3 md:text-[17px] lg:text-[18px]'>
            <p className='font-semibold text-gray-600'>Click the video to pause/play the preview</p>
          </div>
          <div className='mt-10 flex w-full justify-center rounded-md bg-slate-300/60 p-4 md:px-[6rem] md:py-[4.5rem]'>
            <video className='w-full' controls>
              <source src='path_to_video.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PreviewWorkflow;

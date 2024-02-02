import NavDrop from 'components/auth/NavDrop';
import DpPlaceholder from 'assets/dpPlaceholder.svg';
import Menu from 'components/auth/Menu';
import { url } from 'lib/utils';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';

const AuthNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className='xl:px-container-xl container max-w-[1700px] bg-transparent px-container-base lg:px-container-lg'>
      <div className='flex w-full items-center justify-between py-[1.2rem] md:pb-[1rem] md:pt-[1.5rem] lg:border-b-secondary-1 xxl:py-8'>
        <div
          className='flex   cursor-pointer
             items-center gap-2'
          onClick={() => navigate(`/`)}
        >
          <Icon
            name='nfmLogo'
            svgProp={{ className: 'w-[80px] fill-white text-white  md:w-[120px]' }}
          />{' '}
        </div>

        <div className='ml-24 hidden items-center gap-[0.5rem] lg:flex'>
          <NavDrop />
        </div>
        <div className='invisible flex items-center justify-end gap-4 transition-all duration-500 ease-in-out md:visible md:mb-0 '>
          <a href='#' className=''>
            <div className='invisible flex items-center justify-center rounded-lg md:px-4 md:py-2 md:pr-6'>
              <p className='text-[1.1rem] font-light tracking-wider'>Sign In</p>
            </div>
          </a>
          <a href='#contact' className=''>
            <div className='flex items-center justify-center rounded-lg bg-primary-1 md:px-6 md:py-3'>
              <p className='text-sm font-bold tracking-wider text-white md:text-[0.8rem]'>
                Get Started
              </p>
            </div>
          </a>
        </div>
        <div className='flex md:hidden'>
          <Menu />
        </div>
      </div>
    </nav>
  );
};
export default AuthNavBar;

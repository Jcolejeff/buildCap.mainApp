import { useLocation, useNavigate } from 'react-router-dom';
import { ItitleLinks, routePathTypes } from 'types';
import Icon from 'utils/Icon';
import { useMemo } from 'react';
import CONSTANTS from 'constant';
import BgTransitionSpan from 'components/animation/bg-transitions-span';
import CoolUnderline from 'components/animation/cool-underline';
import useStore from 'store';
import SearchComboBox from 'components/general/SearchComboBox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import Menu from '../Menu';
export type navTitleTypes = 'Home' | 'Pricing' | 'Blogs' | 'FAQs' | 'About Us';

export const navLinks: ItitleLinks<navTitleTypes, routePathTypes>[] = [
  {
    link: '',
    title: 'Home',
  },
];
export type IDropNavTitles = 'Profile' | 'Settings' | 'Logout';

interface extendedRoutesInterface extends ItitleLinks<IDropNavTitles, routePathTypes> {
  icons: JSX.Element;
}

interface IDropNavLinks {
  level1: extendedRoutesInterface[];
  level2: extendedRoutesInterface[];
  level3: extendedRoutesInterface[];
}
export const menuLinks: IDropNavLinks = {
  level1: [{ icons: <Icon name='profileIcon' />, link: `profile`, title: `Profile` }],
  level2: [{ icons: <Icon name='settingIcon' />, link: `settings`, title: `Settings` }],
  level3: [{ icons: <Icon name='exitIcon' />, link: `logout`, title: `Logout` }],
};
export const ExternalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authDetails, loggedIn, setAuthDetails, setLoggedIn, setSearchInput, searchInput } =
    useStore((store) => store);
  // todo
  // make this an alert dialog
  const handleLogout = () => {
    setAuthDetails({});
    setLoggedIn(false);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  console.log('searchInput', searchInput);

  return (
    <nav className='container sticky left-0 right-0 top-0 z-10 w-full border-b border-extraColor-borderBottom-3 bg-white px-container-base md:border-0 lg:px-container-lg'>
      <div className='flex  w-full items-center justify-between py-[1.375rem] transition-all duration-300 ease-in-out md:border-b md:border-extraColor-borderBottom-1 md:py-[1.5rem]'>
        <div className='flex items-center gap-[6rem]'>
          <div className='flex cursor-pointer items-center gap-2' onClick={() => navigate(`/`)}>
            <Icon name='nfmLogo' svgProp={{ className: 'w-[68px]  md:w-[120px]' }} />
            {/* <h4 className='text-[16px] font-[700] leading-[20px] tracking-[0.15px] text-primary-8 md:text-[19px] md:font-[700] md:leading-[24px]'>
              App Assistant
            </h4> */}
          </div>
        </div>
        <div className='relative w-4/12 max-w-[800px]  '>
          <div className='w-full rounded-[12px] border bg-white px-[2.125rem]  py-[0.375rem] shadow-sm'>
            <div className='flex h-full w-full items-center'>
              <div className='flex-grow'>
                <input
                  className='form-input w-full border-0 placeholder:text-textColor-disabled focus:!ring-0'
                  placeholder='Search'
                  type='text'
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              <Icon name='searchIcon' svgProp={{ className: 'text-primary-9 w-4' }} />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4 '>
          <div className='flex items-center gap-[1.125rem]'>
            <Icon name='notificationIcon' />

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`
                 focus-within:outline-0 focus-within:ring-0 focus:ring-0 active:ring-0`}
              >
                <Icon name='demoDp' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-[1.5rem] w-[14.375rem]  bg-white shadow-5'>
                <DropdownMenuLabel className='flex items-center gap-[0.625rem] !px-[1.25rem] !py-[0.875rem]'>
                  <Icon name='demoDp' />
                  <div className='flex flex-col text-[14px] tracking-[0.15px]'>
                    <h6 className='font-inter font-[600] text-textColor-primary'>
                      {authDetails?.data?.first_name} {authDetails?.data?.last_name}
                    </h6>
                    <span className='text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-textColor-disabled'>
                      User
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='border-b border-b-extraColor-divider' />
                {menuLinks['level1']?.map((i, idx) => (
                  <DropdownMenuItem
                    onClick={() => {
                      navigate(`/${i?.link}`);
                    }}
                    key={idx}
                    className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
                  >
                    <div className='flex items-center'>{i?.icons}</div>
                    <div className='flex flex-grow justify-between'>
                      {' '}
                      <span>{i?.title}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className='border-b border-b-extraColor-divider' />

                {menuLinks['level2']?.map((i, idx) => (
                  <DropdownMenuItem
                    onClick={() => navigate(`/${i?.link}`)}
                    key={idx}
                    className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
                  >
                    <div className='flex items-center'>{i?.icons}</div>
                    <div className='flex flex-grow justify-between'>
                      {' '}
                      <span>{i?.title}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className='border-b border-b-extraColor-divider' />

                {menuLinks['level3']?.map((i, idx) => (
                  <DropdownMenuItem
                    onClick={() => handleLogout()}
                    key={idx}
                    className='flex cursor-pointer items-center gap-[0.75rem] !px-[1.25rem] !py-[0.75rem] text-[14px] leading-[21px] tracking-[0.15px] text-textColor-primary'
                  >
                    <div className='flex items-center'>{i?.icons}</div>
                    <span>{i?.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex items-center xl:hidden'>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};

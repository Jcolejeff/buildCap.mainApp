import Icon from 'utils/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { ItitleLinks, routePathTypes } from 'types';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/svg/nfmLogo.svg?format=webp&imagetools';
// import { useWindowSize } from 'usehooks-ts';
import Menu from '../Menu';
import useStore from 'store';
import { Button } from 'components/shadcn/ui/button';
import InlineLoader from 'components/Loaders/InlineLoader';
import toast from 'helper';
import API from 'services';
import { processError } from 'helper/error';
import EditAssistantModal from 'components/modal/EditAssistant';
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

const AppNav = () => {
  const navigate = useNavigate();
  const {
    authDetails,
    loggedIn,
    setAuthDetails,
    setLoggedIn,
    currentApp,
    isLoading,
    setIsLoading,
  } = useStore((store) => store);
  const [isDeleting, setIsDeleting] = useState(false);

  // todo
  // make this an alert dialog
  const handleLogout = () => {
    setAuthDetails({});
    setLoggedIn(false);
  };
  const deleteApp = async (id: string) => {
    setIsDeleting(true);
    setIsLoading(true);
    try {
      const res = await API.delete(`/apps/${id}`);
      toast.success('App deleted successfully');
      setTimeout(() => {
        //  refetch();
        navigate('/');
      }, 10);
    } catch (error) {
      processError(error);
    }
    setIsDeleting(false);
    setIsLoading(false);
  };

  return (
    <>
      <nav
        className={` containter sticky left-0  right-0 z-50 h-max  w-full border-b border-b-extraColor-borderBottom-3 transition-all duration-300 ease-in-out  md:border-0 md:px-container-base md:pt-[0.75rem]`}
      >
        <div className='relative hidden  h-full w-full justify-center rounded-[8px]  bg-white py-[0.75rem] shadow-4 md:flex md:px-container-base'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className=' invisible flex items-center gap-2 justify-self-center hover:bg-inherit'
                disabled={isLoading}
              >
                <InlineLoader
                  isLoading={isLoading}
                  className='hover  mb-4 flex items-center gap-2 justify-self-center'
                >
                  <span className=' text-base'>{currentApp?.data?.name}</span>
                  <Icon name='arrowDown' svgProp={{ className: 'w-7 h-10' }} />
                </InlineLoader>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-full px-6 py-2'>
              <DropdownMenuSeparator />
              <EditAssistantModal
                trigger={
                  <button className='group flex   items-center justify-center gap-2 rounded-md px-2 py-2  text-[0.9rem] leading-[24px] tracking-[0.15px] transition-opacity duration-300 ease-in-out hover:opacity-90'>
                    <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                    <p> Edit Assistant</p>
                  </button>
                }
              ></EditAssistantModal>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteApp(currentApp?.data?.id || '')}
                className='flex  w-full items-center gap-2 text-red-500'
              >
                <Icon name='trash' svgProp={{ className: 'text-black' }}></Icon>
                <p>
                  {' '}
                  Delete Assistant <span className='text-xs'> (cannot be undone)</span>
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='absolute right-4 flex items-center  gap-[1.125rem]'>
            <Icon name='notificationIcon' svgProp={{ className: 'w-7' }} />

            <DropdownMenu>
              <DropdownMenuTrigger
                className={` focus-within:outline-0 focus-within:ring-0 focus:ring-0 active:ring-0`}
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
        </div>
        <div className='flex  w-full items-center justify-between px-container-base py-[.875rem] md:hidden '>
          <div
            // onClick={() => navigate(`/`)}
            className='flex cursor-pointer items-center gap-[0.625rem]'
          >
            <div className='flex items-center '>
              <img src='/fav.png' alt='' className='w-[20px] md:w-[25px]' />
            </div>
            <h4
              className={`text-[14px] font-[900] leading-[20px] tracking-[0.15px] text-primary-8 duration-300 md:text-[19px] md:font-[700]  md:leading-[24px]`}
            >
              buildCAP
            </h4>
          </div>

          <div className='flex items-center'>
            <Menu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNav;

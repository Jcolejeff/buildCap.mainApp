import CONSTANTS from 'constant';
import useCheckTypeOfUser from 'hooks/business-logic/useCheckTypeOfUser';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'store';
import { ItitleLinks, userTypes, routePathTypes } from 'types';
import Icon from 'utils/Icon';

type ISideNavTitles =
  | 'Customize Avatar'
  | 'View Pages'
  | 'Deploy Assistant'
  | 'Assistant Settings'
  | 'Assets and Templates'
  | 'CV Profile'
  | 'Consultancy'
  | 'Advertise a Service'
  | 'Online Training'
  | 'Master Classes'
  | 'Bi-annual Bootcamps'
  | 'Settings'
  | 'Users'
  | 'Payment Plans'
  | 'Projects'
  | 'Subcontractor Management';

interface extendedRouteInterface extends ItitleLinks<ISideNavTitles, routePathTypes> {
  icons: JSX.Element;
  userType: userTypes;
}

interface ISideNavLinks {
  discussions: extendedRouteInterface[];
  features: extendedRouteInterface[];
}

export const sideNavLinks: ISideNavLinks = {
  discussions: [
    {
      link: 'projects',
      title: 'Projects',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='fileIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['projects'],
    },
    {
      link: 'subcontractor-management',
      title: 'Subcontractor Management',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='fileIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-management'],
    },

    {
      link: 'payment-plans',
      title: 'Payment Plans',
      icons: (
        <Icon
          name='gForumIcon'
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['payment-plans'],
    },

    {
      link: 'users-list',
      title: 'Users',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='pForumIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['users-list'],
    },
  ],
  features: [
    {
      link: 'settings',
      title: 'Settings',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='btsIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['settings'],
    },

    // {
    //   link: 'cv-profile',
    //   title: 'CV Profile',
    //   icons: (
    //     <Icon
    //       svgProp={{
    //         width: 22.75,
    //         height: 22.75,
    //         className: 'text-current',
    //       }}
    //       name='cvIcon'
    //     />
    //   ),
    // },
  ],
};

const SideNav = () => {
  const [navOpen, setNavOpen] = useState(true);
  const currentTypeOfUser = useStore((state) => state.typeOfUser);
  const navigate = useNavigate();

  const { isAllowed } = useCheckTypeOfUser({ currentTypeOfUser: currentTypeOfUser });

  const location = useLocation();

  return (
    <div
      className={`sticky bottom-0 top-0 ${
        navOpen ? ` w-[280px]` : `w-[86px]`
      } relative flex h-full flex-col py-[1.65rem] shadow-3 transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className='absolute -right-[11px] top-[2rem] z-10 h-[15px] w-[22px] rounded-[5px] bg-primary-1 ring-[7px] ring-primary-15'
      />
      <div className=' pb-[2.5rem]'>
        <div
          // onClick={() => navigate(`/`)}
          className='flex cursor-pointer items-center gap-[0.625rem] px-[2rem]'
        >
          <div className='flex  items-center gap-2'>
            <img src='/fav.png' alt='' className='w-[10px} md:w-[25px]' />
            <h4
              className={`text-[16px] font-[900] leading-[20px] tracking-[0.15px] text-primary-8 md:text-[19px] md:font-[900] md:leading-[24px] ${
                navOpen ? `opacity-100` : `scale-0 opacity-0`
              }  duration-300`}
            >
              buildCAP
            </h4>
          </div>
        </div>
      </div>
      <div className='no-scrollbar flex flex-grow flex-col gap-[1.125rem] overflow-y-auto overflow-x-hidden'>
        <div className='px-4 '>
          <div
            onClick={() => navigate(`/mc/${CONSTANTS.ROUTES['overview']}`)}
            className={`flex items-center gap-[0.625rem] px-4 py-[0.625rem] hover:bg-primary-light 
            ${
              isAllowed(`maincontractor`) ? `text-secondary-9` : `text-secondary-13`
            } hover:text-primary-1 ${
              location?.pathname === `/mc/${CONSTANTS.ROUTES['overview']}`
                ? `bg-primary-1 !text-white/95`
                : ``
            }
            group cursor-pointer rounded-[6px] transition duration-300 ease-in-out`}
          >
            <div className='flex items-center'>
              {!isAllowed(`maincontractor`) ? (
                <Icon
                  svgProp={{
                    width: 22.75,
                    height: 22.75,
                  }}
                  name='padLock'
                />
              ) : (
                <Icon
                  name='dashboardIcon'
                  svgProp={{
                    width: 22.75,
                    height: 22.75,
                  }}
                />
              )}
            </div>
            <h6
              className={`text-[14px] font-[400] leading-[24px] tracking-[0.15px] 
          ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
          duration-300`}
            >
              Overview
            </h6>
          </div>
        </div>
        <div
          className={`relative my-10 h-[1px] w-full bg-gray-200   ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        >
          <div className='absolute left-0 top-1/3 mb-6 w-4 border border-action-disabledBg' />
          <div className='mt-6 px-8 text-[12px] font-[400] leading-[14px] tracking-[0.4px] text-gray-400'>
            {`Dashboards`?.toUpperCase()}
          </div>
        </div>

        <div className='mb-[1.125rem] flex flex-col'>
          {sideNavLinks['discussions']
            ?.filter((item, index) => isAllowed(item?.userType))
            ?.map((i, idx) => (
              <div className='px-4' key={idx}>
                <div
                  onClick={() => navigate(`/mc/${i?.link}`)}
                  className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.625rem] text-secondary-9
               hover:bg-primary-light 
                ${location?.pathname === `/mc/${i?.link}` ? `!bg-primary-1 !text-white/95` : ``}
                group
                transition duration-300 ease-in-out hover:text-primary-1`}
                >
                  <div className='flex items-center'>{i?.icons}</div>
                  <h6
                    className={`whitespace-nowrap text-[14px] font-[400] leading-[24px]  tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                  >
                    {i?.title}
                  </h6>
                </div>
              </div>
            ))}
        </div>
        <div
          className={`relative h-[1px] w-full bg-gray-200   ${
            navOpen ? `opacity-100` : `opacity-0`
          } transition-opacity duration-300`}
        ></div>
        <div className='mb-[1.125rem] flex  flex-col'>
          {sideNavLinks['features']?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/mc/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-[6px] px-4 py-[0.625rem] text-secondary-9
            hover:bg-primary-light 
                ${location?.pathname === `/mc/${i?.link}` ? `bg-primary-1 !text-white/95` : ``}
                group
                transition duration-300 ease-in-out hover:text-primary-1`}
              >
                <div className='flex items-center'>{i?.icons}</div>
                <h6
                  className={`whitespace-nowrap text-[14px] font-[400] leading-[24px]   tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-300`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div>

        {/* <div className='w-full px-4 '>
          <div
            className={`group h-[60px] w-full  cursor-pointer rounded-[8px] bg-primary-1 px-3 text-white transition duration-300`}
          >
            <ManageSubscriptions
              triggerClassName='w-full h-full'
              trigger={
                <div className='flex h-full w-full items-center gap-[0.8rem]'>
                  <div className='flex items-center'>{planTokens[currentTypeOfUser]?.icon}</div>
                  <h6
                    className={`whitespace-nowrap text-[16px] font-[600] leading-[24px] tracking-[0.15px] ${
                      navOpen ? `opacity-100` : `scale-0 opacity-0`
                    } duration-300`}
                  >
                    {planTokens[currentTypeOfUser]?.name}
                  </h6>
                </div>
              }
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SideNav;

import CONSTANTS from 'constant';
import useCheckTypeOfUser from 'hooks/business-logic/useCheckTypeOfUser';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'store';
import { ItitleLinks, userTypes, routePathTypes } from 'types';
import Icon from 'utils/Icon';

type ISideNavTitles =
  | 'Settings'
  | 'Users'
  | 'Payment Plans'
  | 'Projects'
  | 'Subcontractor Management'
  | 'Contract Financials'
  | 'Project Management'
  | 'Material Financing'
  | 'Financial Overview'
  | 'Supplier Invoices'
  | 'Documentation'
  | 'Notifications and Alerts'
  | 'Invoice Management'
  | 'Payment Status'
  | 'Orders';

interface extendedRouteInterface extends ItitleLinks<ISideNavTitles, routePathTypes> {
  icons: JSX.Element;
  userType: userTypes;
}

interface ISideNavLinks {
  admin?: extendedRouteInterface[];
  supplier: extendedRouteInterface[];
  subcontractor: extendedRouteInterface[];
  maincontractor: extendedRouteInterface[];
}

export const sideNavLinks: ISideNavLinks = {
  maincontractor: [
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
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-management'],
    },
    {
      link: 'contract-financials',
      title: 'Contract Financials',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['contract-financials'],
    },
  ],
  subcontractor: [
    {
      link: 'project-management',
      title: 'Project Management',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['project-management'],
    },
    {
      link: 'material-financing',
      title: 'Material Financing',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['material-financing'],
    },
    {
      link: 'subcontractor-financial-overview',
      title: 'Financial Overview',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-financial-overview'],
    },
    {
      link: 'subcontractor-invoices',
      title: 'Supplier Invoices',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-invoices'],
    },
    {
      link: 'documentation',
      title: 'Documentation',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['documentation'],
    },
    {
      link: 'subcontractor-notifications',
      title: 'Notifications and Alerts',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-notifications'],
    },
  ],
  supplier: [
    {
      link: 'invoice-management',
      title: 'Invoice Management',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['invoice-management'],
    },

    {
      link: 'payment-status',
      title: 'Payment Status',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['payment-status'],
    },
    {
      link: 'orders',
      title: 'Orders',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='BriefCase'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['orders'],
    },
    {
      link: 'supplier-financial-overview',
      title: 'Financial Overview',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['supplier-financial-overview'],
    },

    {
      link: 'subcontractor-notifications',
      title: 'Notifications and Alerts',
      icons: (
        <Icon
          svgProp={{
            width: 22.75,
            height: 22.75,
            className: 'text-current',
          }}
          name='DollarIcon'
        />
      ),
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['subcontractor-notifications'],
    },
    {
      link: 'supplier-notifications',
      title: 'Notifications and Alerts',
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
      userType: CONSTANTS.USER_PAGES_PERMISSIONS['supplier-notifications'],
    },
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
  ],
};

const SideNav = () => {
  const [navOpen, setNavOpen] = useState(true);
  const currentTypeOfUser = useStore((state) => state.typeOfUser);
  const navigate = useNavigate();

  const { isAllowed } = useCheckTypeOfUser({ currentTypeOfUser: currentTypeOfUser });

  const location = useLocation();
  const overviewLink = `${currentTypeOfUser}-overview`;

  return (
    <div
      className={`sticky bottom-0 top-0 ${
        navOpen ? ` w-[280px]` : `w-[86px]`
      } relative flex h-full flex-col py-[1.65rem] shadow-3 transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className='absolute -right-[11px] top-[2rem] z-10 h-[15px] w-[22px] rounded-[5px] bg-primary-1 ring-[7px] ring-primary-13/60'
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
      <div className='no-scrollbar flex flex-grow flex-col gap-[0.425rem] overflow-y-auto overflow-x-hidden'>
        <div className='px-4 '>
          <div
            onClick={() =>
              navigate(`/${CONSTANTS.USER_ROUTES_PREFIX[currentTypeOfUser]}/${overviewLink}`)
            }
            className={`flex items-center gap-[0.625rem] px-4 py-[0.625rem] hover:bg-primary-light 
           
            
            hover:text-primary-1 ${
              location?.pathname ===
              `/${CONSTANTS.USER_ROUTES_PREFIX[currentTypeOfUser]}/${overviewLink}`
                ? `bg-primary-1 !text-white/95`
                : ``
            }
            group cursor-pointer rounded-2xl transition-all duration-150 ease-linear`}
          >
            <div className='flex items-center'>
              <Icon
                name='dashboardIcon'
                svgProp={{
                  width: 22.75,
                  height: 22.75,
                }}
              />
            </div>
            <h6
              className={`text-[14px] font-[400] leading-[24px] tracking-[0.15px] 
          ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
          duration-150`}
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
          {sideNavLinks[currentTypeOfUser]
            ?.filter((item, index) => isAllowed(item?.userType))
            ?.map((i, idx) => (
              <div className='px-4' key={idx}>
                <div
                  onClick={() =>
                    navigate(`/${CONSTANTS.USER_ROUTES_PREFIX[currentTypeOfUser]}/${i?.link}`)
                  }
                  className={`flex cursor-pointer items-center gap-[0.625rem] rounded-2xl px-4 py-[0.625rem] text-secondary-9
               hover:bg-primary-light 
                ${
                  location?.pathname ===
                  `/${CONSTANTS.USER_ROUTES_PREFIX[currentTypeOfUser]}/${i?.link}`
                    ? `!bg-primary-1 !text-white/95`
                    : ``
                }
                group
             transition-all duration-150 ease-linear hover:text-primary-1`}
                >
                  <div className='flex items-center'>{i?.icons}</div>
                  <h6
                    className={`whitespace-nowrap text-[14px] font-[400] leading-[24px]  tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-150`}
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
        {/* <div className='mb-[1.125rem] flex  flex-col'>
          {sideNavLinks['supplier']?.map((i, idx) => (
            <div className='px-4' key={idx}>
              <div
                onClick={() => navigate(`/mc/${i?.link}`)}
                className={`flex cursor-pointer items-center gap-[0.625rem] rounded-2xl px-4 py-[0.625rem] text-secondary-9
            hover:bg-primary-light 
                ${location?.pathname === `/mc/${i?.link}` ? `bg-primary-1 !text-white/95` : ``}
                group
                transition-all duration-150 ease-linear hover:text-primary-1`}
              >
                <div className='flex items-center'>{i?.icons}</div>
                <h6
                  className={`whitespace-nowrap text-[14px] font-[400] leading-[24px]   tracking-[0.15px]
              ${navOpen ? `opacity-100` : `scale-0 opacity-0`}
              duration-150`}
                >
                  {i?.title}
                </h6>
              </div>
            </div>
          ))}
        </div> */}

        <div
          className={`' mt-6 w-full px-4 ${
            navOpen ? `opacity-100` : `scale-0 opacity-0`
          } transition-all duration-300 ease-linear`}
        >
          <div
            className={`group  w-full  cursor-pointer rounded-[8px] bg-green-200/70 p-3  shadow-6 transition duration-150`}
          >
            <div className='flex h-full w-full flex-col items-center '>
              <div className='flex items-center text-sm'>Need help?</div>
              <h6
                className={`whitespace-nowrap text-[11px] font-[600] leading-[24px] tracking-[0.15px] underline ${
                  navOpen ? `opacity-100` : `scale-0 opacity-0`
                } duration-300`}
              >
                Contact us
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

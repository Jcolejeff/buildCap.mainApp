import CONSTANTS from 'constant';

import { ItitleLinks, userTypes, routePathTypes } from 'types';
import Icon from 'utils/Icon';

type ISideNavTitles =
  | 'Settings'
  | 'Users'
  | 'Payment Plans'
  | 'Projects'
  | 'Subcontractor Management'
  | 'Contract Financials';

interface extendedRouteInterface extends ItitleLinks<ISideNavTitles, routePathTypes> {
  icons: JSX.Element;
  userType: userTypes;
}

interface ISideNavLinks {
  discussions: extendedRouteInterface[];
  features: extendedRouteInterface[];
}
const sideNavLink: ISideNavLinks = {
  discussions: [
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

export default sideNavLink;

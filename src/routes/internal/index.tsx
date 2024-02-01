import CONSTANTS from 'constant';
import Projects from 'pages/app/subcontractor/projects';
import PaymentPlans from 'pages/app/subcontractor/payment-plans';
import UserList from 'pages/app/subcontractor/user-list';
import Profile from 'pages/app/subcontractor/user-profile';
import AccountSettings from 'pages/app/subcontractor/account-settings';
import SingleAssistantPage from 'pages/inner-pages/single-assistant-page';
import Dashboard from 'pages/app/subcontractor/dashboard';
import SingleWorkflowPage from 'pages/inner-pages/single-workflow';

import { routeTypes, routesInterface } from 'types';
import MainContractorOverview from 'pages/app/maincontractor/overview';

const internalRoute: routeTypes = [
  // {
  //   element: <Dashboard />,
  //   path: '',
  // },
  {
    element: <Dashboard />,
    path: 'dashboard',
  },
  {
    element: <Projects />,
    path: 'projects',
  },

  {
    element: <PaymentPlans />,
    path: 'payment-plans',
  },

  {
    element: <UserList />,
    path: 'users-list',
  },

  {
    element: <Profile />,
    path: 'profile',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
  },
];

export const maincontractorRoutes: routeTypes = [
  {
    element: <Projects />,
    path: 'subcontractor-management',
  },
  {
    element: <Projects />,
    path: 'projects',
  },

  {
    element: <PaymentPlans />,
    path: 'payment-plans',
  },

  {
    element: <MainContractorOverview />,
    path: 'overview',
  },

  {
    element: <Dashboard />,
    path: 'dashboard',
  },
  {
    element: <Profile />,
    path: 'profile',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
  },
];
export const subcontractorRoutes: routeTypes = [
  {
    element: <Projects />,
    path: 'projects',
  },

  {
    element: <PaymentPlans />,
    path: 'payment-plans',
  },

  {
    element: <UserList />,
    path: 'users-list',
  },

  {
    element: <Dashboard />,
    path: 'dashboard',
  },
  {
    element: <Profile />,
    path: 'profile',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
  },
];

export const supplierRoutes: routeTypes = [
  {
    element: <Projects />,
    path: 'projects',
  },

  {
    element: <PaymentPlans />,
    path: 'payment-plans',
  },

  {
    element: <UserList />,
    path: 'users-list',
  },

  {
    element: <Dashboard />,
    path: 'dashboard',
  },
  {
    element: <Profile />,
    path: 'profile',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
  },
];
export const adminRoutes: routeTypes = [
  {
    element: <Dashboard />,
    path: 'dashboard',
  },
  {
    element: <Profile />,
    path: 'profile',
  },
  {
    element: <AccountSettings />,
    path: 'settings',
  },
];

export const innerInternalRoutes: routesInterface<string>[] = [
  {
    element: <SingleWorkflowPage />,
    path: `${CONSTANTS.ROUTES['payment-plans']}/workflow/:workflowId`,
  },
  { element: <SingleAssistantPage />, path: `${CONSTANTS.ROUTES['payment-plans']}/:pageId` },
];

export default internalRoute;

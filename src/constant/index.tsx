import { userTypes, routePathTypes } from 'types';

const ROUTES: Record<routePathTypes, routePathTypes> = {
  '': '',
  'create-account': 'create-account',
  'cv-profile': 'cv-profile',
  'payment-plans': 'payment-plans',
  'users-list': 'users-list',
  dashboard: 'dashboard',
  login: 'login',
  logout: 'logout',
  profile: 'profile',
  settings: 'settings',
  'new-password': 'new-password',
  'reset-password': 'reset-password',
  'forgot-password': 'forgot-password',
  'verify-email': 'verify-email',
  'create-assistant': 'create-assistant',
  'my-assistants': 'my-assistants',
  projects: 'projects',
  'subcontractor-management': 'subcontractor-management',
  overview: 'overview',
};

const USER_PAGES_PERMISSIONS: Record<routePathTypes, userTypes> = {
  '': 'admin',
  'create-account': 'admin',
  'cv-profile': 'admin',
  'payment-plans': 'admin',
  'users-list': 'supplier',
  dashboard: 'admin',
  login: 'admin',
  logout: 'admin',
  profile: 'admin',
  settings: 'admin',
  'new-password': 'admin',
  'reset-password': 'admin',
  'forgot-password': 'admin',
  'verify-email': 'admin',
  'create-assistant': 'admin',
  'my-assistants': 'admin',
  projects: 'maincontractor',
  'subcontractor-management': 'maincontractor',
  overview: 'maincontractor',
};

const TIMBU_KEYS = {
  BTS_ID: 'a3b42063504f4372ac9a1a6bd0f46d85',
  BLOG_ID: '696dccd73fb242448c41704b5179698f',
  IMAGE_BASE_URL: 'https://images.timbu.com',
};

const CONSTANTS = { ROUTES, TIMBU_KEYS, USER_PAGES_PERMISSIONS };

export default CONSTANTS;

import CONSTANTS from 'constant';
import Profile from 'pages/app/subcontractor/user-profile';
import AccountSettings from 'pages/app/subcontractor/account-settings';
import SingleAssistantPage from 'pages/inner-pages/single-assistant-page';
import Dashboard from 'pages/app/subcontractor/dashboard';
import SingleWorkflowPage from 'pages/inner-pages/single-workflow';
import SubcontractorManagement from 'pages/app/maincontractor/subcontractorManagement';
import { routeTypes, routesInterface } from 'types';
import MainContractorOverview from 'pages/app/maincontractor/overview';
import MainContractorContractorFinancial from 'pages/app/maincontractor/contractFinancials';
import CreateProject from 'pages/app/maincontractor/createProject';
import SubcontractorOverview from 'pages/app/subcontractor/subcontractorOverview';
import ProjectManagement from 'pages/app/subcontractor/projectManagement';
import SubcontractorFinancialOverview from 'pages/app/subcontractor/financialOverview';
import MaterialFinancing from 'pages/app/subcontractor/materialFinancing';
import SubcontractorDocumentation from 'pages/app/subcontractor/documentations';
import SubcontractorNotifications from 'pages/app/subcontractor/subcontractorNotifications';
import SubcontractorInvoices from 'pages/app/subcontractor/subcontractorInvoices';
import SupplierOverview from 'pages/app/supplier/supplierOverview';
import SupplierFinancialOverview from 'pages/app/supplier/supplierFinancialOverview';
import Orders from 'pages/app/supplier/orders';
import SupplierNotifications from 'pages/app/supplier/supplierNotifications';
import PaymentStatus from 'pages/app/supplier/paymentStatus';
import InvoiceManagement from 'pages/app/supplier/InvoiceManagement';

const internalRoute: routeTypes = [
  // {
  //   element: <Dashboard />,
  //   path: '',
  // },
  // {
  //   element: <Dashboard />,
  //   path: 'dashboard',
  // },

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
    element: <SubcontractorManagement />,
    path: 'subcontractor-management',
  },
  {
    element: <MainContractorContractorFinancial />,
    path: 'contract-financials',
  },

  {
    element: <MainContractorOverview />,
    path: 'maincontractor-overview',
  },
  {
    element: <CreateProject />,
    path: 'create-project',
  },

  // {
  //   element: <Dashboard />,
  //   path: 'dashboard',
  // },
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
    element: <SubcontractorOverview />,
    path: 'subcontractor-overview',
  },
  {
    element: <ProjectManagement />,
    path: 'project-management',
  },

  {
    element: <SubcontractorFinancialOverview />,
    path: 'subcontractor-financial-overview',
  },

  {
    element: <MaterialFinancing />,
    path: 'material-financing',
  },
  {
    element: <SubcontractorDocumentation />,
    path: 'documentation',
  },
  {
    element: <SubcontractorNotifications />,
    path: 'subcontractor-notifications',
  },
  {
    element: <SubcontractorInvoices />,
    path: 'subcontractor-invoices',
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
    element: <SupplierOverview />,
    path: 'supplier-overview',
  },
  {
    element: <SupplierFinancialOverview />,
    path: 'supplier-financial-overview',
  },
  {
    element: <Orders />,
    path: 'orders',
  },
  {
    element: <SupplierNotifications />,
    path: 'supplier-notifications',
  },
  {
    element: <PaymentStatus />,
    path: 'payment-status',
  },
  {
    element: <InvoiceManagement />,
    path: 'invoice-management',
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

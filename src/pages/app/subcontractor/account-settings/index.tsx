import Account from 'pages/app/subcontractor/account-settings/Account';
import BillingAndPlan from './BillingAndPlan';
import Connections from './Connections';
import Notification from './Notification';
import Security from './Security';
import { useState } from 'react';
import Icon from 'utils/Icon';

type filterTypes = 'ACCOUNT' | 'SECURITY' | 'BILLINGS AND PLANS' | 'NOTIFICATION';

interface Filter {
  name: filterTypes;
  icon: JSX.Element;
}
const settingsFilters: Filter[] = [
  { name: 'ACCOUNT', icon: <Icon name='profileIcon' /> },
  { name: 'SECURITY', icon: <Icon name='padLockV2' /> },
  { name: 'BILLINGS AND PLANS', icon: <Icon name='fileIcon' /> },
  { name: 'NOTIFICATION', icon: <Icon name='notificationIcon' svgProp={{ className: 'w-6' }} /> },
];

interface Tabs {
  title: filterTypes;
}

const DisplayTab = ({ title }: Tabs) => {
  const components: Record<filterTypes, JSX.Element> = {
    ACCOUNT: <Account />,
    SECURITY: <Security />,
    'BILLINGS AND PLANS': <BillingAndPlan />,
    NOTIFICATION: <Notification />,
  };

  return components[title];
};

const AccountSettings = () => {
  const [currFilter, setCurrFilter] = useState<filterTypes>('ACCOUNT');

  return (
    <div className='container flex h-full w-full flex-col overflow-auto px-container-base py-[1.875rem]'>
      {/* to be refactored */}
      <div className='relative grid w-full'>
        <div className='grid max-w-full justify-start'>
          <div className='no-scrollbar flex w-full overflow-auto whitespace-nowrap'>
            {settingsFilters?.map((i, idx) => (
              <button
                key={idx}
                className={`${
                  i?.name === currFilter
                    ? `bg-primary-1 text-white`
                    : `bg-transparent text-secondary-2 hover:text-primary-1`
                } flex h-[1.8rem] w-max items-center rounded-[5px]  px-4 transition-all ease-in-out lg:h-[2.5rem] lg:px-[1.5rem] `}
                onClick={() => setCurrFilter(i?.name)}
              >
                <span className='mr-2'>{i?.icon}</span>
                <span className='mt-[3px] whitespace-nowrap text-[13px] leading-3 tracking-[0.15px] md:mt-0 lg:text-[12.5px]'>
                  {i?.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* ... */}

        <div className='mt-7'>
          <DisplayTab title={currFilter} />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

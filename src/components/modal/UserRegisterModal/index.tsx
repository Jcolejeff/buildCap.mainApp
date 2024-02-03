import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';
import { Tabs, TabsList, TabsTrigger } from 'components/shadcn/ui/tabs';
import Icon from 'utils/Icon';
import UserInfoTab from './UserInfoTab';
import { useState } from 'react';
import CompanyInfoTab from './CompanyInfoTab';
import PasswordTab from './PasswordTab';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const UserRegistrationForms = () => {
  const [showForms, setShowForms] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('PersonalInfo');
  const [completed, setCompleted] = useState<string[]>([]);
  const [data] = useState<string[]>(['PersonalInfo', 'CompanyInfo', 'Password'] as any);
  const [iconList] = useState(['stepMarkChecked', 'stepMarkFalse', 'stepMarkEmpty'] as any);
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };
  const handleComplete = (tab: string) => {
    setCompleted([...completed, tab]);
  };
  const checkIcon = (tab: string) => {
    if (tab === activeTab) {
      return iconList[2];
    }
    if (completed.includes(tab)) {
      return iconList[0];
    } else {
      return iconList[1];
    }
  };

  return (
    <section className='relative z-50 mb-12 max-w-full  rounded-xl bg-white  px-6 py-8  sm:w-[90vw] md:!max-w-[1000px] lg:px-[2rem] lg:py-[3.5rem] xxl:!max-w-[1350px]'>
      <div className=' w-full gap-[0.87rem]'>
        <Tabs defaultValue='PersonalInfo' value={activeTab} className=''>
          <TabsList className='my-4 hidden w-full justify-around   bg-white lg:flex  '>
            {/* tab 1 */}
            <TabsTrigger
              value={data[0]}
              onClick={() => switchTab(data[0])}
              className='items-center gap-1 rounded-lg'
            >
              <Icon
                name={checkIcon(data[0])}
                svgProp={{
                  className:
                    'mr-2 self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <h3 className='text-sm'>01.</h3>
              <h3 className='text-sm'>Personal Info</h3>
            </TabsTrigger>
            <Icon
              name='connector'
              svgProp={{
                className: `${
                  completed.includes('PersonalInfo') ? 'text-primary-1' : 'text-gray-200'
                } rounded-2xl px-1  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100`,
              }}
            />

            {/* tab 2 */}
            <TabsTrigger
              onClick={() => switchTab(data[1])}
              value={data[1]}
              disabled={completed.includes(data[1]) ? false : activeTab === data[1] ? false : true}
              className='items-start gap-1 rounded-lg'
            >
              <Icon
                name={checkIcon(data[1])}
                svgProp={{
                  className:
                    'mr-2 self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <h3 className='text-sm'>02.</h3>
              <h3 className='text-sm'>Company Info</h3>
            </TabsTrigger>
            <Icon
              name='connector'
              svgProp={{
                className: `${
                  completed.includes('CompanyInfo') ? 'text-primary-1' : 'text-gray-200'
                } rounded-2xl px-1  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100`,
              }}
            />
            {/* tab 3 */}
            <TabsTrigger
              onClick={() => switchTab(data[2])}
              disabled={completed.includes(data[2]) ? false : activeTab === data[2] ? false : true}
              value={data[2]}
              className='items-start gap-1 rounded-lg'
            >
              <Icon
                name={checkIcon(data[2])}
                svgProp={{
                  className:
                    'mr-2 self-center fill-black w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <h3 className='text-sm'>03.</h3>
              <h3 className='text-sm'>Password</h3>
            </TabsTrigger>
          </TabsList>

          <UserInfoTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
          <CompanyInfoTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
          <PasswordTab
            switchTab={switchTab}
            data={data}
            setModalOpen={setModalOpen}
            handleComplete={handleComplete}
            setCompleted={setCompleted}
          />
        </Tabs>
      </div>
    </section>
  );
};

export default UserRegistrationForms;

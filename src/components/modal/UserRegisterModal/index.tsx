import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';
import { Tabs, TabsList, TabsTrigger } from 'components/shadcn/ui/tabs';
import Icon from 'utils/Icon';
import InformationTab from './InformationTab';
import { useState } from 'react';
import ResumeTab from './ResumeTab';
import ExperiencesTab from './ExperiencesTab';
import EducationTab from './EducationTab';
import ProjectsTab from './ProjectsTab';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const MainUserAddInfoModal = ({ trigger, triggerClassName }: Iprop) => {
  const [showForms, setShowForms] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Information');
  const [completed, setCompleted] = useState<string[]>([]);
  const [data] = useState<string[]>([
    'Information',
    'Resume',
    'Experiences',
    'Education',
    'Projects',
  ]);
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
  if (!showForms) {
    return (
      <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
        <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
        <DialogContent className='no-scrollbar h-screen max-w-full overflow-auto  overflow-x-hidden bg-white  px-6 sm:w-[70vw] md:h-[92vh] md:!max-w-[1200px] lg:px-[2rem] lg:pt-[1.5rem]'>
          <div className=' flex w-full flex-col items-center justify-center gap-6 '>
            <div></div>
            <Icon name='noCvProfileIcon' svgProp={{ className: 'w-[50%] md:w-[90%]' }} />
            <h2 className='max-w-md text-center text-xl font-semibold'>
              Would you like to take a moment to create a custom CV profile?
            </h2>
            <h3 className='max-w-lg text-center text-sm text-gray-500'>
              This would help you be easily discoverable to other filmmakers for networking or
              project purposes!
            </h3>
            <div className='flex  w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                type='button'
                className='group flex w-max items-center justify-center gap-2 rounded-[6px] border border-primary-1 bg-white px-3 py-2 shadow-9 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='whitespace-nowrap text-xs font-[500] leading-[24px]   tracking-[0.4px]'>
                  No, I’ll create it later
                </span>
              </button>
              <button
                onClick={() => setShowForms(true)}
                type='button'
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-10 py-2 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='text-xs font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                  Yes Continue
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='h-screen max-w-full overflow-auto overflow-x-hidden bg-white  px-6 sm:w-[90vw] md:h-[92vh] md:!max-w-[1200px] lg:px-[2rem] lg:pt-[1.5rem]'>
        <div className=' w-full gap-[0.87rem]'>
          <Tabs defaultValue='account' value={activeTab} className=''>
            <TabsList className='my-4 hidden w-full justify-around   bg-white lg:flex  '>
              <TabsTrigger
                value={data[0]}
                onClick={() => switchTab(data[0])}
                className='items-start gap-1 rounded-lg'
              >
                <Icon
                  name={checkIcon(data[0])}
                  svgProp={{
                    className:
                      ' self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <h3 className='text-3xl'>01</h3>
                <div className='flex flex-col items-start justify-start '>
                  <h3 className='text-sm'>Information</h3>
                  <h4 className='text-[0.65rem] text-gray-400'>Personal Info</h4>
                </div>
              </TabsTrigger>
              <Icon
                name='connector'
                svgProp={{
                  className:
                    '  rounded-2xl px-1  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <TabsTrigger
                value={data[1]}
                disabled={
                  completed.includes(data[1]) ? false : activeTab === data[1] ? false : true
                }
                onClick={() => switchTab(data[1])}
                className='items-start gap-1 rounded-lg'
              >
                <Icon
                  name={checkIcon(data[1])}
                  svgProp={{
                    className:
                      ' self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <h3 className='text-3xl'>02</h3>
                <div className='flex flex-col items-start justify-start '>
                  <h3 className='text-sm'>Resume</h3>
                  <h4 className='text-[0.65rem] text-gray-400'>Upload Resume</h4>
                </div>
              </TabsTrigger>
              <Icon
                name='connector'
                svgProp={{
                  className:
                    '  rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <TabsTrigger
                onClick={() => switchTab(data[2])}
                value={data[2]}
                disabled={
                  completed.includes(data[2]) ? false : activeTab === data[2] ? false : true
                }
                className='items-start gap-1 rounded-lg'
              >
                <Icon
                  name={checkIcon(data[2])}
                  svgProp={{
                    className:
                      ' self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <h3 className='text-3xl'>03</h3>
                <div className='flex flex-col items-start justify-start '>
                  <h3 className='text-sm'>Experiences</h3>

                  <h4 className='text-[0.65rem] text-gray-400'>Experiences</h4>
                </div>
              </TabsTrigger>
              <Icon
                name='connector'
                svgProp={{
                  className:
                    '  rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <TabsTrigger
                onClick={() => switchTab(data[3])}
                disabled={
                  completed.includes(data[3]) ? false : activeTab === data[3] ? false : true
                }
                value={data[3]}
                className='items-start gap-1 rounded-lg'
              >
                <Icon
                  name={checkIcon(data[3])}
                  svgProp={{
                    className:
                      ' self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <h3 className='text-3xl'>04</h3>
                <div className='flex flex-col items-start justify-start '>
                  <h3 className='text-sm'>Eduction</h3>

                  <h4 className='text-[0.65rem] text-gray-400'>Education Details</h4>
                </div>
              </TabsTrigger>
              <Icon
                name='connector'
                svgProp={{
                  className:
                    '  rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <TabsTrigger
                onClick={() => switchTab(data[4])}
                disabled={
                  completed.includes(data[4]) ? false : activeTab === data[4] ? false : true
                }
                value={data[4]}
                className='items-start gap-1 rounded-lg'
              >
                <Icon
                  name={checkIcon(data[4])}
                  svgProp={{
                    className:
                      ' self-center w-6 rounded-2xl px-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <h3 className='text-3xl'>05</h3>
                <div className='flex flex-col items-start justify-start '>
                  <h3 className='text-sm'>Projects</h3>
                  <h4 className='text-[0.65rem] text-gray-400'> Projects Details</h4>
                </div>
              </TabsTrigger>
            </TabsList>

            <InformationTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
            <ResumeTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
            <ExperiencesTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
            <EducationTab switchTab={switchTab} data={data} handleComplete={handleComplete} />
            <ProjectsTab
              switchTab={switchTab}
              data={data}
              setModalOpen={setModalOpen}
              handleComplete={handleComplete}
              setCompleted={setCompleted}
            />
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MainUserAddInfoModal;

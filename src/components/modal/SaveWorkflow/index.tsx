import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';

import { useState } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const SaveWorkflow = ({ trigger, triggerClassName, title }: Iprop) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className='no-scrollbar mt-4 w-fit max-w-full overflow-auto  overflow-x-hidden bg-white  px-6  md:!max-w-[1000px] lg:px-[6rem]'>
        <div className='flex w-full flex-col '>
          <div className='flex w-full flex-col items-center justify-center gap-[0.87rem] py-6'>
            <Icon name='saveIcon' svgProp={{ className: 'w-20 h-16 text-gray-500' }} />
            <p className='text-xl font-semibold'>Workflow Saved</p>
            <p className='text-gray-500'>You've successfully saved a workflow.</p>

            <button
              className='w-full rounded-md bg-primary-1 px-8 py-4 font-semibold text-white'
              onClick={() => navigate(-1)}
            >
              View saved workflows
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveWorkflow;

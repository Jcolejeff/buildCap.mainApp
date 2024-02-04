import { Dialog, DialogContent, DialogTrigger } from 'components/shadcn/dialog';

import { useState } from 'react';
import AddSubcontractorForm from './addSubcontractorForm';

interface Iprop {
  trigger: JSX.Element;
  triggerClassName?: string;
  title?: string;
}

const AddSubcontractorModal = ({ trigger, triggerClassName }: Iprop) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <Dialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className=' h-screen max-w-full overflow-auto  overflow-x-hidden bg-white  px-6 sm:w-[70vw] md:h-[92vh] md:!max-w-[1200px] lg:px-[2rem] lg:pt-[1.5rem]'>
        <AddSubcontractorForm setModalOpen={setModalOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcontractorModal;

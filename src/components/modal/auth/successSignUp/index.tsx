import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'components/shadcn/ui/alert-dialog';
import { Button } from 'components/shadcn/ui/button';
import { tr } from 'date-fns/locale';
import Icon from 'utils/Icon';
import { useState } from 'react';

interface Iprop {
  triggerClassName?: string;
  title?: string;
  btnText?: string;
  description?: string;
  action?: string;
  cancel?: string;
}

export default function SuccessfulSignUpModal({
  btnText,

  triggerClassName,
}: Iprop) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AlertDialog onOpenChange={(i) => setModalOpen(i)} open={modalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          className='flex w-full  items-center justify-start gap-2 border-0 p-0 px-2 capitalize text-red-500 disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => {
            setModalOpen(true);
            setTimeout(() => {
              console.log('delete');
            }, 500);
          }}
        >
          <Icon name='trash' svgProp={{ className: 'text-black' }}></Icon>
          click me
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader className='flex flex-col items-center'>
          <AlertDialogTitle className='text-center capitalize'>{btnText}</AlertDialogTitle>
          <AlertDialogDescription className='text-center text-gray-400'>
            Deleting this patient’s profile removes all the information for this patient completely
          </AlertDialogDescription>
          <AlertDialogDescription className='text-center font-semibold text-red-600'>
            This action can not be reversed!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='sm:justify-center'>
          <AlertDialogAction
            className='bg-red-600 capitalize'
            onClick={() => {
              setModalOpen(false);
              setTimeout(() => {
                console.log('cancel');
              }, 500);
            }}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className='md:px-8'>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

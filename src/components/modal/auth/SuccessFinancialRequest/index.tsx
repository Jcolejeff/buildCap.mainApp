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
import useStore from 'store';
import { useNavigate } from 'react-router-dom';

interface Iprop {
  triggerClassName?: string;
  title?: string;
  btnText?: string;
  description?: string;
  action?: string;
  cancel?: string;
}

export default function SuccessfulFinancialRequest({
  btnText,

  triggerClassName,
}: Iprop) {
  const navigate = useNavigate();
  const { setSuccessModalOpen, IsSuccessModalOpen } = useStore((state) => state);

  return (
    <AlertDialog onOpenChange={(i) => setSuccessModalOpen(i)} open={IsSuccessModalOpen}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader className='  flex flex-col items-center gap-6'>
          <AlertDialogTitle className='text-center capitalize'>{btnText}</AlertDialogTitle>
          <AlertDialogDescription className='text-center text-gray-400'>
            <Icon
              name='SuccessCheck'
              svgProp={{
                className:
                  '  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
              }}
            />
          </AlertDialogDescription>
          <AlertDialogDescription className='text-center text-lg font-semibold text-black'>
            Hello there!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogDescription className='mx-auto  max-w-xs text-center font-medium text-gray-800'>
          <p>
            Please note that payment processing is scheduled to occur within 48 hours of your
            request.
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter className='sm:justify-center'>
          <AlertDialogAction
            className='group flex w-fit items-center justify-center gap-1 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-16'
            onClick={() => {
              setSuccessModalOpen(false);
              setTimeout(() => {
                console.log('cancel');
              }, 500);
            }}
          >
            <span className='text-sm font-[600]  leading-[24px] tracking-[0.4px] text-white'>
              {`Okay`}
            </span>
          </AlertDialogAction>
          {/* <AlertDialogCancel className='md:px-8'>Cancel</AlertDialogCancel> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

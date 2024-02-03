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

export default function SuccessfulSignUpModal({
  btnText,

  triggerClassName,
}: Iprop) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setSuccessModalOpen, IsSuccessModalOpen } = useStore((state) => state);

  return (
    <AlertDialog onOpenChange={(i) => setSuccessModalOpen(i)} open={IsSuccessModalOpen}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader className='mb-6  flex flex-col items-center gap-6'>
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
            Your account is ready!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='sm:justify-center'>
          <AlertDialogAction
            className='group flex w-full items-center justify-center gap-1 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90'
            onClick={() => {
              navigate('/login');
              setSuccessModalOpen(false);
              setTimeout(() => {
                console.log('cancel');
              }, 500);
            }}
          >
            <span className='text-sm font-[600]  leading-[24px] tracking-[0.4px] text-white'>
              {`Sign in`}
            </span>
            <Icon
              name='arrowTo'
              svgProp={{
                className:
                  'text-white  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
              }}
            />
          </AlertDialogAction>
          {/* <AlertDialogCancel className='md:px-8'>Cancel</AlertDialogCancel> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

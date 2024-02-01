import { LazyLoadImage } from 'react-lazy-load-image-component';
import rocketBoy from 'assets/image/rocketBoy.png?format=webp&w=700&h=669.86&imagetools';
import loginIcon from 'assets/image/login.jpg?format=webp&w=700&h=669.86&imagetools';
import Icon from 'utils/Icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'components/shadcn/input';
import { Label } from 'components/shadcn/label';
import { Checkbox } from 'components/shadcn/checkbox';
import CONSTANTS from 'constant';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from 'components/shadcn/dialog';
import { useMutation } from '@tanstack/react-query';
import customerService from 'services/customer';
import { customerLoginFormInterface, customerLoginFormSchema } from './login.model';
import { processError } from 'helper/error';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputErrorWrapper from 'components/Hocs/InputError';
import BtnLoader from 'components/Hocs/BtnLoader';
import { authDetailsInterface } from 'types';
import useStore from 'store';
import API from 'services';
import UserRegistrationModal from 'components/modal/UserRegisterModal';

const Login = () => {
  const navigate = useNavigate();
  const [emailVerifiedOpen, setEmailVerifiedOpen] = useState(false);
  const { setAuthDetails, setLoggedIn } = useStore((store) => store);

  const [params] = useSearchParams();

  const email_verfied = params.get('email');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<customerLoginFormInterface>({
    resolver: zodResolver(customerLoginFormSchema),
    mode: 'all',
  });

  const { mutate, isLoading } = useMutation<authDetailsInterface, any, customerLoginFormInterface>({
    mutationFn: ({ email, password }) =>
      customerService.customerLogin({
        email,
        password,
      }),
    onSuccess: (data) => {
      setAuthDetails(data);
      setLoggedIn(true);
      navigate(`/${CONSTANTS.ROUTES['dashboard']}`);
    },
    onError: (err) => {
      processError(err);
    },
  });

  const onSubmit: SubmitHandler<customerLoginFormInterface> = (data) => {
    // mutate(data);
    navigate(`/${CONSTANTS.ROUTES['dashboard']}`);
  };

  useEffect(() => {
    if (email_verfied) {
      setEmailVerifiedOpen(true);
    }
  }, []);

  return (
    <div className='flex h-full w-full items-center'>
      <Dialog open={emailVerifiedOpen} onOpenChange={setEmailVerifiedOpen}>
        <DialogContent className='h-screen !max-w-[1120px] bg-white sm:h-max sm:w-[80vw] lg:w-[50vw]'>
          <div className='mx-auto flex h-full w-full flex-col gap-[1.5rem] pb-[5.31rem] pt-[6.56rem]  md:max-w-[30rem]'>
            <div
              className='mb-[2.125rem] flex cursor-pointer items-center'
              onClick={() => navigate(`/`)}
            >
              <Icon name='nfmLogo' svgProp={{ width: 40, height: 40 }} />
              <h4 className='whitespace-nowrap text-[22px] font-[700]   leading-[24px] tracking-[0.15px] text-primary-9/[0.87] md:text-[28px]'>
                Nollywood Filmmaker.com
              </h4>
            </div>
            <div className='mb-[1.5rem] flex w-full flex-col'>
              <h5 className='font-inter text-[24px] font-[700] leading-[32px] tracking-[0.18px] text-primary-9/[0.87]'>
                Email Verified ✉️
              </h5>
              <p className='leading-[24px] tracking-[0.15px] text-primary-9/[0.60]'>
                Your email hase been verified, you can now continue to login.
              </p>
            </div>
            <button
              onClick={() => setEmailVerifiedOpen(false)}
              className='mb-[1.75rem] w-full rounded-[8px] bg-primary-1 py-2 text-[15px] font-[500] text-white shadow-3 transition-opacity duration-300 ease-in-out hover:opacity-90'
            >
              <span className='leading-[0.46px]'>Continue</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <div className='hidden h-full w-1/2 basis-auto items-center justify-center overflow-hidden   bg-primary-15 md:flex'>
        <div className='relative h-full w-full overflow-hidden  transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-black/20 after:transition-all after:duration-300'>
          <LazyLoadImage
            className='h-full w-full bg-current object-cover'
            src={loginIcon}
            effect='blur'
            alt=' '
          />
        </div>
      </div>
      <div className='mx-auto w-1/2 bg-white px-4 md:px-[3rem]'>
        <UserRegistrationModal
          title='Add Categories'
          trigger={
            <button className=' group flex items-center  justify-center gap-2 rounded-[10px] border border-primary-1 bg-transparent px-2 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-3'>
              <span className='text-xs font-[400]  leading-[24px] tracking-[0.4px]'>
                Add Categories
              </span>
              <Icon
                name='plusIcon'
                svgProp={{
                  className:
                    'text-primary-1  w-4 font-light cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
            </button>
          }
        />
        <div className='mx-auto flex w-full flex-col items-start justify-center'>
          <div
            className='mb-[2.125rem] flex   cursor-pointer
             items-center gap-2'
            onClick={() => navigate(`/`)}
          >
            <Icon name='nfmLogo' svgProp={{ className: 'w-[80px] md:w-[120px]' }} />{' '}
          </div>
          <div className='mb-[1.5rem] flex w-full flex-col'>
            <p className='leading-[24px] tracking-[0.15px] text-primary-9/[0.60]'>
              Please login to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col items-start justify-center'
          >
            <div className='mb-[1.25rem] flex w-full flex-col gap-4'>
              <InputErrorWrapper error={errors?.email?.message}>
                <Input
                  {...register('email')}
                  className='w-full placeholder:text-primary-9/[0.38]'
                  placeholder='Email'
                />
              </InputErrorWrapper>
              <InputErrorWrapper error={errors?.password?.message}>
                <Input
                  {...register('password')}
                  className='w-full placeholder:text-primary-9/[0.38]'
                  placeholder='Password'
                />
              </InputErrorWrapper>
              <button
                onClick={() => navigate(`/${CONSTANTS.ROUTES['forgot-password']}`)}
                className='cursor-pointer place-self-end text-[14px] leading-[21px] tracking-[0.15px] text-primary-1 hover:underline'
              >
                Forgot Password?
              </button>
            </div>
            <div className='mb-[1.75rem] flex w-full items-center justify-start gap-[0.75rem]'>
              <Checkbox
                className='border-primary-9/[0.38] checked:!bg-primary-1 data-[state=checked]:bg-primary-1'
                id='Remember Me'
              />
              <Label
                htmlFor='Remember Me'
                className='text-[14px] leading-[21px] tracking-[0.15px] text-primary-9/[0.38]'
              >
                Remember Me
              </Label>
            </div>
            <button
              onClick={() => trigger()}
              className='mb-[1.75rem] w-full rounded-[8px] bg-primary-1 py-2 text-[15px] font-[500] text-white shadow-3 transition-opacity duration-300 ease-in-out hover:opacity-90'
            >
              <BtnLoader isLoading={isLoading}>
                <span className='leading-[0.46px]'>LOGIN</span>
              </BtnLoader>
            </button>
          </form>

          <p className='mx-auto mb-8 text-center leading-[24px] tracking-[0.15px] text-primary-9/[0.87]'>
            New here?{' '}
            <button
              className='cursor-pointer text-primary-1 hover:underline'
              onClick={() => navigate(`/${CONSTANTS.ROUTES['create-account']}`)}
            >
              {' '}
              Create an account{' '}
            </button>
          </p>
          {/* <div className='relative flex items-center w-full gap-2 mb-[2.5rem]'>
            <div className='flex-grow border-b border-b-primary-9/[0.12] mt-1' />
            <span className='eading-[24px] tracking-[0.15px] text-primary-9/[0.87]'>or</span>
            <div className='flex-grow border-b border-b-primary-9/[0.12] mt-1' />
          </div>
          <div className='w-full flex justify-center items-center gap-[1.5rem]'>
            <Icon name='facebook' />
            <Icon name='twitter' />
            <Icon name='google' />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

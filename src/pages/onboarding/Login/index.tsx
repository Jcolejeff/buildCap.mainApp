import { LazyLoadImage } from 'react-lazy-load-image-component';
import rocketBoy from 'assets/image/rocketBoy.png?format=webp&w=700&h=669.86&imagetools';
import loginIcon from 'assets/image/login.jpg?format=webp&w=700&h=669.86&imagetools';
import bgImg from 'assets/image/auth/bg.png';
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
import UserRegistrationModal from 'components/modal/AddSubcontractor';
import AuthNavBar from 'components/auth/Nav';
import { EyeOff, Eye } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [emailVerifiedOpen, setEmailVerifiedOpen] = useState(false);
  const { setAuthDetails, setLoggedIn, typeOfUser, setTypeOfUser } = useStore((store) => store);
  const [showPassword, setShowPassword] = useState(true);

  const [params] = useSearchParams();
  const overviewLink = `${typeOfUser}-overview`;

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
      navigate(`/${CONSTANTS.USER_ROUTES_PREFIX[typeOfUser]}/${overviewLink}`);
    },
    onError: (err) => {
      processError(err);
    },
  });

  const onSubmit: SubmitHandler<customerLoginFormInterface> = (data) => {
    // mutate(data);
    navigate(`/${CONSTANTS.USER_ROUTES_PREFIX[typeOfUser]}/${overviewLink}`);
  };

  useEffect(() => {
    if (email_verfied) {
      setEmailVerifiedOpen(true);
    }
  }, []);

  return (
    <div
      className='no-scrollbar flex h-full w-full flex-col items-center overflow-scroll '
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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

      <AuthNavBar page='login' />

      <section className='item-center xl:px-container-xl container flex h-full w-full max-w-[1700px] gap-24 bg-transparent px-container-base lg:px-container-lg'>
        {/* <UserRegistrationModal
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
          /> */}
        <div className=' flex w-full flex-col items-center justify-center text-white  md:w-4/12'>
          <div className='mb-[1.5rem] flex w-full flex-col'>
            <p className='font-medium leading-[24px] tracking-[0.15px]'>
              Please login to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col items-start justify-center'
          >
            <div className='my-5 w-full  space-y-3'>
              <p>
                Select the type of user<span className='text-red-500'>*</span>
              </p>
              <select
                className='w-full rounded-lg border border-white bg-secondary-11 text-white placeholder:text-white'
                onChange={(e) =>
                  setTypeOfUser(e.target.value as 'supplier' | 'subcontractor' | 'maincontractor')
                }
              >
                <option value='subcontractor' className='bg-black'>
                  Subcontractor
                </option>
                <option value='supplier' className=' bg-black'>
                  Supplier
                </option>
                <option value='maincontractor' className=' bg-black'>
                  Main Contractor
                </option>
              </select>
            </div>
            <div className='mb-[1.25rem] flex w-full flex-col gap-4'>
              <InputErrorWrapper error={errors?.email?.message}>
                <Input
                  {...register('email')}
                  className='w-full bg-secondary-11 text-white placeholder:text-white'
                  placeholder='Email'
                />
              </InputErrorWrapper>

              <InputErrorWrapper error={errors?.password?.message}>
                <div className='flex items-center gap-4 rounded-lg border bg-secondary-11   pr-4'>
                  <Input
                    {...register('password')}
                    className='w-full rounded-r-none  border-0 text-[0.8rem] text-white placeholder:text-[0.8rem]  placeholder:text-white focus-within:border-0 focus:border-0'
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                  ></Input>
                  {showPassword ? (
                    <button onClick={() => setShowPassword(false)} type='button'>
                      <EyeOff className='h-full  w-5 text-white/20' />
                    </button>
                  ) : (
                    <button onClick={() => setShowPassword(true)} type='button'>
                      <Eye className='h-full w-5 text-white/40' />
                    </button>
                  )}
                </div>
              </InputErrorWrapper>
              <button
                onClick={() => navigate(`/${CONSTANTS.ROUTES['forgot-password']}`)}
                className='cursor-pointer place-self-end text-[14px] leading-[21px] tracking-[0.15px] text-secondary-3 hover:underline'
              >
                Forgot Password?
              </button>
            </div>
            <div className='mb-[1.75rem] flex w-full items-center justify-start gap-[0.75rem]'>
              <Checkbox
                className='border-white/[0.38] checked:!bg-primary-1 data-[state=checked]:bg-primary-1'
                id='Remember Me'
              />
              <Label
                htmlFor='Remember Me'
                className='text-[14px] leading-[21px] tracking-[0.15px] text-white/[0.78]'
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

          <p className='mx-auto mb-8 text-center leading-[24px] tracking-[0.15px] text-white/[0.87]'>
            New here?{' '}
            <button
              className='cursor-pointer text-secondary-3 hover:underline'
              onClick={() => navigate(`/${CONSTANTS.ROUTES['create-account']}`)}
            >
              {' '}
              Create an account{' '}
            </button>
          </p>
        </div>

        <div className='hidden h-full w-1/2 basis-auto items-center justify-center overflow-hidden    md:flex'>
          <h3 className='text-center text-[3rem] font-bold leading-[3.3rem] text-white'>
            Empowering Suppliers and Sub-Contractors for Seamless Project Excellence
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Login;

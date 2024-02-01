import { LazyLoadImage } from 'react-lazy-load-image-component';
import rocketBoy from 'assets/image/rocketBoy.png?format=webp&w=700&h=669.86&imagetools';
import choice from 'assets/image/sign.jpg?ormat=webp&w=700&h=669.86&imagetools';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';
import { Input } from 'components/shadcn/input';
import { Label } from 'components/shadcn/label';
import { Checkbox } from 'components/shadcn/checkbox';
import CONSTANTS from 'constant';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormInterface, SignUpFormSchema } from './signUp.model';
import InputErrorWrapper from 'components/Hocs/InputError';
import { DevTool } from '@hookform/devtools';
import { useMutation } from '@tanstack/react-query';
import { processError } from 'helper/error';
import customerService from 'services/customer';
import BtnLoader from 'components/Hocs/BtnLoader';
import { customerLoginFormInterface } from '../Login/login.model';
import { authDetailsInterface } from 'types';
import useStore from 'store';
import API from 'services';

const SignUp = () => {
  const navigate = useNavigate();
  const { setAuthDetails, setLoggedIn, authDetails } = useStore((store) => store);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<SignUpFormInterface>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'all',
  });

  const { mutate, isLoading } = useMutation<authDetailsInterface, any, SignUpFormInterface>({
    mutationFn: ({ first_name, last_name, email, password }) =>
      customerService.createCustomer({
        first_name,
        last_name,
        email,
        organization_id: import.meta.env.VITE_TIMBU_ORG_ID,
        contact_infos: [
          {
            contact_data: `${email}`,
            contact_type: 'email',
          },
        ],
        password,
      }),
    onSuccess: (data, variables) => {
      doLoginAttempt({
        email: `${variables?.email}`,
        password: `${variables?.password}`,
      });
    },
    onError: (err) => {
      processError(err);
    },
  });

  const { mutate: doLoginAttempt, isLoading: isLoggingIn } = useMutation<
    any,
    any,
    customerLoginFormInterface
  >({
    mutationFn: (params) =>
      customerService.customerLogin({
        ...params,
      }),
    onSuccess: async (data) => {
      setLoggedIn(true);

      //create user organisation
      try {
        const res = await API.post(`/organisations`, {
          name: `${data?.data?.first_name} ${
            data?.data?.last_name + (Math.random() * 0.9).toString()
          }`,
          is_active: true,
        });
        const userData = { ...data, data: { ...data?.data, organisation_id: res.data?.data?.id } };
        console.log({ userData });

        setAuthDetails(userData);
        navigate(`/${CONSTANTS.ROUTES['dashboard']}`);
      } catch (error: any) {
        processError(error);
      }
    },
    onError: (err) => {
      processError(err);
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInterface> = (data) => {
    mutate(data);
  };

  return (
    <div className='flex h-full w-full items-center'>
      <div className='hidden h-full w-1/2 basis-auto items-center justify-center overflow-hidden   bg-primary-15 md:flex'>
        <div className='relative h-full w-full overflow-hidden  transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-black/20 after:transition-all after:duration-300'>
          <LazyLoadImage
            className='h-full w-full bg-current object-cover'
            src={choice}
            effect='blur'
            alt=' '
          />
        </div>
      </div>
      <div className=' mx-auto    w-1/2 bg-white px-4 md:px-[3rem]'>
        <div className='mx-auto flex w-full flex-col items-start justify-center  sm:mt-12'>
          <div
            className='mb-[2.125rem] flex   cursor-pointer
             items-center gap-2'
            onClick={() => navigate(`/`)}
          >
            <Icon name='nfmLogo' svgProp={{ className: 'w-[80px] md:w-[120px]' }} />{' '}
          </div>
          <div className='mb-[1.5rem] flex w-full flex-col'>
            <h5 className='font-inter text-[17px] font-[700] leading-[32px] tracking-[0.18px] text-primary-9/[0.87]'>
              Create an Account! 🚀
            </h5>
            <p className='leading-[24px] tracking-[0.15px] text-primary-9/[0.60]'>
              Make your buildCAP account to get started
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col items-start justify-center'
          >
            <div className='mb-[1.25rem] flex w-full flex-col gap-4'>
              <div className='items-center gap-4 md:flex'>
                <InputErrorWrapper error={errors?.first_name?.message}>
                  <Input
                    {...register('first_name')}
                    className='w-full placeholder:text-primary-9/[0.38]'
                    placeholder='First name'
                  />
                </InputErrorWrapper>
                <InputErrorWrapper error={errors?.last_name?.message}>
                  <Input
                    {...register('last_name')}
                    className='w-full placeholder:text-primary-9/[0.38]'
                    placeholder='Last name'
                  />
                </InputErrorWrapper>
              </div>
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
                  className='w-full !border-slate-200 !ring-0 placeholder:text-primary-9/[0.38]'
                  placeholder='Password'
                  type='password'
                />
              </InputErrorWrapper>
              {/* <Input className='w-full placeholder:text-primary-9/[0.38]' placeholder='Password' /> */}
            </div>
            <div className='mb-[1.75rem] flex w-full items-center justify-center gap-[0.75rem]'>
              <Checkbox
                className='border-primary-9/[0.38] checked:!bg-primary-1 checked:!text-white data-[state=checked]:bg-primary-1 data-[state=checked]:!text-white'
                id='Remember Me'
              />
              <Label
                htmlFor='Remember Me'
                className='text-[14px] leading-[21px] tracking-[0.15px] text-primary-9/[0.38]'
              >
                I agree to buildCAP{''}
                <span
                  // onClick={() => navigate(`/${CONSTANTS.ROUTES['privacy-policy']}`)}
                  className='cursor-pointer text-primary-1 hover:underline'
                >
                  {' '}
                  Privacy Policy
                </span>
              </Label>
            </div>
            <button
              disabled={isLoading || isLoggingIn}
              onClick={() => trigger()}
              type='submit'
              className='mb-[1.75rem] w-full rounded-[8px] bg-primary-1 py-2 text-[15px] font-[500] text-white shadow-3 transition-opacity duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
              disabled:hover:cursor-not-allowed disabled:hover:opacity-50'
            >
              <BtnLoader isLoading={isLoading || isLoggingIn}>
                <span className='leading-[0.46px]'>SIGN UP</span>
              </BtnLoader>
            </button>
          </form>
          <DevTool control={control} />
          <p className='mx-auto mb-8 text-center leading-[24px] tracking-[0.15px] text-primary-9/[0.87]'>
            Already have an account?
            <span
              className='cursor-pointer text-primary-1 hover:underline'
              onClick={() => navigate(`/${CONSTANTS.ROUTES['login']}`)}
            >
              {' '}
              Sign in instead
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

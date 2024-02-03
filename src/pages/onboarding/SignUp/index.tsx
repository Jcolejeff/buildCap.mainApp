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
import bgImg from 'assets/image/auth/bg.png';
import UserRegistrationForms from 'components/modal/UserRegisterModal';
import AuthNavBar from 'components/auth/Nav';

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
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='no-scrollbar relative flex h-full w-full flex-col items-center gap-8 overflow-scroll bg-primary-1 '
    >
      <AuthNavBar page='register' />
      <UserRegistrationForms />
    </div>
  );
};

export default SignUp;

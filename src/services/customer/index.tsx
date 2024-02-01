import { SignUpInterface } from 'pages/onboarding/SignUp/signUp.model';
import API from '../index';
import {
  customerLoginFormInterface,
  customerLoginFormSchema,
} from 'pages/onboarding/Login/login.model';

const createCustomer = async (params: SignUpInterface) => {
  const { data } = await API.post(`/users`, {
    ...params,
  });

  return data;
};

const customerLogin = async (params: customerLoginFormInterface) => {
  const { data } = await API.post(`/login`, {
    ...params,
  });
  return data;
};

const customerService = { createCustomer, customerLogin };

export default customerService;

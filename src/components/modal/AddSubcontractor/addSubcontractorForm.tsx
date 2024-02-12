import { Button } from 'components/shadcn/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from 'lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import { Textarea } from 'components/shadcn/textarea';

import { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/shadcn/ui/select';
import { processError } from 'helper/error';
import useStore from 'store';
import { useLocation, useNavigate } from 'react-router-dom';
import CONSTANTS from 'constant';
import API from 'services';
import toast from 'helper';
import Spinner from 'components/shadcn/ui/spinner';
import { sub } from 'date-fns';

interface Iprops {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: any;
  projectId?: string;
  projectName?: string;
  projectLocation?: string;
  projectType?: string;
  contractSum?: string;
}

const FormSchema = z.object({
  projectName: z.string().min(2, {
    message: 'Please enter a valid name.',
  }),
  email: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
  phone: z.string().min(2, {
    message: 'Please enter a valid phone number.',
  }),

  subcontractorType: z.string().min(2, {
    message: 'Please enter a valid subcontractor type.',
  }),
  contractSum: z.string().min(2, {
    message: 'Please enter a valid contract sum.',
  }),
  nameOfSubcontractor: z.string().min(2, {
    message: 'Please enter a valid name of subcontractor.',
  }),
  companyOfSubcontractor: z.string().min(2, {
    message: 'Please enter a valid company of subcontractor.',
  }),
});

const CreateProjectForm = ({ setModalOpen, refetch, contractSum, projectName }: Iprops) => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const app_id = searchParams.get('app_id');

  const {
    setAuthDetails,
    setLoggedIn,
    authDetails,
    appId: currentAppId,
  } = useStore((store) => store);

  const [message, setMessage] = useState<{ text: any; isError: boolean }>({
    text: '',
    isError: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: projectName ?? '',
      email: '',
      phone: '',

      contractSum: contractSum ?? '',
      nameOfSubcontractor: '',
      companyOfSubcontractor: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormIsLoading(true);

    try {
      const res = await API.post(`/pages`, {
        unique_id: Math.random().toString(36).substr(2, 9),
        is_active: true,
        app_id: Number(app_id ?? currentAppId),
      });
      toast.success('Page Created Successfully');
      setMessage({ text: 'Page created', isError: false });
      // refetch();
      setTimeout(() => {
        // navigate(`/${CONSTANTS.ROUTES['my-assistants']}`);
        setModalOpen(false);
      }, 1000);
    } catch (error: any) {
      processError(error);
      setMessage({ text: processError(error), isError: true });
    }
    setFormIsLoading(false);
  }

  return (
    <section className=' relative '>
      <div className=' mx-auto      flex-col gap-1 rounded-[15px] bg-white  md:p-[1.5rem]'>
        <h5 className='  text-center text-[1.2rem] font-[700] leading-[2rem] tracking-[0.01125rem]'>
          Add Subcontractor
        </h5>

        <div className='mb-6'>
          <h5 className='  text-[1.2rem] font-[700] leading-[2rem] tracking-[0.01125rem]'>
            John Smith Constructions
          </h5>
          <span className='mb-3 text-sm leading-[1.5rem] tracking-[0.00938rem] text-secondary-2'>
            93 Apollo Cresent, Abuja
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name='projectName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='my-4 text-sm font-semibold text-gray-600'>
                    Name of Project
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        placeholder=''
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='contractSum'
              render={({ field }) => (
                <FormItem className='mt-0'>
                  <FormLabel className='my-4 text-sm font-semibold text-gray-600'>
                    Contract Sum
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        // placeholder='https://example.com'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nameOfSubcontractor'
              render={({ field }) => (
                <FormItem className='mt-0'>
                  <FormLabel className='my-4 text-sm font-semibold text-gray-600'>
                    Name of Subcontractor
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        // placeholder='https://example.com'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='companyOfSubcontractor'
              render={({ field }) => (
                <FormItem className='mt-0'>
                  <FormLabel className='my-4 text-sm font-semibold text-gray-600'>
                    Name of Company
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        // placeholder='https://example.com'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subcontractorType'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-1'>
                    <label className=' rounded-full px-1  text-sm  font-bold text-gray-600'>
                      What is your type of Subcontractor?`
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full text-secondary-1'>
                          <SelectValue placeholder='Pick one' className='text-secondary-1' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='internship'>Internship</SelectItem>
                        <SelectItem value='Full Time'>Full Time</SelectItem>
                        <SelectItem value='Part Time'>Part Time</SelectItem>
                        <SelectItem value='Contract'>Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />

            <section className=' grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]  '>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1 text-sm font-semibold text-gray-600'>
                        Email
                      </label>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='e.g. johnsmith@mail.com'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1  text-sm font-semibold text-gray-600'>
                        Phone Number
                      </label>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='e.g. +234 800 000 0000'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
            </section>

            <div className=' flex flex-col items-center gap-4'>
              <button
                disabled={formIsLoading}
                type='submit'
                className='group mx-auto flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-2 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-4/12'
              >
                <span className='text-sm font-[500] leading-[1.5rem] tracking-[0.02875rem] text-white disabled:cursor-not-allowed disabled:opacity-50'>
                  {formIsLoading ? <Spinner /> : 'Close'}
                </span>
              </button>

              <span
                className={`${
                  message.isError ? 'text-red-500' : 'text-green-700'
                } text-center text-[16px] transition-opacity duration-300 ease-in-out`}
              >
                {message.text}
              </span>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateProjectForm;

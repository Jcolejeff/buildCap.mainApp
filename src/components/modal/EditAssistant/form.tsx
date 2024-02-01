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

import Spinner from 'components/shadcn/ui/spinner';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from 'constant';
import API from 'services';
import toast from 'helper';
import useStore from 'store';
import { useLocation } from 'react-router-dom';

interface Iprop {
  id?: string;
  size?: 'lg' | 'sm';
  businessType?: string;
  closeForm?: () => void;
  setModalOpen?: any;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter a valid name.',
  }),

  website_url: z
    .string({
      required_error: 'Business url is required.',
    })
    .url({
      message: 'Please enter a valid url.',
    }),
  industry_type: z.string({
    required_error: 'Industry Type is required.',
  }),
  // website_type: z.string({
  //   required_error: 'Website Type is required.',
  // }),

  description: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.',
    })
    .max(160, {
      message: 'Message must not be longer than 160 characters.',
    }),
});

const EditAssistant = ({ setModalOpen }: Iprop) => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [message, setMessage] = useState<{ text: any; isError: boolean }>({
    text: '',
    isError: false,
  });
  const navigate = useNavigate();
  const { setAuthDetails, setLoggedIn, authDetails, currentApp } = useStore((store) => store);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: currentApp.data?.name,
      website_url: currentApp?.data?.url,
      industry_type: currentApp?.data?.industry,
      description: currentApp?.data?.description,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data);
    setFormIsLoading(true);
    let organisation_id = authDetails?.data?.organisation_id;
    if (!organisation_id) {
      try {
        const res = await API.post(`/organisations`, {
          name: ` ${data?.name + (Math.random() * 0.9).toString()}`,
          is_active: true,
        });
        const userData = {
          ...authDetails,
          data: { ...authDetails?.data, organisation_id: res.data?.data?.id },
        };
        organisation_id = res.data?.data?.id;
        setAuthDetails(userData);
      } catch (error: any) {
        processError(error);
      }
    }
    try {
      const res = await API.put(`/apps/${currentApp?.data?.id}`, {
        name: data.name,
        url: data.website_url,
        industry: data.industry_type,
        description: data.description,
        is_active: true,
        organisation_id,
      });
      toast.success('Assistant Edited');
      // setMessage({ text: 'Assistant Created', isError: false });
      setTimeout(() => {
        setModalOpen(false);
        navigate(0);
      }, 1000);
    } catch (error: any) {
      processError(error);
      setMessage({ text: processError(error), isError: true });
    }
    setFormIsLoading(false);
  }

  return (
    <section className='container relative   '>
      <div className=' mx-auto    flex max-w-2xl  flex-col gap-4 rounded-[15px]  bg-white py-6  md:px-[2.5rem]'>
        <h5 className='mb-[0rem] text-center font-[700] leading-[2rem] tracking-[0.01125rem] md:text-[1.23rem]'>
          Edit App Assistant
        </h5>
        <span className='invisible  h-0 text-center text-sm leading-[1.5rem] tracking-[0.00938rem] text-secondary-2'>
          Create an assistant that will offer automated help to users. To start, enter the details
          of your website
        </span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='my-4 text-sm font-semibold'>
                    Name of app assistant
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='py-6 text-lg transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:text-gray-300  focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='Name of app assistant'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='industry_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='my-4 text-sm font-bold'>Industry type</FormLabel>

                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='py-6 text-lg transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:text-gray-300  focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='industry type'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='website_url'
              render={({ field }) => (
                <FormItem className='mt-0'>
                  <FormLabel className='my-4 text-sm font-bold'>
                    Enter the URL of your Website
                  </FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='py-6 text-lg transition-all duration-300 ease-in-out  placeholder:text-sm  placeholder:text-gray-300  focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='https://example.com'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='my-4 text-sm font-bold'>Description of website</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      className='mb-[2.5rem] resize-none border-gray-200 px-[0.5rem]  text-sm placeholder:text-secondary-2/[0.38] focus-within:border-0 focus:border-green-300'
                      placeholder='Enter  description here'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription className='text-sm'>
                    You'll be contacted within 3 work days.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=' flex flex-col items-center gap-6'>
              <button
                disabled={formIsLoading}
                type='submit'
                className='group flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-6 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <span className='font-[500] leading-[1.5rem] tracking-[0.02875rem] text-white disabled:cursor-not-allowed disabled:opacity-50'>
                  {formIsLoading ? <Spinner /> : 'Edit assistant'}
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

export default EditAssistant;

import { useState } from 'react';
import Icon from 'utils/Icon';
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
import { processError } from 'helper/error';
import useStore from 'store';
import { useLocation, useNavigate } from 'react-router-dom';
import CONSTANTS from 'constant';
import API from 'services';
import toast from 'helper';
import Spinner from 'components/shadcn/ui/spinner';
import FunkyPagesHero from 'components/general/FunkyPagesHero';
import AddSubcontractorModal from 'components/modal/AddSubcontractor';

const CreateProject = () => {
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Please enter a valid project name.',
    }),

    duration: z.string({
      required_error: 'project duration is required.',
    }),
  });

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
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormIsLoading(true);

    try {
      const res = await API.post(`/pages`, {
        title: data.name,
        url: data.duration,
        unique_id: Math.random().toString(36).substr(2, 9),
        is_active: true,
        app_id: Number(app_id ?? currentAppId),
      });
      toast.success('Page Created Successfully');
      setMessage({ text: 'Page created', isError: false });
      // refetch();
    } catch (error: any) {
      processError(error);
      setMessage({ text: processError(error), isError: true });
    }
    setFormIsLoading(false);
  }
  return (
    <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col overflow-auto border   bg-white px-container-base py-[1.1rem]'>
      <div className='   w-full   py-[1.5rem] '>
        <FunkyPagesHero
          description='list of your active and inactive projects'
          title='New Project'
          //     iconType='funkyPagesHero2'
          customBgClass='bg-primary-18'
          //     textColor='text-black'
        />
      </div>
      <div className='mb-6'>
        <h5 className='  text-[1.2rem] font-[700] leading-[2rem] tracking-[0.01125rem]'>
          John Smith Constructions
        </h5>
        <span className='mb-3 text-sm leading-[1.5rem] tracking-[0.00938rem] text-secondary-2'>
          93 Apollo Cresent, Abuja
        </span>
      </div>
      <div className='       flex-col gap-1 '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='my-4 text-sm font-semibold '>Name of Project</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='e.g. Flyover Construction'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem className='mt-0'>
                  <FormLabel className='my-4 text-sm font-semibold '>Project Duration</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='bg-gray-200 py-4   text-base transition-all duration-300 ease-in-out placeholder:text-sm  placeholder:font-medium  placeholder:text-gray-700  focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='e.g. 6 months'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />

            <AddSubcontractorModal
              trigger={
                <Button
                  type='button'
                  className='bottom-2 mx-auto my-6 border bg-gray-200 py-8  font-semibold text-gray-700 transition-all duration-300 ease-in-out  hover:bg-white hover:text-primary-1 hover:opacity-90 md:w-6/12 '
                >
                  Add Subcontractor
                </Button>
              }
            />
            <div className=' flex flex-col items-center gap-4'>
              <button
                disabled={formIsLoading}
                type='submit'
                className='group mx-auto flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-2 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-4/12'
              >
                <span className='text-sm font-[500] leading-[1.5rem] tracking-[0.02875rem] text-white disabled:cursor-not-allowed disabled:opacity-50'>
                  {formIsLoading ? <Spinner /> : 'Done'}
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
    </div>
  );
};

export default CreateProject;

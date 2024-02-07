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
import UserPageGuard from 'guards/UserPageGuard';
import { useDropzone } from 'react-dropzone';
import ListInput from './ListInput';
import SuccessfulFinancialRequest from 'components/modal/auth/SuccessFinancialRequest';
const RequestFinancingPage = () => {
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Please enter a name.',
    }),

    phone: z.string({
      required_error: 'phone is required.',
    }),
    email: z
      .string()
      .min(2, {
        message: 'please enter and email',
      })
      .email(),
    bankName: z.string().min(2, {
      message: 'Please enter a bank name.',
    }),
    accountName: z.string().min(2, {
      message: 'Please enter an account name.',
    }),
    accountNumber: z.string().min(2, {
      message: 'Please enter an account number',
    }),
  });

  const [formIsLoading, setFormIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const app_id = searchParams.get('app_id');

  const [file, setFile] = useState<any>(null);
  const {
    setAuthDetails,
    setLoggedIn,
    authDetails,
    setSuccessModalOpen,
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
      });
      toast.success('Page Created Successfully');
      setMessage({ text: 'Page created', isError: false });
      setSuccessModalOpen(true);
      // refetch();
    } catch (error: any) {
      processError(error);
      setMessage({ text: processError(error), isError: true });
    }
    setFormIsLoading(false);
  }
  const handleFileDrop = async (file: any) => {
    if (!file) return;
    if (file.size > 1500000) {
      toast.error('File size too large, please upload a smaller file');
      return;
    }

    setFile(file);
  };
  const onDrop = (acceptedFiles: any) => {
    handleFileDrop(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <UserPageGuard page={CONSTANTS.ROUTES['request-financing']}>
      <div className='container  flex  h-full w-full max-w-[180.75rem] flex-col overflow-auto border   bg-white px-container-base py-[1.1rem]'>
        <div className='   w-full   py-[1.5rem] '>
          <SuccessfulFinancialRequest />
          <FunkyPagesHero
            description='list of your active and inactive projects'
            title='Material Financing'
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
        <div className='flex justify-between py-4'>
          <article>
            <span className='mb-3 text-sm  font-semibold leading-[1.5rem] tracking-[0.00938rem] text-secondary-2'>
              Project
            </span>
            <h5 className='  text-[1.3rem]  font-[700] leading-[2rem] tracking-[0.01125rem]'>
              Flyover Construction
            </h5>
          </article>
          <article>
            <span className='mb-3 text-sm font-semibold leading-[1.5rem] tracking-[0.00938rem] text-secondary-2'>
              Duration
            </span>
            <h5 className='  text-[1.3rem] font-[700] leading-[2rem] tracking-[0.01125rem]'>
              6 months
            </h5>
          </article>
        </div>

        <section>
          <ListInput items={items} setItems={setItems} />
        </section>
        <div className='       flex-col gap-1 '>
          <h5 className=' my-6 text-[1rem]  font-[700] leading-[2rem] tracking-[0.01125rem]'>
            Supplier Details
          </h5>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='my-4 text-sm font-semibold '>Supplier Name</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          className='bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
                          {...field}
                          placeholder='e.g. john doe'
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-base' />
                  </FormItem>
                )}
              />

              <section className='grid gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='my-4 text-sm font-semibold '>Phone Number</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            className='bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
                            {...field}
                            placeholder='e.g. 08012345678'
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='mt-1 text-base' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='mt-0'>
                      <FormLabel className='my-4 text-sm font-semibold '>Email Address</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            className='bg-gray-200 py-4   text-base transition-all duration-300 ease-in-out placeholder:text-sm  placeholder:font-medium  placeholder:text-gray-700  focus:placeholder:text-gray-400'
                            {...field}
                            placeholder='e.g. john@gmail.com'
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='mt-1 text-base' />
                    </FormItem>
                  )}
                />
              </section>
              <FormField
                control={form.control}
                name='bankName'
                render={({ field }) => (
                  <FormItem className='mt-0'>
                    <FormLabel className='my-4 text-sm font-semibold '>Bank Name</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          className='bg-gray-200 py-4   text-base transition-all duration-300 ease-in-out placeholder:text-sm  placeholder:font-medium  placeholder:text-gray-700  focus:placeholder:text-gray-400'
                          {...field}
                          placeholder='e.g. GTB'
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-base' />
                  </FormItem>
                )}
              />
              <section className='grid gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='accountName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='my-4 text-sm font-semibold '>Account Name</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            className='bg-gray-200 py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm placeholder:font-medium  placeholder:text-gray-700 focus-within:ring-0 focus:ring-0 focus:placeholder:text-gray-400'
                            {...field}
                            placeholder='e.g. John Doe'
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='mt-1 text-base' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='accountNumber'
                  render={({ field }) => (
                    <FormItem className='mt-0'>
                      <FormLabel className='my-4 text-sm font-semibold '>Account Number</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            className='bg-gray-200 py-4   text-base transition-all duration-300 ease-in-out placeholder:text-sm  placeholder:font-medium  placeholder:text-gray-700  focus:placeholder:text-gray-400'
                            {...field}
                            placeholder='e.g. 0123456789'
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='mt-1 text-base' />
                    </FormItem>
                  )}
                />
              </section>
              <AddSubcontractorModal
                trigger={
                  <Button
                    type='button'
                    className='bottom-2 mx-auto my-6 hidden border bg-gray-200 py-8  font-semibold text-gray-700 transition-all duration-300 ease-in-out  hover:bg-white hover:text-primary-1 hover:opacity-90 md:w-6/12 '
                  >
                    Add Subcontractor
                  </Button>
                }
              />

              {/* file upload */}
              <section {...getRootProps()}>
                <input {...getInputProps()} />
                {file ? (
                  <div className='mt-4 flex items-center justify-center gap-3 rounded-lg border bg-gray-200 py-4 hover:cursor-pointer'>
                    <Icon name='uploadIcon' svgProp={{ className: 'w-8' }}></Icon>
                    <p className='text-sm'>{file?.name}</p>
                  </div>
                ) : isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <div className='mt-4 flex items-center justify-center gap-3 rounded-lg border bg-gray-200 py-4 hover:cursor-pointer'>
                    <p className='text-sm font-semibold text-secondary-1'>
                      Upload Scanned invoice, Drop a file to add,{' '}
                      <span className='font-semibold text-primary-1'>or Choose File</span>
                    </p>
                    <Icon name='uploadIcon' svgProp={{ className: 'w-8' }}></Icon>
                  </div>
                )}
              </section>
              <div className=' flex flex-col items-center gap-4'>
                <button
                  disabled={formIsLoading}
                  type='submit'
                  className='group mx-auto flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-2 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-4/12'
                >
                  <span className='text-sm font-[500] leading-[1.5rem] tracking-[0.02875rem] text-white disabled:cursor-not-allowed disabled:opacity-50'>
                    {formIsLoading ? <Spinner /> : 'Send'}
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
    </UserPageGuard>
  );
};

export default RequestFinancingPage;

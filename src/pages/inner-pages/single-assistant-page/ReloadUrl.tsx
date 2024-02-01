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

import { processError } from 'helper/error';

import Spinner from 'components/shadcn/ui/spinner';

interface Iprops {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSchema = z.object({
  website_url: z
    .string({
      required_error: 'page url is required.',
    })
    .url({
      message: 'Please enter a valid url.',
    }),
});

const ReloadPageUrl = ({ url }: { url: string }) => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState<{ text: any; isError: boolean }>({
    text: '',
    isError: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website_url: url,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data);
    setFormIsLoading(true);

    try {
      console.log('data', data);

      // setMessage({ text: 'Assistant Created', isError: false });
    } catch (error) {
      setMessage({ text: processError(error), isError: true });
    }
    setFormIsLoading(false);
  }

  return (
    <section className=''>
      <div className='   flex-col gap-1 rounded-[15px] bg-white'>
        <p className=' mb-2 text-sm font-semibold text-gray-600'>Page URL</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='website_url'
              render={({ field }) => (
                <FormItem className=' w-6/12'>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        className='py-4 text-base transition-all duration-300 ease-in-out  placeholder:text-sm  placeholder:text-gray-300  focus:placeholder:text-gray-400'
                        {...field}
                        placeholder='https://example.com'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-base' />
                </FormItem>
              )}
            />

            <div className=' flex flex-col items-center '>
              <button
                disabled={formIsLoading}
                type='submit'
                className='group flex w-full items-center justify-center gap-2 rounded-[6px] border border-primary-1 bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <span className='text-xs font-[500] leading-[1.5rem] tracking-[0.02875rem]  disabled:cursor-not-allowed disabled:opacity-50'>
                  {formIsLoading ? <Spinner /> : 'Reload Url'}
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

export default ReloadPageUrl;

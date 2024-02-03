import { TabsContent } from 'components/shadcn/ui/tabs';
import { Button } from 'components/shadcn/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from 'lib/utils';
import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import { toast } from 'components/shadcn/ui/use-toast';
import { format } from 'date-fns';
import { Calendar } from 'components/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/ui/popover';
import Icon from 'utils/Icon';
import SuccessfulSignUpModal from '../auth/successSignUp';
import useStore from 'store';
interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted?: React.Dispatch<React.SetStateAction<string[]>>;
}
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const FormSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })
  // .refine((data) => passwordRegex.test(data.password), {
  //   message:
  //     'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  //   path: ['password'],
  // })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
const PasswordTab = ({
  switchTab,
  data: tabData,
  handleComplete,
  setModalOpen,
  setCompleted,
}: Iprops) => {
  const { setSuccessModalOpen } = useStore((state) => state);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // const newData = {
    //   ...data,
    //   startDate: format(data.startDate, 'yyyy-MM-dd'),
    //   endDate: format(data.endDate, 'yyyy-MM-dd'),
    // };
    console.log(data);
    setSuccessModalOpen(true);

    // switchTab(tabData[0]);
    handleComplete(tabData[2]);
    if (setCompleted) {
      setCompleted([]); //would consider taking this line out
    }

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <TabsContent value='Password' className=' mt-8  md:mx-8'>
      <div className='mx-auto flex h-full flex-col  gap-4 md:w-1/2  '>
        <div className='my-4 flex flex-col items-center px-1'>
          <h2 className='text-2xl font-semibold'>You’re almost done!</h2>
          <h3 className='text-sm text-gray-600'>Please create a password</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-2'>
                    <label className=' rounded-full px-1  text-sm font-bold'>Password</label>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        placeholder='Enter a strong password'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-2'>
                    <label className=' rounded-full px-1  text-sm font-bold'>
                      Confirm Password
                    </label>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        placeholder='Enter your password again'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />

            <div className='rounded-lg bg-slate-200/50 p-4'>
              <p className='mb-6 font-semibold text-gray-400 md:text-sm'>Your password must have</p>
              <ul className=' text-sm font-medium'>
                <li>At least 8 characters</li>
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 number</li>
                <li>1 special character</li>
              </ul>{' '}
            </div>

            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  switchTab(tabData[1]);
                }}
                type='button'
                className='group mt-9 flex w-max items-center justify-center gap-2 rounded-[6px] bg-white px-3 py-1 shadow-9 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'
              >
                <Icon
                  name='arrowBack'
                  svgProp={{
                    className:
                      'text-primary-1  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <span className='whitespace-nowrap text-sm font-[500] leading-[24px] tracking-[0.4px] text-primary-1'>
                  {`Previous`}
                </span>
              </button>
              <SuccessfulSignUpModal />
              <button
                type='submit'
                className='group mt-9 flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'
              >
                <span className='text-sm font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                  {`Proceed`}
                </span>
                <Icon
                  name='arrowTo'
                  svgProp={{
                    className:
                      'text-white  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
              </button>
            </div>
          </form>
        </Form>
      </div>
    </TabsContent>
  );
};

export default PasswordTab;

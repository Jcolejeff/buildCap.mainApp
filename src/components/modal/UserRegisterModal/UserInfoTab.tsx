import { TabsContent } from 'components/shadcn/ui/tabs';
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
import { toast } from 'components/shadcn/ui/use-toast';
import { RadioGroup, RadioGroupItem } from 'components/shadcn/ui/radio-group';

import { format } from 'date-fns';
import { Calendar } from 'components/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/ui/popover';
import Icon from 'utils/Icon';
interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
}
const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
  lastName: z.string().min(2, {
    message: 'Please enter a valid last name.',
  }),
  firsName: z.string({
    required_error: 'First Name is required.',
  }),
  phone: z.string({
    required_error: ' Phone Number is required.',
  }),

  address: z.string({
    required_error: 'Address is required.',
  }),
  type: z.enum(['maincontractor', 'subcontractor', 'supplier'], {
    required_error: 'You must select a user type',
  }),
});
const UserInfoTap = ({ switchTab, data: tabData, handleComplete }: Iprops) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
    };

    switchTab(tabData[1]);
    handleComplete(tabData[0]);

    console.log(newData);

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
    <TabsContent value='PersonalInfo' className='   md:mx-8'>
      <div className=' flex h-full  flex-col   gap-4 '>
        <div className='my-4 flex flex-col items-center px-1'>
          <h2 className='text-2xl font-semibold'>Tell us about you</h2>
          <h3 className='text-sm text-gray-600'>Enter your information correctly</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  {/* <FormLabel>
                    <span className='text-base font-semibold'>Select Payment Method</span>
                  </FormLabel> */}
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex items-center justify-between gap-16'
                    >
                      <FormItem
                        className={cn(
                          `flex w-full cursor-pointer transition-all duration-300 ease-in-out ${
                            form.getValues('type') === 'maincontractor' && '!border-black '
                          }  items-center space-x-3  space-y-0 border-b-2  border-white/0 px-2`,
                        )}
                      >
                        <FormLabel className='flex w-full cursor-pointer  items-center justify-between   py-6 font-normal'>
                          <p className='text-base font-semibold'>Main Contractor</p>
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value='maincontractor' className='' />
                        </FormControl>
                      </FormItem>
                      <FormItem
                        className={cn(
                          `flex w-full cursor-pointer  transition-all duration-300 ease-in-out ${
                            form.getValues('type') === 'subcontractor' && '!border-black'
                          }  items-center space-x-3  space-y-0 border-b-2 border-white/0 px-2`,
                        )}
                      >
                        <FormLabel className='flex w-full cursor-pointer items-center justify-between py-6  font-normal'>
                          <p className='text-base font-semibold'>Sub-Contractor</p>
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value='subcontractor' />
                        </FormControl>
                      </FormItem>
                      <FormItem
                        className={cn(
                          `flex w-full cursor-pointer transition-all duration-300 ease-in-out ${
                            form.getValues('type') === 'supplier' && '!border-black'
                          }  items-center space-x-3  space-y-0 border-b-2  border-white/0 px-2`,
                        )}
                      >
                        <FormLabel className='flex w-full cursor-pointer  items-center justify-between py-6  font-normal'>
                          <p className='text-base font-semibold'>Supplier</p>
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value='supplier' />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className=' grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]  '>
              <FormField
                control={form.control}
                name='firsName'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1  text-sm font-medium'>First Name</label>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='Enter your First Name'
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
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1  text-sm font-medium'>Last Name</label>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='Enter your Last Name'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-2'>
                    <label className=' rounded-full px-1  text-sm font-medium'>Email</label>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        placeholder='Enter your Email'
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
                    <label className=' rounded-full px-1  text-sm font-medium'>Phone Number</label>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        placeholder='Enter your Phone Number'
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-col gap-2'>
                    <label className=' rounded-full px-1  text-sm font-medium'>Address</label>
                    <FormControl>
                      <Input
                        className=' placeholder:text-sm placeholder:text-secondary-1/50'
                        placeholder='Enter your Address'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />
            <div className='flex w-full items-center justify-between gap-4'>
              <button
                type='button'
                // disabled={form.formState.isSubmitting}
                disabled={true}
                className='group flex items-center  justify-center gap-2 rounded-[6px] bg-gray-200 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed md:px-6 md:py-2'
              >
                <Icon
                  name='arrowBack'
                  svgProp={{
                    className:
                      'text-gray-400  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <span className='whitespace-nowrap text-sm font-[500] leading-[24px] tracking-[0.4px] text-gray-400'>
                  {`Previous`}
                </span>
              </button>
              <button
                type='submit'
                // onClick={() => {
                //   switchTab(tabData[1]);
                //   handleComplete(tabData[0]);
                // }}
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-1  transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'
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

export default UserInfoTap;

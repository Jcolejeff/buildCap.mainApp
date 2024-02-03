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
  phone: z.string().min(2, {
    message: 'Please enter a valid Number.',
  }),
  bio: z.string({
    required_error: 'Twitter is required.',
  }),
  linkedin: z.string({
    required_error: ' Linkedin is required.',
  }),
  dob: z.date({
    required_error: 'Date of birth is required.',
  }),
  address: z.string({
    required_error: 'Address is required.',
  }),
});
const UserInfoTap = ({ switchTab, data: tabData, handleComplete }: Iprops) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
      dob: format(data.dob, 'yyyy-MM-dd'),
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
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                      Bio
                    </label>
                    <FormControl>
                      <Input
                        className='text-secondary-3 placeholder:text-xs placeholder:text-secondary-1'
                        placeholder='Short Bio that talks about what you do (I.e Cinematographer & Animator)'
                        {...field}
                      />
                    </FormControl>
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
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        Email
                      </label>
                      <FormControl>
                        <Input className=' text-secondary-3' {...field} />
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
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        Phone Number
                      </label>
                      <FormControl>
                        <Input className=' text-secondary-3' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <div className='relative'>
                        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                          Date of Birth
                        </label>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal  text-secondary-3',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <Icon
                                name='calendarIconBlack'
                                svgProp={{
                                  className:
                                    ' cursor-pointer ml-auto h-4 w-4  transition-opacity duration-300 ease-in-out active:opacity-100',
                                }}
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: any) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </div>
                    </Popover>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='linkedin'
                render={({ field }) => (
                  <FormItem>
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        LinkedIn Profile link
                      </label>
                      <FormControl>
                        <Input className=' text-secondary-3' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                      Address
                    </label>
                    <FormControl>
                      <Input className=' text-secondary-3' {...field} />
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
                className='group flex items-center  justify-center gap-2 rounded-[6px] bg-gray-200 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed'
              >
                <Icon
                  name='arrowBack'
                  svgProp={{
                    className:
                      'text-gray-400  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <span className='whitespace-nowrap text-xs font-[500] leading-[24px] tracking-[0.4px] text-gray-400'>
                  {`Previous`}
                </span>
              </button>
              <button
                type='button'
                onClick={() => {
                  switchTab(tabData[1]);
                  handleComplete(tabData[0]);
                }}
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-1 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='text-xs font-[300]  leading-[24px] tracking-[0.4px] text-white'>
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

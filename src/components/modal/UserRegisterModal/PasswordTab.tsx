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
const FormSchema = z.object({
  placeOfStudy: z.string().min(2, {
    message: 'Please enter a valid place of study.',
  }),
  courseOfStudy: z.string().min(2, {
    message: 'Please enter  a valid course of study.',
  }),

  startDate: z.date({
    required_error: 'Start date is required.',
  }),
  endDate: z.date({
    required_error: 'End date is required.',
  }),
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

    switchTab(tabData[0]);
    handleComplete(tabData[4]);
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
      <div className='flex h-full  flex-col gap-4  '>
        <div className='my-4 flex flex-col items-center px-1'>
          <h2 className='text-2xl font-semibold'>You’re almost done!</h2>
          <h3 className='text-sm text-gray-600'>Please create a password</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <section className='   grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr] '>
              <FormField
                control={form.control}
                name='placeOfStudy'
                render={({ field }) => (
                  <FormItem>
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        Place of study
                      </label>
                      <FormControl>
                        <Input
                          className=' text-secondary-3 placeholder:text-secondary-1'
                          placeholder='Where did you Study?'
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
                name='courseOfStudy'
                render={({ field }) => (
                  <FormItem>
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        Course of study
                      </label>
                      <FormControl>
                        <Input
                          className='text-secondary-3 placeholder:text-secondary-1'
                          placeholder='What did you study'
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
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <div className='relative'>
                        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                          Start Date
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
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span className='text-secondary-1'>Pick a date</span>
                              )}
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
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <div className='relative'>
                        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                          End Date
                        </label>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal text-secondary-3',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span className='text-secondary-1'>Pick a date</span>
                              )}
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
            </section>

            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  switchTab(tabData[1]);
                }}
                type='button'
                className='group flex w-max items-center justify-center gap-2 rounded-[6px] bg-white px-4 py-1 shadow-9 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <Icon
                  name='arrowBack'
                  svgProp={{
                    className:
                      'text-primary-1  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <span className='whitespace-nowrap text-xs font-[500] leading-[24px] tracking-[0.4px] text-primary-1'>
                  {`Previous`}
                </span>
              </button>
              <SuccessfulSignUpModal />
              <button
                type='button'
                onClick={() => {
                  setSuccessModalOpen(true);

                  // switchTab(tabData[0]);
                  handleComplete(tabData[2]);
                  if (setCompleted) {
                    setCompleted([]); //would consider taking this line out
                  }
                }}
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='text-xs font-[500]  leading-[24px] tracking-[0.4px] text-white'>
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

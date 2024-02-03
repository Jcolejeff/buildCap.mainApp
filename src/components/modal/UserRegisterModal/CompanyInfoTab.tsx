import { TabsContent } from 'components/shadcn/ui/tabs';
import { Button } from 'components/shadcn/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from 'lib/utils';
import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import { toast } from 'components/shadcn/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/shadcn/ui/select';
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
  ownershipType: z.string({
    required_error: 'Ownership Type is required.',
  }),
  companyType: z.string({
    required_error: 'Company Type is required.',
  }),
  companyRC: z.string().min(2, {
    message: 'Please enter a valid Company RC/BN Number.',
  }),
  companyTax: z.string().min(2, {
    message: 'Please enter a valid Company Tax Identification Number.',
  }),
  address: z.string().min(2, {
    message: 'Please enter a valid Address.',
  }),
  subcontractor: z.string().min(2, {
    message: 'Please enter a valid Subcontractor.',
  }),
});
const CompanyInfoTab = ({ switchTab, data: tabData, handleComplete }: Iprops) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // const newData = {
    //   ...data,
    //   startDate: format(data.startDate, 'yyyy-MM-dd'),
    //   endDate: format(data.endDate, 'yyyy-MM-dd'),
    // };
    switchTab(tabData[3]);
    handleComplete(tabData[2]);

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
    <TabsContent value='CompanyInfo' className=' mt-8  md:mx-8'>
      <div className=' flex h-full  flex-col  gap-4'>
        <div className='my-4 flex flex-col items-center px-1'>
          <h2 className='text-2xl font-semibold'>Tell us about your Company</h2>
          <h3 className='text-sm text-gray-600'>
            Please enter your company details in the fields below
          </h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <section className=' flex flex-col gap-6 '>
              <FormField
                control={form.control}
                name='ownershipType'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-1'>
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        What is your company ownership type?
                      </label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='w-full text-secondary-1'>
                            <SelectValue
                              placeholder='Company Ownership Type'
                              className='text-secondary-1'
                            />
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
              <FormField
                control={form.control}
                name='companyType'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-1'>
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        What is your company type?
                      </label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='w-full text-secondary-1'>
                            <SelectValue placeholder='Company Type' className='text-secondary-1' />
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

              <FormField
                control={form.control}
                name='companyRC'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        Company RC/BN Number *
                      </label>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='e.g. 8962110'
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
                name='companyTax'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-2'>
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        Company Tax Identification Number
                      </label>
                      <p className='text-xs text-gray-400'>
                        (This is a unique number allocated and issued to your company by FIRS as a
                        duly registered Taxpayer in Nigeria.)
                      </p>
                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='e.g. 05002743-0001'
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
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        Current Business Address
                      </label>

                      <FormControl>
                        <Input
                          className=' placeholder:text-sm placeholder:text-secondary-1/50'
                          placeholder='Street Address'
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
                name='subcontractor'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex flex-col gap-1'>
                      <label className=' rounded-full px-1  text-sm font-bold'>
                        What is your type of Subcontractor?`
                      </label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='w-full text-secondary-1'>
                            <SelectValue
                              placeholder='Company Ownership Type'
                              className='text-secondary-1'
                            />
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
            </section>

            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  switchTab(tabData[0]);
                }}
                type='button'
                className='group flex w-max items-center justify-center gap-2 rounded-[6px] bg-white px-3 py-1 shadow-9 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'
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
              <button
                type='button'
                onClick={() => {
                  switchTab(tabData[2]);
                  handleComplete(tabData[1]);
                }}
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'
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

export default CompanyInfoTab;

import { TabsContent } from 'components/shadcn/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as z from 'zod';
import Icon from 'utils/Icon';

import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import { toast } from 'components/shadcn/ui/use-toast';
const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Please enter a valid title',
  }),
  link: z.string().min(2, {
    message: 'Please enter a valid link',
  }),
  role: z.string().min(2, {
    message: 'Please enter a valid role',
  }),
});
interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted?: React.Dispatch<React.SetStateAction<string[]>>;
}
const ProjectsTab = ({
  switchTab,
  data: tabData,
  setModalOpen,
  handleComplete,
  setCompleted,
}: Iprops) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (setModalOpen) {
      setModalOpen(false);
    }
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
    <TabsContent value='Projects' className=' mt-8  md:mx-8'>
      <div className=' flex  h-full  flex-col '>
        <div className='mb-8 flex flex-col px-1'>
          <h2 className='text-lg'>Projects</h2>
          <h3 className='text-xs text-gray-500'>Add links to Projects you’ve worked on</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <section className=' '>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <div className='relative'>
                      <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                        Project Title
                      </label>
                      <FormControl>
                        <Input
                          className=' text-secondary-3 placeholder:text-xs placeholder:text-secondary-1'
                          placeholder='Add a title for your Project'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className='mt-1 text-xs' />
                  </FormItem>
                )}
              />
              <section className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]'>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <div className='relative'>
                        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                          Role
                        </label>
                        <FormControl>
                          <Input
                            className=' text-secondary-3 placeholder:text-xs placeholder:text-secondary-1'
                            placeholder='What was your role'
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
                  name='link'
                  render={({ field }) => (
                    <FormItem>
                      <div className='relative'>
                        <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                          Project Link
                        </label>
                        <FormControl>
                          <Input
                            className=' text-secondary-3 placeholder:text-xs placeholder:text-secondary-1'
                            placeholder='Paste link to project (Vimeo or Youtube)'
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className='mt-1 text-xs' />
                    </FormItem>
                  )}
                />
              </section>
            </section>
            <div className='flex justify-end'>
              <button
                type='button'
                className=' group flex items-center   justify-center gap-2 rounded-[7px] border border-primary-1 bg-transparent px-2 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-4'
              >
                <span className='text-xs font-[400] leading-[24px] tracking-[0.4px] text-gray-600 md:text-sm'>
                  Add Project
                </span>
                <Icon
                  name='plusIcon'
                  svgProp={{
                    className:
                      'text-primary-1  w-4 font-light cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
              </button>
            </div>
            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  switchTab(tabData[3]);
                }}
                type='button'
                className='group flex w-max items-center justify-center gap-2 rounded-[6px] bg-white px-3 py-1 shadow-9 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <Icon
                  name='arrowBack'
                  svgProp={{
                    className:
                      'text-primary-1  w-4  cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                  }}
                />
                <span className='whitespace-nowrap text-xs font-[500] leading-[24px] tracking-[0.4px] text-primary-1'>
                  {`Previous`.toUpperCase()}
                </span>
              </button>
              <button
                type='submit'
                className='group  flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='text-xs font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                  {`Complete`.toUpperCase()}
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

export default ProjectsTab;

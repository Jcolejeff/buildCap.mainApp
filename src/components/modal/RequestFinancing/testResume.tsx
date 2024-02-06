import { TabsContent } from 'components/shadcn/ui/tabs';
import ListInput from './ListInput';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormField } from 'components/shadcn/ui/form';
import { toast } from 'components/shadcn/ui/use-toast';

import Icon from 'utils/Icon';
import FileDropzone from './FileDropZone';
const FormSchema = z.object({
  file: z.string({
    required_error: 'Twitter is required.',
  }),
});
interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;

  data: string[];
}
const ResumeTab = ({ switchTab, data, handleComplete }: Iprops) => {
  const [items, setItems] = useState<string[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // const handleFileDrop = (files: any, setFieldValue: any) => {
  //   setFieldValue('file', files[0]);
  // };

  return (
    <TabsContent value='Resume' className='  md:mx-8'>
      <div className=' flex h-full flex-col '>
        <div className='mb-8 flex flex-col px-1'>
          <h2 className='text-lg'>Resume & Skills</h2>
          <h3 className='text-xs text-gray-500'>Upload your resume and enter your skills</h3>
        </div>
        <ListInput items={items} setItems={setItems} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <section className=' mb-4 pb-[3rem] sm:mb-4 sm:pb-[4rem] md:mb-1 md:pb-[2rem] lg:mb-1 lg:pb-[7rem] '>
              <h3 className='text-xs text-gray-500'>Upload Resume</h3>

              <FormField
                name='file'
                control={form.control}
                render={({ field }) => (
                  <FileDropzone
                    onDrop={(acceptedFiles: any) => field.onChange(acceptedFiles[0])}
                    file={field.value}
                  />
                )}
              />
            </section>
            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  switchTab(data[0]);
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
                  {`previous`.toUpperCase()}
                </span>
              </button>
              <button
                onClick={() => {
                  switchTab(data[2]);
                  handleComplete(data[1]);
                }}
                type='button'
                className='group flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-3 py-1 transition-all duration-300 ease-in-out hover:opacity-90'
              >
                <span className='text-xs font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                  {`Save and continue`.toUpperCase()}
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

export default ResumeTab;

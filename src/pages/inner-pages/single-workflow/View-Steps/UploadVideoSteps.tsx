import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as z from 'zod';

import { Form, FormField } from 'components/shadcn/ui/form';
import { toast } from 'components/shadcn/ui/use-toast';
import FileDropzone from './FileDropZone';

const FormSchema = z.object({
  file: z.string({
    required_error: 'Twitter is required.',
  }),
});
interface Iprops {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UploadVideoForm() {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <p className='text-center text-lg uppercase'>or</p>
        <p className='text-base font-semibold text-gray-500'>
          Upload a walkthrough Video of the steps
        </p>
        <section className=' rounded-xl  p-6 shadow-md '>
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
      </form>
    </Form>
  );
}

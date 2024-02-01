import { LazyLoadImage } from 'react-lazy-load-image-component';
import profilePicture from 'assets/image/profilePicture.png';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import CustomInput from 'components/shadcn/CustomInput';
import { useState } from 'react';
import CustomSelectTrigger from 'components/shadcn/customSelectTrigger';
import { Label } from 'components/shadcn/label';
import { handleUploadProfile } from 'utils/images/upload-profile';
import { Input } from 'components/shadcn/input';

const Account = () => {
  const [disabled] = useState(true);
  const dropOptions = ['value1', 'value2', 'value3', 'value4', 'value5'];
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(handleUploadProfile(event));
  };

  return (
    <div>
      <p>account</p>
    </div>
  );
  // return (
  //   <div className='flex flex-col'>
  //     <div className='w-100 rounded-md bg-white px-5 py-7 shadow-3'>
  //       <div className='md flex flex-col gap-x-4 md:flex-row md:items-center'>
  //         <div className='h-32 w-32'>
  //           <LazyLoadImage
  //             src={selectedFile ? URL.createObjectURL(selectedFile) : profilePicture}
  //             alt='avatar'
  //             className='h-full w-full bg-cover bg-top transition-transform duration-300 ease-in-out group-hover:scale-105'
  //             placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
  //           />
  //         </div>
  //         <div className='mt-3 flex flex-col gap-y-2 md:mt-0'>
  //           <div className='flex gap-x-2 md:gap-x-4'>
  //             <Label
  //               htmlFor='file-input'
  //               role='button'
  //               className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.1rem] py-[0.3rem] transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-[1.5rem]'
  //             >
  //               <span className='text-[13px] leading-[28px] tracking-[0.15px] text-white md:text-[14px] lg:text-[16px]'>
  //                 UPLOAD A NEW PHOTO
  //               </span>
  //             </Label>
  //             <Input
  //               type='file'
  //               accept='.jpg, .jpeg, .png, .gif'
  //               onChange={handleFileChange}
  //               className='hidden'
  //               id='file-input'
  //             />
  //             <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] border border-red-200 bg-white px-[1.1rem] py-[0.3rem] text-red-500 transition-all duration-300 ease-in-out hover:bg-red-100 hover:opacity-90 md:px-[1.5rem]'>
  //               <span
  //                 className='text-[13px] leading-[28px] tracking-[0.15px] md:text-[14px] lg:text-[16px]'
  //                 onClick={() => setSelectedFile(null)}
  //               >
  //                 RESET
  //               </span>
  //             </button>
  //           </div>
  //           <p className='text-[12px] font-[300] leading-[21px] tracking-[0.15px] text-secondary-2 md:text-[13px] lg:text-[14px]'>
  //             Allowed JPG, GIF or PNG. Max size of 800K
  //           </p>
  //         </div>
  //       </div>
  //       <div className='mt-10 flex w-full flex-col gap-y-3 md:gap-y-5'>
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomInput label='First Name' type='text' className='w-full' />
  //           <CustomInput label='Last Name' type='text' className='w-full' />
  //         </div>
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomInput label='Email' type='email' className='w-full' />
  //           <CustomInput label='Organization' type='text' className='w-full' />
  //         </div>
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomInput label='Phone Number' type='tel' className='w-full' />
  //           <CustomInput label='Address' type='text' className='w-full' />
  //         </div>
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomInput label='State' type='text' className='w-full' />
  //           <CustomInput label='Zip Code' type='number' className='w-full' />
  //         </div>

  //         {/* this ones are drop select, could be searchable too, the input below would be changed */}
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomSelectTrigger label='Country' options={dropOptions} className='w-full' />
  //           <CustomSelectTrigger label='Language' options={dropOptions} className='w-full' />
  //         </div>
  //         <div className='flex w-full flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0'>
  //           <CustomSelectTrigger label='Status' options={dropOptions} className='w-full' />
  //           <CustomSelectTrigger label='Select a fruit' options={dropOptions} className='w-full' />
  //         </div>
  //         {/* .... */}

  //         <div className='mt-2 flex w-full gap-x-4'>
  //           <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.1rem] py-[0.3rem] transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-[1.5rem]'>
  //             <span className='text-[13px] leading-[28px] tracking-[0.15px] text-white md:text-[14px] lg:text-[16px]'>
  //               SAVE CHANGES
  //             </span>
  //           </button>
  //           <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-[1.1rem] py-[0.3rem] text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:opacity-90 md:px-[1.5rem]'>
  //             <span className='text-[13px] leading-[28px] tracking-[0.15px] text-gray-500 md:text-[14px] lg:text-[16px]'>
  //               CANCEL
  //             </span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     <div className='w-100 mt-7 flex flex-col rounded-md bg-white px-5 py-7 shadow-3'>
  //       <p className='font-semibold text-gray-500'>Delete Account</p>
  //       <span className='mt-6 flex items-center gap-x-3'>
  //         <input
  //           id='default-checkbox'
  //           type='checkbox'
  //           value=''
  //           className='h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
  //         />
  //         <p className='text-[14px] font-[300] leading-[21px] tracking-[0.15px] text-gray-700'>
  //           I confirm my account deactivation
  //         </p>
  //       </span>
  //       <button
  //         className={`${
  //           disabled
  //             ? 'bg-gray-200 text-gray-400'
  //             : 'group border border-gray-200 bg-white text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:opacity-90'
  //         } mt-4 flex w-max items-center justify-center  gap-2 rounded-[8px] px-[1.1rem] py-[0.3rem] md:px-[1.5rem]`}
  //         disabled={disabled}
  //       >
  //         <span
  //           className='text-[13px] leading-[28px]
  //                   tracking-[0.15px] md:text-[14px] lg:text-[16px]
  //                   '
  //         >
  //           DEACTIVATE ACCOUNT
  //         </span>
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Account;

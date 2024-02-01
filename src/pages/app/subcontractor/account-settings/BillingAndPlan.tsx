import CustomInput from 'components/shadcn/CustomInput';
import { Switch } from 'components/shadcn/switch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Icon from 'utils/Icon';
import { shimmer, toBase64 } from 'utils/general/shimmer';
import masterCard from 'assets/image/mastercard.png';

const BillingAndPlan = () => {
  return (
    <div>
      <p>Billing and Plan</p>
    </div>
  );
  // return (
  //   <div className='flex flex-col'>
  //     <div className='w-100 rounded-md bg-white px-5 py-7 text-[16px] shadow-3 md:text-[17px] lg:text-[18px]'>
  //       <p className='font-semibold text-gray-600'>Current Plan</p>
  //       <div className='mt-5 flex w-full flex-col gap-y-4 lg:flex-row lg:gap-y-0'>
  //         <div className='flex flex-col gap-y-4 lg:w-[50%]'>
  //           <span className='flex flex-col'>
  //             <p className='text-[14px] font-semibold text-gray-600 md:text-[15px] lg:text-[16px]'>
  //               Your Current Plan is Basic
  //             </p>
  //             <p className='mt-1 text-[13px] font-semibold text-gray-400 md:text-[13px] lg:text-[14px]'>
  //               A simple start for everyone
  //             </p>
  //           </span>
  //           <span className='flex flex-col'>
  //             <p className='text-[14px] font-semibold text-gray-600 md:text-[15px] lg:text-[16px]'>
  //               Active until Dec 09, 2021
  //             </p>
  //             <p className='mt-1 text-[13px] font-semibold text-gray-400 md:text-[13px] lg:text-[14px]'>
  //               We will send you a notification upon Subscription expiration
  //             </p>
  //           </span>
  //           <span className='flex flex-col'>
  //             <span className='flex'>
  //               <p className='text-[14px] font-semibold text-gray-600 md:text-[15px] lg:text-[16px]'>
  //                 ₦20 000Per Month
  //               </p>
  //               <p className='ms-1 flex items-center rounded-full bg-primary-light px-3 text-[12px] text-primary-1 md:ms-2 md:text-[13px] lg:text-[13px]'>
  //                 POPULAR
  //               </p>
  //             </span>
  //             <p className='mt-1 text-[13px] font-semibold text-gray-400 md:text-[13px] lg:text-[14px]'>
  //               Standard typeOfUser for small to medium businesses
  //             </p>
  //           </span>
  //         </div>
  //         <div className='mt-2 flex flex-col gap-y-4 lg:mt-0 lg:w-[50%]'>
  //           <span className='flex flex-col'>
  //             <span className='relative rounded-md bg-amber-100 px-3 py-4'>
  //               <span className='absolute top-[10px] h-[40px] w-[40px] rounded-full bg-amber-300'>
  //                 <span className='absolute left-[5px] top-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-amber-500 pb-[1.5px]'>
  //                   <Icon name='cautionIcon' />
  //                 </span>
  //               </span>
  //               <span className='mt-[-6px] flex justify-between ps-12'>
  //                 <span className=''>
  //                   <p className='text-[14px] font-semibold text-amber-500 md:text-[15px] lg:text-[16px]'>
  //                     We need your attention!
  //                   </p>
  //                   <p className='text-[13px] font-semibold text-amber-400 md:text-[13px] lg:text-[14px]'>
  //                     Your typeOfUser requires update
  //                   </p>
  //                 </span>
  //                 <span>
  //                   <Icon
  //                     name='cancelIcon'
  //                     svgProp={{
  //                       className: 'fill-amber-500',
  //                     }}
  //                   />
  //                 </span>
  //               </span>
  //             </span>
  //           </span>
  //           <span className='flex flex-col'>
  //             <span className='flex justify-between'>
  //               <p className='text-[12px] font-semibold text-gray-600 md:text-[13px] lg:text-[14px]'>
  //                 Day
  //               </p>
  //               <p className='text-[12px] font-semibold text-gray-600 md:text-[13px] lg:text-[14px]'>
  //                 24 of 30days
  //               </p>
  //             </span>
  //             <div className='h-2.5 w-full rounded-full bg-gray-200 '>
  //               <div className='h-2.5 rounded-full bg-primary-1' style={{ width: '75%' }}></div>
  //             </div>
  //             <p className='mt-1 text-[12px] font-semibold text-gray-400 md:text-[13px] lg:text-[14px]'>
  //               6 days remaining until your typeOfUser requires update
  //             </p>
  //           </span>
  //         </div>
  //       </div>
  //       <div className='mt-7 flex gap-x-2 md:gap-x-4'>
  //         <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.1rem] py-[0.3rem] transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-[1.5rem]'>
  //           <span className='text-[13px] leading-[28px] tracking-[0.15px] text-white md:text-[14px] lg:text-[16px]'>
  //             SAVE CHANGES
  //           </span>
  //         </button>
  //         <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-[1.1rem] py-[0.3rem] text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:opacity-90 md:px-[1.5rem]'>
  //           <span className='text-[13px] leading-[28px] tracking-[0.15px] md:text-[14px] lg:text-[16px]'>
  //             RESET
  //           </span>
  //         </button>
  //       </div>
  //     </div>
  //     <div className='w-100 mt-7 rounded-md bg-white px-5 py-7 text-[16px] shadow-3 md:text-[17px] lg:text-[18px]'>
  //       <p className='font-semibold text-gray-600'>Payment Methods</p>
  //       <div className='mt-5 flex w-full flex-col gap-y-4 md:gap-y-0 lg:flex-row'>
  //         <div className='mb-5 flex flex-col gap-y-4 lg:mb-0 lg:w-[50%]'>
  //           <div className='flex'>
  //             <div className='mb-4 me-3 flex items-center'>
  //               <input
  //                 id='credit'
  //                 type='radio'
  //                 value=''
  //                 name='credit'
  //                 className='focus:ring-none h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-blue-500'
  //               />
  //               <label
  //                 htmlFor='credit'
  //                 className='ml-[5px] text-[12px] text-gray-500 md:ml-2 md:text-[13px] lg:text-[14px]'
  //               >
  //                 Credit/Debit/ATM Card
  //               </label>
  //             </div>
  //             <div className='mb-4 flex items-center'>
  //               <input
  //                 id='paypal'
  //                 type='radio'
  //                 value=''
  //                 name='paypal'
  //                 className='h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500'
  //               />
  //               <label
  //                 htmlFor='paypal'
  //                 className='ml-[5px] text-[12px] text-gray-500 md:ml-2 md:text-[14px]'
  //               >
  //                 Paypal Account
  //               </label>
  //             </div>
  //           </div>
  //           <div className='flex flex-col'>
  //             <div className='mb-4 flex items-center'>
  //               <CustomInput label='Card Number' type='number' className='w-[100%] lg:w-[90%]' />
  //             </div>
  //             <div className='mb-4 flex w-[100%] flex-col items-center gap-x-4 md:flex-row lg:w-[90%]'>
  //               <div className='mb-4 w-[100%] md:w-[120%]'>
  //                 <CustomInput label='Name' type='text' className='w-[100%]' />
  //               </div>
  //               <div className='mb-4 w-[100%] md:w-[70%]'>
  //                 <CustomInput label='Expiry Date' type='text' className='w-[100%] ' />
  //               </div>
  //               <div className='w-[100%] md:mb-4 md:w-[70%]'>
  //                 <CustomInput label='CVV code' type='password' className='w-[100%]' />
  //               </div>
  //             </div>
  //           </div>

  //           <div className='flex items-center'>
  //             <Switch />
  //             <p className='ml-[5px] text-[12px] text-gray-500 md:ml-2 md:text-[14px]'>
  //               Save card for future billing?
  //             </p>
  //           </div>
  //         </div>
  //         <div className='mt-2 flex flex-col gap-y-4 lg:mt-0 lg:w-[50%]'>
  //           <p className='text-[14px] font-semibold text-gray-600 md:text-[15px] lg:text-[16px]'>
  //             My cards
  //           </p>
  //           <div className='flex flex-col rounded-md bg-gray-100 px-4 py-4'>
  //             <div className='flex flex-col justify-between md:flex-row'>
  //               <div>
  //                 <div>
  //                   <LazyLoadImage
  //                     src={masterCard}
  //                     alt='avatar'
  //                     className='h-max w-max bg-cover bg-top transition-transform duration-300 ease-in-out group-hover:scale-105'
  //                     placeholderSrc={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
  //                   />
  //                 </div>
  //                 <div>
  //                   <p className='mt-1 text-[13px] font-semibold text-gray-600 md:text-[14px] lg:text-[15px]'>
  //                     Tom McBride
  //                   </p>
  //                   <p className='mt-1 text-[12px] font-semibold text-gray-400 md:text-[12px] lg:text-[13px]'>
  //                     **** *** **** 9865
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className='flex flex-col flex-col-reverse md:flex-col'>
  //                 <div className='flex'>
  //                   <button className='group mr-3 flex w-max items-center justify-center gap-2 rounded-[8px] border border-primary-1 bg-gray-100 px-[1.1rem] py-[0.3rem] transition-all duration-300 ease-in-out hover:bg-purple-100 hover:opacity-90 md:px-[1.5rem]'>
  //                     <span className='text-[13px] leading-[28px] tracking-[0.15px] text-primary-1 md:text-[14px] lg:text-[16px]'>
  //                       EDIT
  //                     </span>
  //                   </button>
  //                   <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-gray-100 px-[1.1rem] py-[0.3rem] text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:opacity-90 md:px-[1.5rem]'>
  //                     <span className='text-[13px] leading-[28px] tracking-[0.15px] md:text-[14px] lg:text-[16px]'>
  //                       DELETE
  //                     </span>
  //                   </button>
  //                 </div>
  //                 <div className='mb-3 mt-1 flex  md:mb-0 md:justify-end'>
  //                   <p className='mt-1 text-[12px] font-semibold text-gray-400 md:text-[12px] lg:text-[13px]'>
  //                     Card expires at 12/24
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className='mt-7 flex gap-x-2 md:gap-x-4'>
  //         <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] bg-primary-1 px-[1.1rem] py-[0.3rem] transition-opacity duration-300 ease-in-out hover:opacity-90 md:px-[1.5rem]'>
  //           <span className='text-[13px] leading-[28px] tracking-[0.15px] text-white md:text-[14px] lg:text-[16px]'>
  //             SAVE CHANGES
  //           </span>
  //         </button>
  //         <button className='group flex w-max items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-[1.1rem] py-[0.3rem] text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:opacity-90 md:px-[1.5rem]'>
  //           <span className='text-[13px] leading-[28px] tracking-[0.15px] md:text-[14px] lg:text-[16px]'>
  //             RESET
  //           </span>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BillingAndPlan;

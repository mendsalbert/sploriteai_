'use client';
import useUserSubscription from '@/utils/useUserSubscription';
import { useUser } from '@auth0/nextjs-auth0/client';

import React from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { IconCategory2, IconCloudComputing, IconCloudLockOpen, IconCloudUp, IconFileDownload, IconPhotoDown, IconRulerMeasure, IconWorldWww } from '@tabler/icons-react';
import Link from 'next/link';
const AccountBilling = () => {
  const { user, error } = useUser();

  const { isSubscribed, isLoading, isError } = useUserSubscription(user?.sub);

  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>{isSubscribed ? 'Subscribe 💎' : 'You are a subscriber 🎉'}</h2>
      <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
      <div className='max-w-2xl'>
        <span className='block text-xl font-semibold'>$9.99/Month {isSubscribed ? '(You have access to all these)' : ''}</span>
        <br />
        <div className='grid-col-1 grid gap-2  sm:grid-cols-2 sm:gap-5'>
          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#dbf0e0] sm:h-12 sm:w-12'>
              <IconCloudLockOpen size={30} className='' color='#53ba6b' />
            </span>
            <div>
              <p className='text-md font-medium  text-gray-700 dark:text-white  sm:text-lg'>Unlock all features</p>
              <p className='text-sm text-gray-400'> Get access to all of our features</p>

              {/* <span className='tooltip'>(Search, Prompt library)</span>{' '} */}
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8e1f5] sm:h-12 sm:w-12'>
              <IconPhotoDown size={30} className='' color='#8e55e8' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Image upload to extract text</p>
              <p className='text-sm text-gray-400'>Image to text chat input</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6dbce] sm:h-12 sm:w-12'>
              <IconFileDownload size={30} className='' color='#d55018' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Download output option</p>
              <p className='text-sm text-gray-400'>Download your chat output as PDF.</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#cce6fe] sm:h-12 sm:w-12'>
              <IconWorldWww size={30} className='' color='#3f90ef' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Web search options</p>
              <p className='text-sm text-gray-400'>Google search for current information.</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#faccff] sm:h-12 sm:w-12'>
              <IconCategory2 size={30} className='' color='#ed37fe' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Picture/Video recommendations.</p>
              <p className='text-sm text-gray-400'>
                Find out more infomation <u>here</u>.
              </p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffccd5] sm:h-12 sm:w-12'>
              <IconRulerMeasure size={30} className='' color='#ff7591' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Get longer output content search</p>
              <p className='text-sm text-gray-400'>
                Find more information <u>here</u>{' '}
              </p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdeedb] sm:h-12 sm:w-12'>
              <IconCloudUp size={30} className='' color='#e38c20' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Save course module on cloud</p>
              <p className='text-sm text-gray-400'>Find out more here</p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fcffc1] sm:h-12 sm:w-12'>
              <IconCloudComputing size={30} className='' color='#d1a300' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Save your chats on the cloud</p>
              <p className='text-sm text-gray-400'>Coming soon!</p>
            </div>
          </div>
        </div>
        <div className='pt-10'>
          {isSubscribed ? (
            <Link href={'/subscription'}>
              <ButtonPrimary>Cancel Subscription</ButtonPrimary>
            </Link>
          ) : (
            <Link href={'/subscription'}>
              <ButtonPrimary>Subscribe</ButtonPrimary>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountBilling;

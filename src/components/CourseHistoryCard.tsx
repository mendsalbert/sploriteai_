'use client';
import React, { FC, useState } from 'react';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import Link from 'next/link';
import Logo from '@/shared/Logo';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ArrowsPointingOutIcon, HeartIcon as HeartIconOutline, TrashIcon } from '@heroicons/react/24/outline';
import { estimateReadTime, transformObjectToArray } from '@/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import { removeCourseHistory } from '@/app/reducersSlices/coursReducer';
import ModalSelectDate from './ModalSelectDate';
import NcModal from '@/shared/NcModal';
import ConfirmationDialog from './modal/modal';
export interface CarCardProps {
  className?: string;
  data?: any;
  size?: 'default' | 'small';
}
import { Dialog, Transition } from '@headlessui/react';

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CourseHistoryCard: FC<CarCardProps> = ({ size = 'default', className = '', data = DEMO_DATA }) => {
  const dispatch = useDispatch<any>();
  const { user, error, isLoading } = useUser();
  const courseHistory = useSelector((state: any) => state.course.courses);

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const renderSliderGallery = () => {
    return (
      <div className='relative w-full overflow-hidden rounded-2xl'>
        <div className='aspect-w-16  '>
          {/* <Image
            fill
            src={featuredImage}
            alt="car"
            sizes="(max-width: 640px) 100vw, 350px"
          /> */}
        </div>
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const removeCourseHistoryHandler = () => {
    dispatch(removeCourseHistory(data.id, user));
    // alert("fsdfd");
  };

  const renderContent = () => {
    return (
      <>
        <div className={size === 'default' ? 'space-y-4  p-5' : 'space-y-2  p-3'}>
          <div className='space-y-2'>
            <div className='flex cursor-pointer items-center space-x-2'>
              <h2 className={`  flex w-full flex-row items-center justify-between capitalize ${size === 'default' ? 'text-xl font-semibold' : 'text-base font-medium'}`}>
                <span className='line-clamp-1'>{data?.title?.query}</span>
                <TrashIcon
                  className='h-5 w-5'
                  onClick={() => {
                    setIsOpen(true);
                    // removeCourseHistoryHandler();
                  }}
                />
              </h2>
            </div>
          </div>
          <div className='w-14  border-b border-neutral-100 dark:border-neutral-800'></div>
          <Link
            onClick={() => {
              localStorage.setItem('searchQuery', data?.title?.query);
            }}
            // href={href}
            href={`/course/${data?.title?.query}`}
            className='flex flex-col'
          >
            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold'>
                <div className='flex items-center justify-center rounded-full border border-blue-300 bg-transparent bg-blue-100 py-1 px-2 font-medium text-blue-700 '>
                  <div className='flex max-w-full flex-initial flex-row items-center justify-center space-x-4 text-xs font-normal leading-none dark:text-white'>
                    expand <ArrowsPointingOutIcon className='ml-1 h-3 w-3' />
                  </div>
                </div>
              </span>
              {/* <HeartIconOutline className="h-6 w-6" /> */}
            </div>
          </Link>
        </div>

        <Transition.Root show={isOpen} as={React.Fragment}>
          <Dialog as='div' static className='fixed inset-0 z-10 overflow-y-auto' open={isOpen} onClose={setIsOpen}>
            <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
              <Transition.Child as={React.Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>

              <span className='hidden sm:inline-block sm:h-screen sm:align-middle' aria-hidden='true'>
                &#8203;
              </span>

              <Transition.Child
                as={React.Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Confirm Deletion
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>Are you sure you want to delete this item? This action cannot be undone.</p>
                  </div>

                  <div className='mt-4 flex justify-end space-x-3'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        removeCourseHistoryHandler();
                        setIsOpen(false);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  };

  return (
    <div className={`nc-CarCard group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`} data-nc-id='CarCard'>
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default CourseHistoryCard;

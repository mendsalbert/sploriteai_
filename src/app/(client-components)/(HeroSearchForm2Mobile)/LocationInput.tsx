'use client';

import { addCourseHistory, getCourseHistory } from '@/app/reducersSlices/coursReducer';
import { searchTopicAsync } from '@/app/reducersSlices/searchReducer';
import { MapPinIcon, MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
  onCloseModal?: any;
}

const LocationInput: FC<Props> = ({ onChange = () => {}, className = '', defaultValue = 'calculus', headingText = 'Search for a topic?', onCloseModal = () => {} }) => {
  const [value, setValue] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const dispatch = useDispatch<any>();
  const router = useRouter();

  const onSubmitHandler = () => {
    router.push('/');
    // console.log("button pressed");
    dispatch(searchTopicAsync(value));
    // dispatch(addCourseHistory(value, user));
    localStorage.setItem('searchQuery', value);

    onCloseModal();
  };
  const courseHistory = useSelector((state: any) => state.course.courses);

  useEffect(() => {
    dispatch(getCourseHistory(user));
  }, [user]);

  const handleSelectLocation = (item: any) => {
    setValue(item.title);
    localStorage.setItem('searchQuery', item.title);
    dispatch(searchTopicAsync(item.title));
  };

  const renderSearchValues = ({ heading, items }: { heading: any; items: any[] }) => {
    return (
      <>
        <span
          // key={}
          className='hidden  cursor-pointer items-center space-x-3 px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8'
        >
          <span className='block text-neutral-400'>
            <ClockIcon className='h-6 w-6 sm:h-6 sm:w-6' />
          </span>
        </span>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className='mt-8 p-5'>
        <span className='block text-xl font-semibold sm:text-2xl'>{headingText}</span>
        <div className='relative mt-10'>
          <input
            className={`block w-full truncate rounded-full border border-neutral-900 bg-transparent px-4 py-3 pr-12 font-bold leading-none  placeholder-neutral-500 placeholder:truncate focus:outline-none focus:ring-0 dark:border-neutral-200 dark:placeholder-neutral-300`}
            placeholder={'eg; calculus'}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className='absolute right-2.5 top-1/2 -translate-y-1/2'>
            <MagnifyingGlassIcon
              onClick={() => {
                onSubmitHandler();
              }}
              className='h-5 w-5 rounded-full text-neutral-700 dark:text-neutral-400'
            />
          </span>
        </div>
        <div className='mt-7'>
          {renderSearchValues({
            heading: 'Search History',
            items: courseHistory,
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;

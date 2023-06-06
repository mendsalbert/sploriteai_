'use client';
import { ClockIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';
import React, { useState, useCallback, useRef, useEffect, FC } from 'react';
import ClearDataButton from './ClearDataButton';
import { searchTopicAsync, userTypedSearch } from '@/app/reducersSlices/searchReducer';
import { useDispatch, useSelector } from 'react-redux';

import { useUser } from '@auth0/nextjs-auth0/client';
import { addCourseHistory, getCourseHistory } from '@/app/reducersSlices/coursReducer';

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = 'What do you want to learn?',
  desc = 'eg; Teach me javascript, History of Ghana',
  className = 'nc-flex-1.5',
  divHideVerticalLineClass = 'left-10 -right-0.5',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [showPopover, setShowPopover] = useState(autoFocus);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener('click', eventClickOutsideDiv);
    }
    showPopover && document.addEventListener('click', eventClickOutsideDiv);
    return () => {
      document.removeEventListener('click', eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const { user, error, isLoading } = useUser();

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchQuery', value);
    // console.log('enter key pressed');
    dispatch(searchTopicAsync(value));
    // dispatch(addCourseHistory(value, user));
    setShowPopover(false);
  };

  const courseHistory = useSelector((state: any) => state.course.courses) || [];

  const handleSelectLocation = (item: any) => {
    setValue(item.title?.query);
    localStorage.setItem('searchQuery', item.title?.query);
    dispatch(searchTopicAsync(item.title?.query));
  };

  useEffect(() => {
    dispatch(getCourseHistory(user));
  }, [user]);

  const renderRecentSearches = () => {
    return (
      <>
        <span className=' z-50  hidden cursor-pointer items-center space-x-3 px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8'>
          <span className='block text-neutral-400'>
            <ClockIcon className='h-4 w-4 sm:h-6 sm:w-6' />
          </span>
        </span>
      </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`[ nc-hero-field-padding ] relative z-10 flex flex-1 flex-shrink-0 cursor-pointer items-center space-x-3 text-left focus:outline-none  ${
          showPopover ? 'nc-hero-field-focused' : ''
        }`}
      >
        <div className='text-neutral-300 dark:text-neutral-400'>
          <SparklesIcon className='h-5 w-5 lg:h-7 lg:w-7' />
        </div>
        <div className='flex-grow'>
          <form onSubmit={onSubmitHandler}>
            <input
              className={`block w-full truncate border-none bg-transparent p-0 font-semibold placeholder-neutral-800 focus:placeholder-neutral-300 focus:outline-none focus:ring-0 dark:placeholder-neutral-200 xl:text-lg`}
              placeholder={placeHolder}
              value={value}
              autoFocus={showPopover}
              onChange={(e) => {
                dispatch(userTypedSearch());
                setValue(e.currentTarget.value);
                localStorage.setItem('searchQuery', e.currentTarget.value);
              }}
              ref={inputRef}
            />
          </form>

          <span className='mt-0.5 block text-sm font-light text-neutral-400 '>
            <span className='line-clamp-1'>{value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue('');
              }}
            />
          )}
        </div>
      </div>

      {/* {showPopover && <div className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}></div>} */}

      {/* {showPopover && (
        <div className='absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto'>
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )} */}
      {showPopover &&
        (value ? (
          <div className='absolute left-0 top-full z-40 mt-3 max-h-96 w-full min-w-[300px] overflow-y-auto rounded-3xl bg-white py-3 shadow-xl dark:bg-neutral-800 sm:min-w-[500px] sm:py-6'>
            {renderRecentSearches()}
          </div>
        ) : (
          ''
        ))}
    </div>
  );
};

export default LocationInput;

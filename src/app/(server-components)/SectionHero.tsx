'use client';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import HeroSearchForm from '../(client-components)/(HeroSearchForm)/HeroSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserSubscription from '@/utils/useUserSubscription';
import { getCourseHistory } from '../reducersSlices/coursReducer';

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = '' }) => {
  const { user, error } = useUser();
  const dispatch = useDispatch<any>();

  const { isSubscribed, isLoading, isError } = useUserSubscription(user?.sub);
  const courseHistory = useSelector((state: any) => state.course.courses);
  const uniqueCourses = courseHistory.filter((course: any, index: number) => {
    const currentCourseQuery = course.title.query;
    // Check if the current course query is the same as any previous course query
    const isFirstOccurrence = courseHistory.findIndex((prevCourse: any) => prevCourse.title.query === currentCourseQuery) === index;
    return isFirstOccurrence;
  });
  console.log('Unique courses:', uniqueCourses);
  // const transform = transformObjectToArray(courseHistory) || [];

  useEffect(() => {
    dispatch(getCourseHistory(user));
  }, [user]);
  return (
    <div className={`nc-SectionHero relative flex flex-col-reverse lg:flex-col ${className}`} data-nc-id='SectionHero'>
      <div className='mt-6 flex flex-col lg:flex-row lg:items-center'>
        <div className='flex flex-shrink-0 flex-col items-center space-y-4 pb-14 sm:space-y-4 lg:mr-10 lg:w-full lg:pb-64 xl:mr-0 xl:pr-14'>
          <h2 className='mb-3 font-Michroma text-5xl font-semibold !leading-[50%] tracking-wider text-[#4e44e3]   dark:text-[#6258E7] md:text-6xl xl:text-6xl '>Splorite</h2>
          <span className='text-base text-neutral-500  dark:text-neutral-400 md:text-lg'>explore the right way!</span>
          {!isSubscribed ? (
            <Link href={'subscription'}>
              <span className='-mb-10 rounded-full bg-green-600 px-3 py-1 text-sm text-white'>{uniqueCourses?.length}/15 Queries. Upgrade</span>
              {/* <span className='-mb-10 rounded-full bg-green-600 px-3 py-1 text-sm text-white'>Free trial version</span> */}
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className='z-10 mb-12 hidden w-full lg:mb-0 lg:-mt-60 lg:block'>
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;

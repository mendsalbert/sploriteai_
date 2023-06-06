'use client';

import React, { Fragment, useState, useEffect } from 'react';
import ButtonSecondary from '@/shared/ButtonSecondary';
import getData from '@/firebase/getData';
import getSavedCourse from '@/firebase/saveCourse/getData';
import { useUser } from '@auth0/nextjs-auth0/client';
import { transformObjectToArray } from '@/utils/helpers';
import CourseHistoryCard from '@/components/CourseHistoryCard';

const AccountSavelists = () => {
  const { user, error } = useUser();
  const [savedCourses, setsavedCourses] = useState([]) as any;
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const firebaseData = await getSavedCourse(user?.sub);

      // console.log('fbresultsC', firebaseData);
      // console.log('fbresultsC', transformObjectToArray(firebaseData));
      setsavedCourses(transformObjectToArray(firebaseData));
      // console.log('fbresults', foundData?.results);
      // console.log('reduxSearchResults', reduxSearchResults);
    };
    fetchDataFromFirebase();
  }, [user]);

  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>All saved courses</h2>
      <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
      {/* <div className=" w-max space-y-6"> */}
      <div className={`nc-SectionGridFilterCard`}>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          {/* {isLoading ? <Loading type="points" color="default" size="lg" /> : ""} */}

          {savedCourses?.map((results: any) => <CourseHistoryCard key={results.id} data={results} />).reverse()}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AccountSavelists;

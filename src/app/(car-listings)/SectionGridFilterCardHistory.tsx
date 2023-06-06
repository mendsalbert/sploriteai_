'use client';
import React, { FC, useState, useEffect } from 'react';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import Pagination from '@/shared/Pagination';
import TabFilters from './TabFilters';
import Heading2 from '@/shared/Heading2';
import CarCard from '@/components/CarCard';
// import { Configuration, OpenAIApi } from "openai";
import { useDispatch, useSelector } from 'react-redux';
import { expandTopicAsync, searchTopicAsync } from '../reducersSlices/searchReducer';
import { parseString, transformObjectToArray } from '@/utils/helpers';
import { Loading } from '@nextui-org/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getCourseHistory } from '../reducersSlices/coursReducer';
import CourseHistoryCard from '@/components/CourseHistoryCard';

export interface SectionGridFilterCardProps {
  className?: string;
  data?: CarDataType[];
}

const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.filter((_, i) => i < 12);

const SectionGridFilterCardSearchingHistory: FC<SectionGridFilterCardProps> = ({ className = '', data = DEMO_DATA }) => {
  const { user, error } = useUser();

  const dispatch = useDispatch<any>();
  const courseHistory = useSelector((state: any) => state.course.courses);
  const uniqueCourses = courseHistory.filter((course: any, index: number) => {
    const currentCourseQuery = course.title.query;
    // Check if the current course query is the same as any previous course query
    const isFirstOccurrence = courseHistory.findIndex((prevCourse: any) => prevCourse.title.query === currentCourseQuery) === index;
    return isFirstOccurrence;
  });
  // const transform = transformObjectToArray(courseHistory) || [];

  useEffect(() => {
    dispatch(getCourseHistory(user));
  }, [user]);

  const searchResults = [
    {
      id: 1,
      title: 'Variables and Data Types',
      description: 'Learn about t diffenttypes of data and how to store them in variables.',
    },
    {
      id: 2,
      title: 'Operators and Expressins',
      description: 'Understadow to use operators to manipulate data and create expressions.',
    },
    {
      id: 3,
      title: 'Operators and Expressions',
      description: 'Understand how to use operators to manipulate data and create expressions.',
    },
  ];

  const isLoading = useSelector((state: any) => state.search.isLoading);

  return (
    <div className={`nc-SectionGridFilterCard ${className} `}>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        {uniqueCourses
          ?.filter((results: any) => results.title?.query)
          .map((results: any) => <CourseHistoryCard key={results.id} data={results} />)
          .reverse()}
      </div>
    </div>
  );
};

export default SectionGridFilterCardSearchingHistory;

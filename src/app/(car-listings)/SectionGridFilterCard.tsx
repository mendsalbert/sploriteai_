'use client';
import { useSelector } from 'react-redux';
import React, { FC, useState, useEffect } from 'react';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import Pagination from '@/shared/Pagination';
import TabFilters from './TabFilters';
import Heading2 from '@/shared/Heading2';
import CarCard from '@/components/CarCard';
// import { Configuration, OpenAIApi } from "openai";
import { useDispatch } from 'react-redux';
import { expandTopicAsync, searchTopicAsync } from '../reducersSlices/searchReducer';
import { parseString } from '@/utils/helpers';
import { Loading } from '@nextui-org/react';
const isBrowser = typeof window !== 'undefined';
export interface SectionGridFilterCardProps {
  className?: string;
  data?: CarDataType[];
}

const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.filter((_, i) => i < 12);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({ className = '', data = DEMO_DATA }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state: any) => state.search.topics);

  const isLoading = useSelector((state: any) => state.search.isLoading);
  // useEffect(() => {

  // }, [third])

  const searchQuery = isBrowser ? (localStorage.getItem('searchQuery') as any) : null;

  return (
    <div className={`nc-SectionGridFilterCard ${className} -mt-28`}>
      <Heading2 heading={searchQuery} subHeading={searchQuery?.length > 1 ? 'Expand module' : ' '} className='mx-auto text-center' />

      {isLoading ? (
        <div className='z-50 flex flex-row items-center justify-center'>
          <Loading type='points' color='default' size='lg' />
        </div>
      ) : (
        ''
      )}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        {searchResults.map((results: any) => (
          <CarCard key={results.id} data={results} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;

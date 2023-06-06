'use client';
import React from 'react';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import ListingFlightsPage from '@/app/(flight-listings)/listing-flights/page';
import AuthorPage from '@/app/author/page';

// import { useMediaQuery } from "@material-ui/core";
const Page = ({ params, searchParams }: { params: { stepIndex: string; slug: any; title: any }; searchParams?: { [key: string]: string | string[] | undefined } }) => {
  // console.log(searchParams);

  // console.log(params.slug[0]);
  const decodedString = decodeURIComponent(params?.title[0]);

  console.log('decodedString,', decodedString);
  return (
    <div className=''>
      <BgGlassmorphism />
      <div className='container relative hidden lg:block'>
        <AuthorPage decodedString={decodedString} />
      </div>
      <div className='lg:hidden'>
        <ListingFlightsPage decodedString={decodedString} />
      </div>
    </div>
  );
};

export default Page;

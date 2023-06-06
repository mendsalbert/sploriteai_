'use client';
import React from 'react';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import ListingFlightsPage from '@/app/(flight-listings)/listing-flights/page';
import AuthorPage from '@/app/author/page';

// import { useMediaQuery } from "@material-ui/core";
const Page = ({ params, searchParams }: { params: { stepIndex: string; slug: any }; searchParams?: { [key: string]: string | string[] | undefined } }) => {
  // console.log(searchParams);

  // console.log(params.slug[0]);
  //   const decodedString = decodeURIComponent(params?.slug[0]);

  return (
    <div className=''>
      <BgGlassmorphism />
      {/* <div className='container relative hidden lg:block'>
       
        <AuthorPage decodedString={decodedString} />
      </div>
      <div className='lg:hidden'>
        <ListingFlightsPage decodedString={decodedString} />
      </div> */}
      <p>shit must work</p>
    </div>
  );
};

export default Page;

import React, { FC } from 'react';
import { DEMO_CAR_LISTINGS } from '@/data/listings';
import { CarDataType } from '@/data/types';
import StartRating from '@/components/StartRating';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/shared/Logo';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ArrowsPointingOutIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { estimateReadTime } from '@/utils/helpers';
import { useRouter } from 'next/router';

export interface CarCardProps {
  className?: string;
  data?: any;
  size?: 'default' | 'small';
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCard: FC<CarCardProps> = ({ size = 'default', className = '', data = DEMO_DATA }) => {
  // @ts-ignore
  const {
    // featuredImage,
    // title,
    // href,
    // like,
    // saleOff,
    // isAds,
    // price,
    // reviewStart,
    // reviewCount,
    // seats,
    // gearshift,
    id,
    title,
    description,
  } = data;

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

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'space-y-4  p-5' : 'space-y-2  p-3'}>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <h2 className={`  capitalize ${size === 'default' ? 'text-xl font-semibold' : 'text-base font-medium'}`}>
              <span className='line-clamp-1'>{title}</span>
            </h2>
          </div>
          <div className='flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400'>
            <span className=''> {description} </span>
          </div>
        </div>
        <div className='w-14  border-b border-neutral-100 dark:border-neutral-800'></div>
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
      </div>
    );
  };

  function handleClick() {
    const router = useRouter();
    router.push('/blog/[...slug]', '/blog/css'); // replace 123 with the desired postId parameter
  }

  return (
    <div className={`nc-CarCard group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`} data-nc-id='CarCard'>
      <Link
        // href={href}
        href={`/course/${title}`}
        className='flex flex-col'
      >
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default CarCard;

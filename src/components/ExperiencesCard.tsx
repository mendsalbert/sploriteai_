import React, { FC } from 'react';
import GallerySlider from '@/components/GallerySlider';
import { DEMO_EXPERIENCES_LISTINGS } from '@/data/listings';
import { ExperiencesDataType } from '@/data/types';
import StartRating from '@/components/StartRating';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';

export interface ExperiencesCardProps {
  className?: string;
  ratioClass?: string;
  data?: any;
  size?: 'default' | 'small';
}

const DEMO_DATA: ExperiencesDataType = DEMO_EXPERIENCES_LISTINGS[0];

const ExperiencesCard: FC<ExperiencesCardProps> = ({ size = 'default', className = '', data, ratioClass = 'aspect-w-3 aspect-h-3' }) => {
  console.log('data', data);

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full  overflow-hidden rounded-2xl '>
        <GallerySlider
          uniqueID={`ExperiencesCard_${2}`}
          ratioClass={ratioClass}
          // src={data?.snippet?.thumbnails?.high?.url}
          src={data?.id?.videoId}
          // galleryImgs={galleryImgs}
          href={'href'}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'space-y-3 py-4' : 'space-y-1 p-3'}>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400'>
            {size === 'default' && <MapPinIcon className='h-4 w-4' />}
            <span className=''>{'address'}</span>
          </div>

          <div className='flex items-center space-x-2'>
            {true && <Badge name='ADS' color='green' />}
            <h2 className={` font-medium capitalize ${size === 'default' ? 'text-base' : 'text-base'}`}>
              <span className='line-clamp-1'>{'title'}</span>
            </h2>
          </div>
        </div>
        <div className='border-b border-neutral-100 dark:border-neutral-800'></div>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold'>
            {'price'}
            {` `}
            {size === 'default' && <span className='text-sm font-normal text-neutral-500 dark:text-neutral-400'>/person</span>}
          </span>
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
        </div>
      </div>
    );
  };

  return <div>{renderSliderGallery()}</div>;
};

export default ExperiencesCard;

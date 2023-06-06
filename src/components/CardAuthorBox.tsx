import React, { FC } from 'react';
import { AuthorType } from '@/data/types';
import { StarIcon } from '@heroicons/react/24/solid';
import Avatar from '@/shared/Avatar';
import Badge from '@/shared/Badge';
import Link from 'next/link';
import { IconPrompt } from '@tabler/icons-react';

export interface CardAuthorBoxProps {
  className?: string;
  index?: number;
  author?: any;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({ className = '', index }) => {
  // const { displayName, href = '/', avatar, starRating } = author;
  return (
    <div className={` [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] relative flex w-full flex-col  items-center justify-center bg-black px-3 py-5 text-center sm:px-6 sm:py-7`}>
      <IconPrompt className='' size={30} />
      <div className='mt-3'>
        <h2 className={`text-base font-medium`}>
          <span className='line-clamp-1'>{'name'}</span>
        </h2>
        <span className={`mt-1.5 block text-sm text-neutral-500 dark:text-neutral-400`}>New York</span>
      </div>
    </div>
  );
};

export default CardAuthorBox;

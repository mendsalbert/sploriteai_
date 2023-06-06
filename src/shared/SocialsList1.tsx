import { SocialType } from '@/shared/SocialsShare';
import React, { FC } from 'react';

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: 'Twitter', icon: 'lab la-twitter', href: 'https://twitter.com/sploriteai' },
  { name: 'Youtube', icon: 'lab la-youtube', href: 'https://youtube.com/@Sploriteai' },
  { name: 'Instagram', icon: 'lab la-instagram', href: 'https://instagram.com/sploriteai?igshid=YmMyMTA2M2Y=' },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-2.5' }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a href={item.href} className='group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white' key={index}>
        <i className={item.icon}></i>
        <span className='hidden text-sm lg:block'>{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id='SocialsList1'>
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;

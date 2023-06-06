import { SocialType } from '@/shared/SocialsShare';
import React, { FC } from 'react';

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: 'Twitter', icon: 'lab la-twitter', href: 'https://twitter.com/sploriteai' },
  { name: 'Youtube', icon: 'lab la-youtube', href: 'https://youtube.com/@Sploriteai' },
  { name: 'Instagram', icon: 'lab la-instagram', href: 'https://instagram.com/sploriteai?igshid=YmMyMTA2M2Y=' },
];

const SocialsList: FC<SocialsListProps> = ({ className = '', itemClass = 'block', socials = socialsDemo }) => {
  return (
    <nav className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`} data-nc-id='SocialsList'>
      {socials.map((item, i) => (
        <a key={i} className={`${itemClass}`} href={item.href} target='_blank' rel='noopener noreferrer' title={item.name}>
          <i className={item.icon}></i>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;

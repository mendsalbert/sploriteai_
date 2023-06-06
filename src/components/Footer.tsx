'use client';

import Logo from '@/shared/Logo';
import SocialsList1 from '@/shared/SocialsList1';
import { CustomLink } from '@/data/types';
import React from 'react';
import FooterNav from './FooterNav';
import Link from 'next/link';

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '5',
    title: 'Getting started',
    menus: [{ href: '/faq', label: 'How to use splorite' }],
  },

  {
    id: '2',
    title: 'Resources',
    menus: [
      { href: '/faq', label: 'FAQ' },
      { href: '/help', label: 'Help' },
    ],
  },
  {
    id: '2',
    title: 'Policies',
    menus: [
      { href: '/policy', label: 'Privacy Policy' },
      { href: '/termsofservice', label: 'Term of Service' },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className='text-sm'>
        <h2 className='font-semibold text-neutral-700 dark:text-neutral-200'>{menu.title}</h2>
        <ul className='mt-5 space-y-4'>
          {menu.menus.map((item, index) => (
            <Link href={item.href}>
              <li key={index}>
                <a key={index} className='text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white' href={item.href}>
                  {item.label}
                </a>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className='nc-Footer  relative  border-t border-neutral-200 py-24 dark:border-neutral-700 lg:py-28'>
        <div className='container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 '>
          <div className='col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col'>
            <div className='col-span-2 md:col-span-1'>
              <Logo />
            </div>
            <div className='col-span-2 flex items-center md:col-span-3'>
              <SocialsList1 className='flex items-center space-x-3 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-2.5' />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  );
};

export default Footer;

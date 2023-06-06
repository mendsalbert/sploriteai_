'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Nav = () => {
  const pathname = usePathname();

  const listNav = [
    { name: 'Account', link: '/account' },
    { name: 'Learning Preference', link: '/account-preference' },
    { name: 'History', link: '/account-history' },
    { name: 'Savelist', link: '/account-savelists' },
    { name: 'Account Billing', link: '/account-billing' },
  ];

  return (
    <div className='container'>
      <div className='hiddenScrollbar flex space-x-8 overflow-x-auto md:space-x-14'>
        {listNav.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link key={item.name} href={item.link} className={`block flex-shrink-0 border-b-2 py-5 capitalize md:py-8 ${isActive ? 'border-primary-500 font-medium' : 'border-transparent'}`}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

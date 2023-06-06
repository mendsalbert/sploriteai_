'use client';

import React from 'react';
import ButtonClose from '@/shared/ButtonClose';
import Logo from '@/shared/Logo';
import { Disclosure } from '@headlessui/react';
import { NavItemType } from './NavigationItem';
import { NAVIGATION_DEMO } from '@/data/navigation';
import ButtonPrimary from '@/shared/ButtonPrimary';
import SocialsList from '@/shared/SocialsList';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import SwitchDarkMode from '@/shared/SwitchDarkMode';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

import LangDropdown from '@/app/(client-components)/(Header)/LangDropdown';
import Image from 'next/image';
export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ data = NAVIGATION_DEMO, onClickClose }) => {
  const { user } = useUser();

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className='nav-mobile-sub-menu pl-6 pb-1 text-base'>
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as='li'>
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className='mt-0.5 flex rounded-lg px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800'
            >
              <span className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}>{i.name}</span>
              {i.children && (
                <span className='flex flex-1' onClick={(e) => e.preventDefault()}>
                  <Disclosure.Button as='span' className='flex flex-1 justify-end py-2.5'>
                    <ChevronDownIcon className='ml-2 h-4 w-4 text-neutral-500' aria-hidden='true' />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure key={item.id} as='li' className='text-neutral-900 dark:text-white'>
        <Link
          className='flex w-full rounded-lg px-4 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800'
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}>{item.name}</span>
          {item.children && (
            <span className='flex flex-1' onClick={(e) => e.preventDefault()}>
              <Disclosure.Button as='span' className='flex flex-1 items-center justify-end py-2.5 '>
                <ChevronDownIcon className='ml-2 h-4 w-4 text-neutral-500' aria-hidden='true' />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
      </Disclosure>
    );
  };

  return (
    <div className='h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700'>
      <div className='py-6 px-5'>
        <Logo />
        <div className='mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300'>
          <span>Explore the right way </span>

          <div className='mt-4 flex items-center justify-between'>
            <SocialsList itemClass='w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300' />
            <span className='block'>
              <SwitchDarkMode className='bg-neutral-100 dark:bg-neutral-800' />
            </span>
          </div>
        </div>
        <span className='absolute right-2 top-2 p-1'>
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      {/* <ul className='flex flex-col space-y-1 py-6 px-2'>{data.map(_renderItem)}</ul> */}
      <div className='mx-4 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5'>
        <div className='relative grid grid-cols-1 gap-6 bg-white py-7 px-6 dark:bg-neutral-800'>
          <div className='flex items-center space-x-3'>
            {user && <Image alt='name' className='h-12 w-12 rounded-full' src={user?.picture} width='100' height='100' />}

            <div className='flex-grow'>
              <h4 className='font-semibold'>{user?.name}</h4>
              <p className='mt-0.5 text-xs'>{user?.nickname}</p>
            </div>
          </div>

          <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

          {/* ------------------ 1 --------------------- */}
          <Link
            href={'/account'}
            className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700'
            onClick={() => close()}
          >
            <div className='flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium '>{'My Account'}</p>
            </div>
          </Link>

          {/* ------------------ 2 --------------------- */}
          <Link
            href={'/account-history'}
            className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700'
            onClick={() => close()}
          >
            <div className='flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path d='M8 12.2H15' stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M8 16.2H12.38' stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
                <path
                  d='M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium '>{'My History'}</p>
            </div>
          </Link>

          {/* ------------------ 2 --------------------- */}
          <Link
            href={'/account-savelists'}
            className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700'
            onClick={() => close()}
          >
            <div className='flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium '>{'Saved Courses'}</p>
            </div>
          </Link>

          <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

          {/* ------------------ 2 --------------------- */}
          <Link
            href={'/help'}
            className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700'
            onClick={() => close()}
          >
            <div className='flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4.89999 4.92993L8.43999 8.45993' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M4.89999 19.07L8.43999 15.54' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M19.05 19.07L15.51 15.54' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M19.05 4.92993L15.51 8.45993' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium '>{'Help'}</p>
            </div>
          </Link>
          <a
            href={'/api/auth/logout'}
            className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700'
            onClick={() => close()}
          >
            <div className='flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M15 12H3.62' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M5.85 8.6499L2.5 11.9999L5.85 15.3499' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </div>
            <div className='ml-4'>
              <a href='/api/auth/logout'>
                <p className='text-sm font-medium '>{'Log out'}</p>
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;

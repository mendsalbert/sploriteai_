'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { PathName } from '@/routers/types';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserSubscription from '@/utils/useUserSubscription';
interface SolutionItem {
  name: string;
  description: string;
  href: PathName;
  icon: any;
  active?: boolean;
}

const solutions: SolutionItem[] = [
  {
    name: 'Student Plan',
    description: 'Optimized for students',
    href: '/listing-stay',
    active: true,
    icon: IconOne,
  },
  {
    name: 'Standard Plan',
    description: 'All-round learning',
    href: '/listing-real-estate',
    icon: IconTwo,
  },
  {
    name: 'Professional Plan',
    description: 'Career-focused learning',
    href: '/listing-car',
    icon: IconThree,
  },
  {
    name: 'Developers Plan',
    description: 'Tailored for coders',
    href: '/listing-experiences',
    icon: IconFour,
  },
];

export default function DropdownTravelers() {
  const { user, error } = useUser();

  const { isSubscribed, isLoading, isError } = useUserSubscription(user?.sub);
  return (
    <Popover className='DropdownTravelers relative flex'>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`${open ? '' : 'text-opacity-90'}
                group h-10 self-center rounded-md py-2 text-sm font-medium hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base`}
          >
            <div className={` inline-flex items-center `} role='button'>
              {isSubscribed ? (
                <Link href={'/subscription'}>
                  <span>
                    Splorite<span className='italic text-green-500'>+</span>
                  </span>
                </Link>
              ) : (
                <span>Freetier </span>
              )}
            </div>
          </Popover.Button>
        </>
      )}
    </Popover>
  );
}

function IconFour() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6'>
      <path stroke-linecap='round' stroke-linejoin='round' d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9'
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
      />
    </svg>
  );
}

function IconOne() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
      />
    </svg>
  );
}

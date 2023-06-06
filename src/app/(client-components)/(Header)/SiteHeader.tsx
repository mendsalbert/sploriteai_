'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ShoppingBagIcon as ShoppingCartIcon, Cog8ToothIcon as CogIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { PathName } from '@/routers/types';
import Link from 'next/link';
import Header from './Header';
import Header3 from './Header3';
import { usePathname } from 'next/navigation';
import ButtonPrimary from '@/shared/ButtonPrimary';

export type SiteHeaders = 'Header 1' | 'Header 2' | 'Header 3';

interface HomePageItem {
  name: string;
  slug: PathName;
}

const OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = ['/home-3', '/listing-car-detail', '/listing-experiences-detail', '/listing-stay-detail'];

const SiteHeader = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [headers] = useState<SiteHeaders[]>(['Header 1', 'Header 2', 'Header 3']);
  const [open, setOpen] = useState(false); // or true, depending on your desired initial state
  const [homePages] = useState<HomePageItem[]>([
    { name: 'Home Main', slug: '/' },
    { name: 'Real Estate', slug: '/home-2' },
    { name: 'Home 3', slug: '/home-3' },
  ]);
  const [headerSelected, setHeaderSelected] = useState<SiteHeaders>('Header 2');

  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    setIsTopOfPage(window.pageYOffset < 5);
  }, []);

  const pathname = usePathname();

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    // disconnect the observer
    // observer for show the LINE bellow header
    if (!PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [pathname]);

  // FOR DEMO PAGE
  const renderControlSelections = () => {
    return (
      <div className='ControlSelections relative z-40 block lg:block'>
        <div className={`fixed right-3 bottom-16 z-50 flex items-center`}>
          <a href='/chat'>
            <ButtonPrimary
              className={`z-10 rounded-xl  border  border-primary-6000 bg-primary-6000  p-2.5 shadow-xl hover:bg-primary-700 focus:outline-none ${open ? ' ring-primary-500 focus:ring-2' : ''}`}
            >
              <ChatBubbleLeftRightIcon className='h-8 w-8' color='white' />
            </ButtonPrimary>
          </a>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    let headerClassName = 'shadow-sm dark:border-b dark:border-neutral-700';
    if (PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      headerClassName = isTopOfPage ? '' : 'shadow-sm dark:border-b dark:border-neutral-700';
    }
    return <Header className={headerClassName} navType='MainNav2' />;

    // switch (headerSelected) {
    //   case "Header 1":
    //     return <Header className={headerClassName} navType="MainNav1" />;
    //   case "Header 2":
    //     return <Header className={headerClassName} navType="MainNav2" />;
    //   case "Header 3":
    //     return <Header3 className={headerClassName} />;

    //   default:
    //     return <Header3 className={headerClassName} />;
    // }
  };

  return (
    <>
      {renderControlSelections()}
      {renderHeader()}
      <div ref={anchorRef} className='invisible absolute h-1'></div>
    </>
  );
};

export default SiteHeader;

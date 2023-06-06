'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Square3Stack3DIcon, RectangleStackIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { FC, useState, useEffect } from 'react';
import { expandTopicAsync } from '@/app/reducersSlices/searchReducer';
import { Loading } from '@nextui-org/react';

export interface FlightCardProps {
  className?: string;
  data: {
    title: string;
    content: string;
  };
  setnext: any;
  // isLoading: any;
  // searchResults: any[];
  // onChangeTopic: any;
  // selectedTitle: string;
}

const ModuleCardsLarge: FC<FlightCardProps> = ({ className = '', data, setnext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: any) => state.search.isExpandLoading);
  const searchResults = useSelector((state: any) => state.search.expandedTopics);
  const selectedTitle = useSelector((state: any) => state.search.expandedTitle);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onClick = async () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      await dispatch(expandTopicAsync(data.title));
      setTitle(data.title);
    }
  };

  const onChangeTopic = (title: string) => {
    const result = searchResults.find((item: any) => item.title === title);
    setContent(result.content);
    setTitle(result.title);
    return result ? result.content : '';
  };

  // useEffect(() => {
  //   if (isOpen && !searchResults) {
  //     dispatch(expandTopicAsync(data.title));
  //   }
  // }, [isOpen]);

  const [expandedTopics, setExpandedTopics] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem(title);
    if (cachedData) {
      setExpandedTopics(JSON.parse(cachedData)); // Set state to cached data if it exists
    } else {
      dispatch(expandTopicAsync(data.title)).then((response: any) => {
        setExpandedTopics(response.payload); // Set state to fetched data
      });
    }
  }, [dispatch, title]);

  const renderDetail = () => {
    if (!isOpen) return null;
    return (
      <div className='space-y-2 rounded-2xl border-2 border-neutral-100 p-2 dark:border-neutral-800'>
        {isLoading ? (
          <Loading type='points' />
        ) : (
          expandedTopics
            .filter((item: any) => item.title !== selectedTitle)
            .map((item: any, index: any) => (
              <div
                key={item.title}
                onClick={() => {
                  setnext(item.title);
                  setContent(onChangeTopic(item.title));
                }}
                className={`relative my-0 rounded-xl border-2 border-neutral-100 p-2 dark:border-neutral-800 sm:pr-20 ${className}`}
              >
                <div className='flex flex-col space-y-2 dark:border-neutral-800 sm:flex-row sm:items-center sm:space-y-0'>
                  <div className='flex-shrink-0'>
                    <DocumentIcon className='h-6 w-6' />
                  </div>
                  <div className='hidden min-w-[300px] flex-[0] cursor-pointer lg:block'>
                    <div className='runcate w-64 overflow-hidden pl-2 text-left text-lg font-medium line-clamp-1'>
                      {/* <span className='truncate-ellipsis w-44'>...</span> */}
                      {item.title}
                    </div>
                  </div>
                  <div className='flex-[4] whitespace-nowrap sm:text-right'>
                    <div></div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white
     p-4 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 ${className}`}
    >
      <div className={` relative sm:pr-20  ${className}`}>
        {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href='##' className='absolute inset-0' />

        <span
          className={`absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${
            isOpen ? 'rotate-90 transform' : ''
          }`}
          // onClick={() => {
          //   // settitle(data.title);
          //   // dispatch(expandTopicAsync(data.title));
          //   setIsOpen(!isOpen);
          // }}
          onClick={onClick}
        >
          <i className='las la-angle-right text-xl'></i>
        </span>

        <div className='flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0'>
          {/* LOGO IMG */}
          <div className=' flex-shrink-0'>
            {/* <Image
              src={data.airlines.logo}
              width={40}
              height={40}
              className="w-10"
              alt="air-logo"
              sizes="40px"
            /> */}
            <RectangleStackIcon className='h-6 w-6' />
          </div>

          {/* FOR MOBILE RESPONSIVE */}

          {/* TIME - NAME */}
          <div className='hidden min-w-[300px]  flex-[0] lg:block '>
            <div className='runcate w-64 overflow-hidden pl-2  text-left text-lg font-medium line-clamp-1'>{data.title}</div>
          </div>

          {/* PRICE */}
          <div className='flex-[4] whitespace-nowrap sm:text-right'>
            {/* <div>
              <span className="text-xl font-semibold text-secondary-6000">
                hkhj
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {isOpen ? renderDetail() : ''}
    </div>
  );
};

export default ModuleCardsLarge;

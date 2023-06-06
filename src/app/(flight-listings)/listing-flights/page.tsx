'use client';
import { useDispatch, useSelector } from 'react-redux';
import ModuleGridSmallScreen from '../ModuleGridSmallScreen';
import ExperiencesCard from '@/components/ExperiencesCard';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { Dialog, Transition } from '@headlessui/react';
import getCoursesHistory_ from '@/firebase/courses/getData';
import addSearchHistory from '@/firebase/courses/addData';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tab } from '@headlessui/react';
import { ArrowsPointingOutIcon, ExclamationCircleIcon, LightBulbIcon, PhotoIcon, SpeakerWaveIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import React, { FC, Fragment, useState, useEffect } from 'react';
import { Loading } from '@nextui-org/react';
import { createClient } from 'pexels';
import { detailedTopic, expandTopicAsync, generateExamples, generateQuizOnTopic } from '../../reducersSlices/searchReducer';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import rehypeRaw from 'rehype-raw';
import Confetti from 'react-confetti';
import { useUser } from '@auth0/nextjs-auth0/client';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from '@/components/Markdown/MemoizedReactMarkdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { IconMessageChatbot } from '@tabler/icons-react';
import addCourse from '@/firebase/saveCourse/addData';
import { CodeBlock } from '@/components/Markdown/CodeBlock';
import useUserSubscription from '@/utils/useUserSubscription';

const isBrowser = typeof window !== 'undefined';

const ListingFlightsPage: FC<any> = () => {
  //redux states
  const searchQuery = isBrowser ? (localStorage.getItem('searchQuery') as any) : null;
  const quizResults = useSelector((state: any) => state?.search?.generatedQuiz);
  const generatedQuizLoading = useSelector((state: any) => state?.search?.generatedQuizLoading) || false;

  const isLoading = useSelector((state: any) => state.search.isExpandLoading);
  const isLoading_ = useSelector((state: any) => state.search.isLoading);
  // const searchResults = useSelector((state: any) => state.search.topics) || [];
  const { user } = useUser();
  const dispatch = useDispatch<any>();
  const [searchResults, setSearchResults] = useState([]);
  const reduxSearchResults = useSelector((state: any) => state.search.topics) || [];
  // console.log(searchResults);
  const { isSubscribed, isError } = useUserSubscription(user?.sub);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      const firebaseData = await getCoursesHistory_(user?.sub);
      const foundData = Object?.values(firebaseData).find((item: any) => {
        if (typeof item === 'object' && item.hasOwnProperty('query')) {
          return item.query == searchQuery;
        }
        return false;
      }) as any;

      // console.log('fbresults', foundData);
      // console.log('reduxSearchResults', reduxSearchResults);

      if (firebaseData && foundData?.query === searchQuery) {
        // Data is present in Firebase and matches the current query, update the state
        setSearchResults(foundData?.results);
      } else {
        // Data in Firebase doesn't match the current query or is not present, fetch new data and store it
        const newData = {
          query: searchQuery,
          results: reduxSearchResults,
        };
        await addSearchHistory(user?.sub, newData);
        // setFirebaseData('searchData', newData);

        setSearchResults(reduxSearchResults);
      }
    };

    fetchDataFromFirebase();
  }, [reduxSearchResults, searchQuery, isLoading_, user]);

  // Your component logic...

  const expandedResults = useSelector((state: any) => state.search.detailedTopic) || '';
  const loadingResults = useSelector((state: any) => state.search.isDetailedLoading);
  const generatedExamples = useSelector((state: any) => state.search.generatedExamples) || '';
  const generatedExamplesLoading = useSelector((state: any) => state.search.generatedExamplesLoading) || '';

  //application state
  const [categories] = useState([
    {
      name: 'Explanation',
      icon: <ArrowsPointingOutIcon className='mr-1 h-5 w-5' />,
    },
    { name: 'Video', icon: <VideoCameraIcon className='mr-1 h-5 w-5' /> },
    // { name: "Audio", icon: <SpeakerWaveIcon className="h-5 w-5 mr-1" /> },
    { name: 'Images', icon: <PhotoIcon className='mr-1 h-5 w-5' /> },
    { name: 'Questions', icon: <LightBulbIcon className='mr-1 h-5 w-5' /> },
    // {
    //   name: 'Examples',
    //   icon: <ExclamationCircleIcon className='mr-1 h-5 w-5' />,
    // },
  ]);

  const [title, settitle] = useState(searchResults[0]?.title) as any;
  const [content, setcontent] = useState(searchResults[0]?.content);
  const [quizclicked, setquizclicked] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  //loading states
  const [searchloading, setsearchloading] = useState(false);
  const [videoloading, setvideoloading] = useState(false);
  const [quizloading, setquizloading] = useState(true);

  //videos and images state
  const [images, setImages] = useState([]) as any;
  const [videos, setvideos] = useState([]) as any;

  //functions

  //tabs functions
  const onChangeTopic = (title: any) => {
    const searchQuery = isBrowser ? (localStorage.getItem('searchQuery') as any) : null;
    settitle(title);
    dispatch(detailedTopic({ title, query: searchQuery } as any));
  };

  const search = () => {
    setsearchloading(true);
    const client = createClient('cFTvfmCHfyjrF7wRD6TEOcFgm5oLxkzca6fBZwoV94SLoXd3s7h5sZxP');
    const query = `${searchQuery} ${title}`;

    client.photos.search({ query, per_page: 5 }).then((photos: any) => {
      setImages(photos?.photos);
      setsearchloading(false);
      // console.log(photos);
    });
  };

  const handleSearch = async () => {
    try {
      setvideoloading(true);
      // Search for videos on YouTube
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: `${searchQuery} ${title}`,
          type: 'video',
          maxResults: 5,
          key: 'AIzaSyBsKxUZTofIZgRIvb7bOfTNjM-lbbEUyHo',
        },
      });

      const videos = response.data.items;
      setvideos(videos);
      setvideoloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const generateQuiz = () => {
    setquizloading(true);
    dispatch(generateQuizOnTopic({ title, query: searchQuery } as any));
    setquizloading(false);
  };

  useEffect(() => {
    dispatch(generateQuizOnTopic({ title, query: searchQuery } as any));
  }, [quizloading]);

  const generateExample = () => {
    const searchQuery = isBrowser ? (localStorage.getItem('searchQuery') as any) : null;
    // console.log(title);
    dispatch(generateExamples({ title, query: searchQuery } as any));
  };

  const showToast = () => {
    toast.success('Your course was saved successfully.');
  };

  const onSaveCourseHandler = () => {
    const newData = {
      query: searchQuery,
      results: reduxSearchResults,
    };
    addCourse(user?.sub, newData);
    showToast();
  };

  //image search
  const apiKey = 'AIzaSyCDNBPCnGj61OyzRbLk2ba18HqejrFABL8';
  const cx = '215262e966af841ff';
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${title}&searchType=image&sort=date:r:1`;
  const [results, setResults] = useState([]);
  const [isloading, setisLoading] = useState(false);

  const handleSearchImage = async () => {
    try {
      setisLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      setResults(data.items);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const renderSection1 = () => {
    return (
      <div className='listingSection__wrap mt-40'>
        <div></div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10 mt-40' onClose={closeModal}>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <div className='fixed inset-0 bg-black bg-opacity-25' />
              </Transition.Child>

              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                      <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900'>
                          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                            {title}{' '}
                          </Dialog.Title>
                          <div className='max-h-96 overflow-y-auto'>
                            <Tab.Group>
                              <Tab.List className='flex space-x-1 overflow-x-auto'>
                                {categories.map((item) => (
                                  <Tab key={item.name} as={Fragment}>
                                    {({ selected }) => (
                                      <button
                                        onClick={() => {
                                          if (item.name === 'Video') {
                                            handleSearch();
                                          } else if (item.name === 'Images') {
                                            handleSearchImage();
                                          } else if (item.name === 'Quiz') {
                                            generateQuiz();
                                            settitle(title);
                                            setquizclicked(!quizclicked);
                                          } else if (item.name === 'Examples') {
                                            generateExample();
                                          }
                                        }}
                                        className={`block flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-medium capitalize !leading-none focus:outline-none sm:px-6 sm:py-3 sm:text-base ${
                                          selected
                                            ? 'flex flex-row items-center bg-secondary-900 text-secondary-50 '
                                            : 'flex flex-row items-center  text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
                                        } `}
                                      >
                                        {item.icon}
                                        {item.name}
                                      </button>
                                    )}
                                  </Tab>
                                ))}
                              </Tab.List>
                              <Tab.Panels>
                                <Tab.Panel className=''>
                                  <div className='flex flex-grow flex-col'>
                                    <div className='mb-4 space-y-5'>
                                      <div>
                                        <div className=' sm:mt-2 sm:block'>
                                          <span className='text-base text-neutral-500 dark:text-neutral-400 '>
                                            {loadingResults ? (
                                              <div className='m-auto w-full text-center'>
                                                <Loading type='spinner' color='default' size='lg' />
                                              </div>
                                            ) : (
                                              <>
                                                <MemoizedReactMarkdown
                                                  className='prose mb-7 mt-5  dark:prose-invert sm:mb-0'
                                                  remarkPlugins={[remarkGfm, remarkMath]}
                                                  // rehypePlugins={[rehypeMathjax]}
                                                  components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                      const match = /language-(\w+)/.exec(className || '');

                                                      return !inline && match ? (
                                                        <CodeBlock key={Math.random()} language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                                                      ) : (
                                                        <code className={className} {...props}>
                                                          {children}
                                                        </code>
                                                      );
                                                    },
                                                    table({ children }) {
                                                      return <table className='border-collapse border border-black py-1 px-3 dark:border-white'>{children}</table>;
                                                    },
                                                    th({ children }) {
                                                      return <th className='break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white'>{children}</th>;
                                                    },
                                                    td({ children }) {
                                                      return <td className='break-words border border-black py-1 px-3 dark:border-white'>{children}</td>;
                                                    },
                                                  }}
                                                >
                                                  {expandedResults}
                                                </MemoizedReactMarkdown>
                                                <p
                                                  onClick={() => {
                                                    onChangeTopic(title);
                                                  }}
                                                  className='pt-4'
                                                >
                                                  {expandedResults?.length ? <ArrowPathIcon className='h-7 w-7' /> : ''}
                                                </p>
                                                <Link href={'/chat'}>
                                                  <ButtonPrimary className='mt-3'>
                                                    <IconMessageChatbot size={20} /> Use chatbot
                                                  </ButtonPrimary>
                                                </Link>
                                              </>
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Tab.Panel>
                                <Tab.Panel className=''>
                                  <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7'></div>

                                  {videoloading ? (
                                    <div className='m-auto w-full text-center'>
                                      <Loading type='spinner' color='default' size='lg' />
                                    </div>
                                  ) : (
                                    <div className='mt-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7'>
                                      {isSubscribed ? (
                                        videos?.map((video, index) => <ExperiencesCard key={index} data={video} />)
                                      ) : (
                                        // <div className='m-auto flex w-full items-center justify-center text-center'>
                                        <p className=''>
                                          <a href='/subscription' className='text-blue-400 underline'>
                                            Subscribe
                                          </a>{' '}
                                          to get access to videos
                                        </p>
                                        // </div>
                                      )}
                                    </div>
                                  )}
                                </Tab.Panel>
                                <Tab.Panel className=''>
                                  {isloading ? (
                                    <div className='m-auto w-full text-center'>
                                      <Loading type='spinner' color='default' size='lg' />
                                    </div>
                                  ) : (
                                    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7'>
                                      {isSubscribed ? (
                                        results?.map((items: any, index: any) => (
                                          <Link href={items.image.contextLink}>
                                            <img src={items.link} width={400} height={400} className='rounded-2xl' />
                                          </Link>
                                        ))
                                      ) : (
                                        <p className=''>
                                          <a href='/subscription' className='text-blue-400 underline'>
                                            Subscribe
                                          </a>{' '}
                                          to get access to images
                                        </p>
                                      )}
                                    </div>
                                  )}
                                  {/* <div className='mt-11 flex items-center justify-center'>
                                    <ButtonSecondary>Show me more</ButtonSecondary>
                                  </div> */}
                                </Tab.Panel>
                                <Tab.Panel className=''>
                                  {generatedQuizLoading ? (
                                    <div className='m-auto w-full text-center'>
                                      <Loading type='spinner' color='default' size='lg' />
                                    </div>
                                  ) : (
                                    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 md:gap-7'>
                                      {
                                        <MemoizedReactMarkdown
                                          className='prose mb-7  dark:prose-invert sm:mb-0'
                                          remarkPlugins={[remarkGfm, remarkMath]}
                                          // rehypePlugins={[rehypeMathjax]}
                                          components={{
                                            code({ node, inline, className, children, ...props }) {
                                              const match = /language-(\w+)/.exec(className || '');

                                              return !inline && match ? (
                                                <CodeBlock key={Math.random()} language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                                              ) : (
                                                <code className={className} {...props}>
                                                  {children}
                                                </code>
                                              );
                                            },
                                            table({ children }) {
                                              return <table className='border-collapse border border-black py-1 px-3 dark:border-white'>{children}</table>;
                                            },
                                            th({ children }) {
                                              return <th className='break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white'>{children}</th>;
                                            },
                                            td({ children }) {
                                              return <td className='break-words border border-black py-1 px-3 dark:border-white'>{children}</td>;
                                            },
                                          }}
                                        >
                                          {quizResults}
                                        </MemoizedReactMarkdown>
                                      }
                                    </div>
                                  )}
                                  <div className='mt-11 flex items-center justify-center'>
                                    <ButtonSecondary
                                      onClick={() => {
                                        generateQuiz();
                                      }}
                                    >
                                      <ArrowPathIcon className='h-6 w-6' />
                                    </ButtonSecondary>
                                  </div>
                                </Tab.Panel>
                                <Tab.Panel className=''>
                                  {generatedExamplesLoading ? (
                                    <div className='m-auto w-full text-center'>
                                      <Loading type='spinner' color='default' size='lg' />
                                    </div>
                                  ) : (
                                    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 md:gap-7'>
                                      <MemoizedReactMarkdown
                                        className='prose mb-7  dark:prose-invert sm:mb-0'
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                        // rehypePlugins={[rehypeMathjax]}
                                        components={{
                                          code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');

                                            return !inline && match ? (
                                              <CodeBlock key={Math.random()} language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                                            ) : (
                                              <code className={className} {...props}>
                                                {children}
                                              </code>
                                            );
                                          },
                                          table({ children }) {
                                            return <table className='border-collapse border border-black py-1 px-3 dark:border-white'>{children}</table>;
                                          },
                                          th({ children }) {
                                            return <th className='break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white'>{children}</th>;
                                          },
                                          td({ children }) {
                                            return <td className='break-words border border-black py-1 px-3 dark:border-white'>{children}</td>;
                                          },
                                        }}
                                      >
                                        {generatedExamples}
                                      </MemoizedReactMarkdown>
                                    </div>
                                  )}

                                  <div className='mt-11 flex items-center justify-center'>
                                    <ButtonSecondary
                                      onClick={() => {
                                        // generateQuiz();
                                      }}
                                    >
                                      <ArrowPathIcon className='h-6 w-6' />
                                    </ButtonSecondary>
                                  </div>
                                </Tab.Panel>
                              </Tab.Panels>
                            </Tab.Group>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      </div>
    );
  };

  return (
    <div className=' flex w-full flex-col space-y-6 rounded-full border-neutral-200 py-2 px-4 dark:border-neutral-700 sm:space-y-7 sm:rounded-2xl sm:border sm:p-2 xl:p-2'>
      {/* <BgGlassmorphism /> */}

      <h2 className='pt-2 text-left text-2xl font-semibold'>{searchQuery}</h2>
      <ButtonPrimary
        onClick={() => {
          onSaveCourseHandler();
        }}
      >
        Save course
      </ButtonPrimary>

      <ModuleGridSmallScreen
        results={searchResults}
        isLoading={isLoading}
        openModal={openModal}
        setnext={(title: any) => {
          onChangeTopic(title);
        }}
      />
      {renderSection1()}
    </div>
  );
};

export default ListingFlightsPage;

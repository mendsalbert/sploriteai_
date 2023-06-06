import { Prompt } from '@/types/prompt';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import data from '../../../utils/prompt';
import { convertDataToObject } from '@/utils/helpers';
import { Dialog } from '@headlessui/react';
import { Avatar } from '@nextui-org/react';
import CardAuthorBox from '../CardAuthorBox';
import { IconLink, IconLoader2, IconMessageForward, IconPhoto, IconPrompt, IconTrash, IconUpload } from '@tabler/icons-react';

interface Props {
  onClose: () => void;
}

export const GoogleSearchComponent: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation('promptbar');

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(true);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const apiKey = 'AIzaSyCDNBPCnGj61OyzRbLk2ba18HqejrFABL8';
  const cx = '215262e966af841ff';
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&sort=date:r:1`;

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (query.length < 1) {
      alert('input string cant be empty');
      return;
    }
    try {
      setisLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data.items);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className='  h-[80%] w-[100%] overflow-scroll  overflow-x-hidden rounded-xl bg-[#0d131f] p-4 shadow-2xl sm:w-[70%] '>
          <div className='space-y-4'>
            <div className='!important relative flex w-full flex-grow  flex-row items-center rounded-xl border  border-gray-900/50 bg-[#1f2937] px-2 text-white shadow-[0_0_10px_rgba(0,0,0,0.10)]  outline-none focus:outline-none dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
              <textarea
                className='
out m-0 w-full resize-none
            border-0 bg-transparent p-0 py-4 pr-8 pl-2  text-white outline-none  focus:border-sky-500 focus:outline-none focus:ring-0 focus:ring-sky-500 dark:bg-transparent md:py-3 md:pl-4'
                style={{
                  resize: 'none',
                  //   bottom: `${textareaRef?.current?.scrollHeight}px`,
                  outline: 'none',
                  maxHeight: '400px',
                  //   overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'}`,
                }}
                placeholder={t('enter a query') || ''}
                // value={content}
                rows={1}
                onChange={handleInputChange}
                // onCompositionStart={() => setIsTyping(true)}
                // onCompositionEnd={() => setIsTyping(false)}
                // onChange={handleChange}
                onKeyDown={handleKeyDown}
              />

              {/* <button className=' text-neutral-800  hover:text-neutral-200' onClick={handleSearch}> */}
              <IconMessageForward size={20} className='mr-2' onClick={handleSearch} />
              {/* </button> */}
            </div>
            {/* <input type='text' className='text-black' value={query} onChange={handleInputChange} /> */}
            {isloading ? (
              <span className='mx-auto flex h-full w-full flex-row items-center justify-center'>
                <IconLoader2 size={30} color='white' className='mt-20 animate-spin' />
              </span>
            ) : (
              results
                .slice(0, 5)
                .map((result: any) => (
                  <div key={result.cacheId} className=' w-full  rounded-xl bg-[#080d14] p-3 text-white'>
                    <h2 className='text-lg font-bold'>{result.title}</h2>
                    <p className='text-blue-400'>{result.snippet}</p>
                    <span className='flex flex-row items-center space-x-1'>
                      <IconLink size={20} />
                      <a href={result.link} target='_blank' rel='noreferrer' className='truncate'>
                        {result.link}
                      </a>
                    </span>
                  </div>
                ))
                .reverse()
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

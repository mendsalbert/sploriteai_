import { Prompt } from '@/types/prompt';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import data from '../../../utils/prompt';
import { convertDataToObject } from '@/utils/helpers';
import { Dialog } from '@headlessui/react';
import { Avatar } from '@nextui-org/react';
import CardAuthorBox from '../CardAuthorBox';
import { IconPrompt } from '@tabler/icons-react';

interface Props {
  prompt: Prompt;
  onClose: () => void;
  onUpdatePrompt: (prompt: Prompt) => void;
}

export const PromptModal: FC<Props> = ({ prompt, onClose, onUpdatePrompt }) => {
  const { t } = useTranslation('promptbar');
  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [content, setContent] = useState(prompt.content);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const prompts = convertDataToObject(data);
  const [query, setQuery] = useState('');

  const filteredPrompts = prompts.filter((prompt: any) => prompt.name.toLowerCase().includes(query.toLowerCase()) || prompt.description.toLowerCase().includes(query.toLowerCase()));

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onUpdatePrompt({ ...prompt, name, description, content: content.trim() });
      onClose();
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  // console.log(prompts);

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
        <Dialog.Panel
          className='dark:bg-white- mx-auto h-[85%] w-[95%] overflow-scroll rounded-xl bg-[#0d131f] shadow-2xl sm:w-[45%]
        
        '
        >
          {/* <Dialog.Title>Complete your order</Dialog.Title> */}
          <div className='bg-dark w-full p-3 px-8 py-8  '>
            <div className='flex h-full w-full flex-col'>
              {/* <div className='flex items-center justify-between bg-gray-200 px-4 py-2'> */}
              <input
                className=' m-0 w-full  resize-none rounded-xl border-2 bg-[#111827] p-0 py-4
 pr-8 pl-2 text-white  shadow-[0_0_10px_rgba(0,0,0,0.10)]  outline-none  focus:border-sky-500 focus:outline-none focus:ring-0 focus:ring-sky-500    md:py-3 md:pl-4'
                type='text'
                placeholder='Search prompts...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* </div> */}
              <div className='flex overflow-x-scroll pb-2'>
                {filteredPrompts.map((prompt: any, index: any) => (
                  <div
                    key={prompt.id}
                    className=' flex-shrink-0 cursor-pointer pt-3 pr-3'
                    onClick={() => {
                      setName(prompt.name);
                      setDescription(prompt.description);
                      setContent(prompt.content);
                    }}
                  >
                    <div className={`h-full w-full rounded-2xl  border border-gray-100  bg-[#1f2937] bg-opacity-10 bg-clip-padding p-4 shadow-lg backdrop-blur-sm backdrop-filter`}>
                      <IconPrompt size={40} color='white' />
                      <h2 className='mb-1 text-xl font-medium text-white'>{prompt.name}</h2>
                      <p className='text-white'>{prompt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='pb-2 text-sm font-bold text-white dark:text-neutral-200'>{t('Name')}</div>
            <input
              ref={nameInputRef}
              className=' m-0 w-full  resize-none rounded-xl border-2 bg-[#111827] p-0 py-4
 pr-8 pl-2 text-white  shadow-[0_0_10px_rgba(0,0,0,0.10)]  outline-none  focus:border-sky-500 focus:outline-none focus:ring-0 focus:ring-sky-500    md:py-3 md:pl-4'
              placeholder={t('A name for your prompt.') || ''}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className='mt-4 pb-2 text-sm font-bold text-white dark:text-neutral-200'>{t('Description')}</div>
            <textarea
              className='out border-neutral/80 m-0  w-full  resize-none rounded-xl border-2 bg-transparent p-0 py-4
 pr-8 pl-2 text-white  shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:border-gray-900/50  dark:bg-[#1f2937] dark:bg-transparent dark:text-white  dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4'
              style={{ resize: 'none' }}
              placeholder={t('A description for your prompt.') || ''}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />

            <div className='mt-2 pb-2 text-sm font-bold text-white dark:text-neutral-200'>{t('Prompt')}</div>
            <textarea
              className='out border-neutral/80 m-0  w-full resize-none rounded-xl border-2 bg-transparent p-0 py-4
 pr-8 pl-2 text-white  shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:border-gray-900/50  dark:bg-[#1f2937] dark:bg-transparent dark:text-white  dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4'
              style={{ resize: 'none' }}
              placeholder={t('Prompt content. Use {{}} to denote a variable. Ex: {{name}} is a {{adjective}} {{noun}}') || ''}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />

            <button
              type='button'
              className='mt-6 w-full rounded-lg  bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none dark:border-neutral-800  dark:bg-white dark:text-black dark:hover:bg-neutral-300'
              onClick={() => {
                const updatedPrompt = {
                  ...prompt,
                  name,
                  description,
                  content: content.trim(),
                };

                onUpdatePrompt(updatedPrompt);
                onClose();
              }}
            >
              {t('Save')}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

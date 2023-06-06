import { Prompt } from '@/types/prompt';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import data from '../../../utils/prompt';
import { convertDataToObject } from '@/utils/helpers';
import { Dialog } from '@headlessui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { IconCategory2, IconCloudComputing, IconCloudLockOpen, IconCloudUp, IconFileDownload, IconPhotoDown, IconRulerMeasure, IconWorldWww } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { PaymentModal } from '../Payment/PaymentModal';
const stripePromise = loadStripe('pk_test_51MuO5aKgbteJZDnRWBpLmmISznqNLicPpvRbvbIgJwgTJnRQTHHQ7xZwACYiqraAio5VcWTtdD42dUe59IO0Svpk00WDixqE3k');
interface Props {
  onClose: () => void;
}

export const UpgradeModal: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation('promptbar');
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const prompts = convertDataToObject(data);

  const [isOpen, setIsOpen] = useState(true);
  const [IsOpen, setisOpen] = useState(false);

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
        <Dialog.Panel className='dark:bg-white- mx-auto  h-[68%] w-[100%]  overflow-scroll rounded-xl bg-[#0d131f] p-4 text-left shadow-2xl sm:w-[55%]'>
          <p className='py-2 pb-6 text-center text-2xl font-bold text-white sm:text-3xl'>$9.99/Month</p>
          <div className='grid-col-1 grid gap-2  sm:grid-cols-2 sm:gap-5'>
            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#dbf0e0] sm:h-12 sm:w-12'>
                <IconCloudLockOpen size={30} className='' color='#53ba6b' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Unlock all features</p>
                <p className='text-sm text-gray-400'> Get access to all of our features</p>

                {/* <span className='tooltip'>(Search, Prompt library)</span>{' '} */}
              </div>
            </div>

            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8e1f5] sm:h-12 sm:w-12'>
                <IconPhotoDown size={30} className='' color='#8e55e8' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Image upload to extract text</p>
                <p className='text-sm text-gray-400'>Image to text chat input</p>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6dbce] sm:h-12 sm:w-12'>
                <IconFileDownload size={30} className='' color='#d55018' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Download output option</p>
                <p className='text-sm text-gray-400'>Download your chat output as PDF.</p>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#cce6fe] sm:h-12 sm:w-12'>
                <IconWorldWww size={30} className='' color='#3f90ef' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Web search options</p>
                <p className='text-sm text-gray-400'>Google search for current information.</p>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#faccff] sm:h-12 sm:w-12'>
                <IconCategory2 size={30} className='' color='#ed37fe' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Picture/Video recommendations.</p>
                <p className='text-sm text-gray-400'>
                  Find out more infomation <u>here</u>.
                </p>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffccd5] sm:h-12 sm:w-12'>
                <IconRulerMeasure size={30} className='' color='#ff7591' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Get longer output content search</p>
                <p className='text-sm text-gray-400'>
                  Find more information <u>here</u>{' '}
                </p>
              </div>
            </div>
            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdeedb] sm:h-12 sm:w-12'>
                <IconCloudUp size={30} className='' color='#e38c20' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Save course module on cloud</p>
                <p className='text-sm text-gray-400'>Find out more here</p>
              </div>
            </div>
            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fcffc1] sm:h-12 sm:w-12'>
                <IconCloudComputing size={30} className='' color='#d1a300' />
              </span>
              <div>
                <p className='text-md font-medium sm:text-lg'>Save your chats on the cloud</p>
                <p className='text-sm text-gray-400'>Coming soon!</p>
              </div>
            </div>
          </div>
          <form action='/api/checkout_sessions' method='POST'>
            <ButtonPrimary className='mt-5 w-full'>Subscribe</ButtonPrimary>
          </form>
        </Dialog.Panel>
      </div>
      {IsOpen && <PaymentModal onClose={() => setIsOpen(false)} />}
    </Dialog>
  );
};

import { Prompt } from '@/types/prompt';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import data from '../../../utils/prompt';
import { convertDataToObject } from '@/utils/helpers';
import { Dialog } from '@headlessui/react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentCancleForm from './PaymentCancleForm';
interface Props {
  onClose: () => void;
}

const stripePromise = loadStripe('pk_test_51MuO5aKgbteJZDnRWBpLmmISznqNLicPpvRbvbIgJwgTJnRQTHHQ7xZwACYiqraAio5VcWTtdD42dUe59IO0Svpk00WDixqE3k');

export const PaymentCancleModal: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation('promptbar');

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const prompts = convertDataToObject(data);

  const [isOpen, setIsOpen] = useState(true);

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
    <Dialog open={isOpen} onClose={() => {}} className='relative z-50'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className='mx-auto  w-[100%] overflow-scroll  rounded-xl bg-white p-4 text-left shadow-2xl dark:bg-[#0d131f] sm:w-[55%]'>
          <Elements stripe={stripePromise}>
            <PaymentCancleForm />
          </Elements>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

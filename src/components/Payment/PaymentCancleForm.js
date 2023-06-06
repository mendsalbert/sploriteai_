import { CardElement, PaymentElement, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { IconLink, IconLoader2, IconMail, IconMessageForward, IconPhoto, IconPrompt, IconTrash, IconUpload, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Confetti from 'react-confetti';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import useUserSubscription from '@/utils/useUserSubscription';
import { useRouter } from 'next/navigation';
import updateData from '@/firebase/updateData';

function PaymentCancleForm() {
  const [name, setName] = useState('');
  const { user, isLoading } = useUser();
  const { isSubscribed, subscriptionId, isError } = useUserSubscription(user?.sub);

  const [email, setEmail] = useState('');
  const [paymentComplete, setpaymentComplete] = useState(false);
  const [isloading, setisloading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation('promptbar');
  const router = useRouter();

  const CARD_ELEMENT_OPTIONS = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        iconColor: 'rgb(240, 57, 122)',
        color: '#808080',
        fontSize: '16px',
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#808080',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    },
  };

  async function cancelSubscription(subscriptionId) {
    try {
      setisloading(true);
      const response = await fetch('/api/cancleSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const data = await response.json();
      console.log(data);
      await updateData('users', user.sub, {
        isSubscribed: false,
        stripeSubscriptionStatus: 'canceled',
      });
      setisloading(false);
      alert('Subscription successfully canceled');
      setpaymentComplete(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (paymentComplete) {
    router.push('/');
  }

  return (
    <div style={{ width: '100%' }} className='space-y-4 text-white'>
      <p className='py-2 pb-6 text-center text-2xl font-bold text-gray-700 dark:text-white sm:text-2xl'>cancel $9.99/Month?</p>

      <ButtonPrimary
        onClick={() => {
          cancelSubscription(subscriptionId);
        }}
        className='mt-5 w-full'
      >
        {isloading ? <IconLoader2 className='animate-spin' /> : 'Confirm '}
      </ButtonPrimary>
      {/* <button onClick={createSubscription}>Subscribe - 17.99 USD</button> */}
    </div>
  );
}

export default PaymentCancleForm;

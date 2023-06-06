import { CardElement, PaymentElement, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { IconLink, IconLoader2, IconMail, IconMessageForward, IconPhoto, IconPrompt, IconTrash, IconUpload, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Confetti from 'react-confetti';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
// import Stripe from 'stripe';

function PaymentForm() {
  const [name, setName] = useState('');
  const { user, isLoading } = useUser();

  const [email, setEmail] = useState('');
  const [paymentComplete, setpaymentComplete] = useState(false);
  const [isloading, setisloading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation('promptbar');

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

  // const createSubscription = async () => {
  //   if (name.length < 1 || email.length < 1) {
  //     alert('All fields are required');
  //     return;
  //   }
  //   setisloading(true);
  //   try {
  //     const paymentMethod = await stripe.createPaymentMethod({
  //       card: elements.getElement('card'),
  //       type: 'card',
  //       billing_details: {
  //         name,
  //         email,
  //       },
  //     });

  //     const response = await fetch('/api/subscribe', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         paymentMethod: paymentMethod.paymentMethod.id,
  //         auth0_user_id: user ? user.sub : '',
  //       }),
  //     });

  //     if (!response.ok) {
  //       setisloading(false);
  //       return alert('Payment unsuccessful!');
  //     }

  //     const data = await response.json();
  //     const confirm = await stripe.confirmCardPayment(data.clientSecret);
  //     if (confirm.error) {
  //       setisloading(false);
  //       return alert('Payment unsuccessful!');
  //     }
  //     alert('Payment Successful! Subscription active.');
  //     setpaymentComplete(true);
  //   } catch (err) {
  //     console.error(err);
  //     alert('Payment failed! ' + err.message);
  //     setisloading(false); // Stop the loading spinner in case of error
  //   }
  // };

  // ...

  const createSubscription = async () => {
    if (name.length < 1 || email.length < 1) {
      alert('All fields are required');
      return;
    }
    setisloading(true);
    try {
      // Fetch the SetupIntent's client secret from your server
      const setupIntentResponse = await fetch('/api/create-setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth0_user_id: user ? user.sub : '',
        }),
      });
      const setupIntentData = await setupIntentResponse.json();
      console.log('setupIntentResponse', setupIntentResponse);

      // Confirm the SetupIntent and attach the payment method to it
      const confirmResult = await stripe.confirmCardSetup(setupIntentData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (confirmResult.error) {
        setisloading(false);
        return alert('Payment setup unsuccessful!');
      }

      const paymentMethod = confirmResult.setupIntent.payment_method;

      console.log('paymentMethod', paymentMethod);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          paymentMethod,
          auth0_user_id: user ? user.sub : '',
        }),
      });

      if (!response.ok) {
        setisloading(false);
        return alert('Payment unsuccessful!');
      }

      alert('Payment Successful! Subscription active.');
      setpaymentComplete(true);
    } catch (err) {
      console.error(err);
      alert('Payment failed! ' + err.message);
      setisloading(false); // Stop the loading spinner in case of error
    }
  };

  // ...

  if (paymentComplete) {
    return (
      <div style={{ width: '100%' }} className='space-y-4 text-white'>
        <Confetti />
        <p className='py-2 pb-0 text-center text-3xl font-bold text-gray-700 dark:text-white sm:text-4xl'>Congratulation 🎉</p>
        <p className='py-2  text-center text-lg  text-gray-700 dark:text-white sm:text-xl'>Thank you for subscribing to splorite! We have interesting features coming your way</p>
        <a href='/'>
          <ButtonPrimary className='mt-5 w-full'>Close</ButtonPrimary>
        </a>
        {/* <button onClick={createSubscription}>Subscribe - 17.99 USD</button> */}
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }} className='space-y-4 text-white'>
      <p className='py-2 pb-6 text-center text-2xl font-bold text-gray-700 dark:text-white sm:text-2xl'>$9.99/Month</p>

      <div className='!important relative flex w-full flex-grow  flex-row items-center rounded-xl border  border-neutral-50 bg-neutral-100 px-2 text-white shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:outline-none  dark:border-gray-900/50 dark:bg-[#1f2937] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
        <input
          className='
out m-0 w-full resize-none
            border-0 bg-transparent p-0 py-4 pr-8 pl-2  text-gray-700 outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:bg-transparent dark:text-white md:py-3 md:pl-4'
          style={{
            resize: 'none',
            outline: 'none',
            maxHeight: '400px',
          }}
          placeholder={t('Enter your name') || ''}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
        />

        <IconUser size={20} className='mr-2' color='#808080' />
      </div>
      <div className='!important relative flex w-full flex-grow  flex-row items-center rounded-xl border  border-neutral-50 bg-neutral-100 px-2 text-white shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:outline-none  dark:border-gray-900/50 dark:bg-[#1f2937] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
        <input
          className='
out m-0 w-full resize-none
            border-0 bg-transparent p-0 py-4 pr-8 pl-2  text-gray-700 outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:bg-transparent dark:text-white md:py-3 md:pl-4'
          style={{
            resize: 'none',
            outline: 'none',
            maxHeight: '400px',
          }}
          placeholder={t('Enter your email') || ''}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <IconMail size={20} className='mr-2' color='#808080' />
      </div>

      <div className='rounded-2xl border-gray-900/50 bg-neutral-100 py-4 pr-8 pl-2 dark:bg-[#1f2937]'>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <ButtonPrimary onClick={createSubscription} className='mt-5 w-full'>
        {isloading ? <IconLoader2 className='animate-spin' /> : 'Confirm Payment'}
      </ButtonPrimary>
      {/* <button onClick={createSubscription}>Subscribe - 17.99 USD</button> */}
    </div>
  );
}

export default PaymentForm;

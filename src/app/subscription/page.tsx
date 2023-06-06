'use client';
import { CheckIcon } from '@heroicons/react/24/solid';
import React, { FC, useState, useEffect } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Link from 'next/link';
import { getUserData, updateUserData } from '@/app/reducersSlices/authReducer';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';

import { IconCategory2, IconCloudComputing, IconCloudLockOpen, IconCloudUp, IconFileDownload, IconPhotoDown, IconRulerMeasure, IconWorldWww } from '@tabler/icons-react';
import { PaymentModal } from '@/components/Payment/PaymentModal';
import { PaymentCancleModal } from '@/components/Payment/PaymentCancleModal';
import { loadStripe } from '@stripe/stripe-js';
import updateData from '@/firebase/updateData';

export interface PageSubcriptionProps {}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
  link: string;
}

// const pricings: PricingItem[] = [
//   {
//     isPopular: false,
//     name: "Student ",
//     pricing: "$20.99",
//     per: "/mo",
//     features: ["Automated Reporting", "Faster Processing", "Customizations"],
//     desc: ` Literally you probably haven't heard of them jean shorts.`,
//     link: "https://buy.stripe.com/test_dR63fvcJY69Sa7C6oo",
//   },
//   {
//     isPopular: false,
//     name: "Developers",
//     pricing: "$35.99",
//     per: "/mo",
//     features: [
//       "Everything in Basic",
//       "Unlimited Builds",
//       "Advanced Analytics",
//       "Company Evaluations",
//     ],
//     desc: ` Literally you probably haven't heard of them jean shorts.`,
//     link: "https://buy.stripe.com/test_dR63fvcJY69Sa7C6oo",
//   },
//   {
//     isPopular: true,
//     name: "Standard ",
//     pricing: "$30.99",
//     per: "/mo",
//     features: [
//       "Everything in Starter",
//       "100 Builds",
//       "Progress Reports",
//       "Premium Support",
//     ],
//     desc: ` Literally you probably haven't heard of them jean shorts.`,
//     link: "https://buy.stripe.com/test_dR63fvcJY69Sa7C6oo",
//   },
//   {
//     isPopular: false,
//     name: "Professional",
//     pricing: "$40.99",
//     per: "/mo",
//     features: [
//       "Everything in Basic",
//       "Unlimited Builds",
//       "Advanced Analytics",
//       "Company Evaluations",
//     ],
//     desc: ` Literally you probably haven't heard of them jean shorts.`,
//     link: "https://buy.stripe.com/test_dR63fvcJY69Sa7C6oo",
//   },
// ];

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PageSubcription: FC<PageSubcriptionProps> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [IsOpen, setisOpen] = useState(false);
  const [IsOpenCancel, setisOpenCancel] = useState(false);
  const dispatch = useDispatch<any>();
  const { user, error } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(getUserData(user));
    }
  }, [user]);
  const user_ = useSelector((state: any) => state.auth?.user?.result) as any;

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  return (
    <div className={`nc-PageSubcription container pb-24 lg:pb-32 `}>
      <header className='mx-auto my-20 max-w-2xl text-center'>
        <h2 className='flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]'>
          <span className='mr-4 text-3xl leading-none md:text-4xl'>💎</span>
          Subscription
        </h2>
        <span className='mt-2 block text-sm text-neutral-700 dark:text-neutral-200 sm:text-base'>Subscribe and enjoy amazing features on splorite</span>
      </header>
      <section className='overflow-hidden text-sm text-neutral-600 md:text-base'>
        {/* <div className="grid lg:grid-cols-4 gap-5 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div> */}
        <p className='py-2 pb-6 text-center text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl'>$9.99/Month</p>
        <div className='grid-col-1 grid gap-2  sm:grid-cols-2 sm:gap-5'>
          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#dbf0e0] sm:h-12 sm:w-12'>
              <IconCloudLockOpen size={30} className='' color='#53ba6b' />
            </span>
            <div>
              <p className='text-md font-medium  text-gray-700 dark:text-white  sm:text-lg'>Unlock all features</p>
              <p className='text-sm text-gray-400'> Get access to all of our features</p>

              {/* <span className='tooltip'>(Search, Prompt library)</span>{' '} */}
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8e1f5] sm:h-12 sm:w-12'>
              <IconPhotoDown size={30} className='' color='#8e55e8' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Image upload to extract text</p>
              <p className='text-sm text-gray-400'>Image to text chat input</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6dbce] sm:h-12 sm:w-12'>
              <IconFileDownload size={30} className='' color='#d55018' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Download output option</p>
              <p className='text-sm text-gray-400'>Download your chat output as PDF.</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#cce6fe] sm:h-12 sm:w-12'>
              <IconWorldWww size={30} className='' color='#3f90ef' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Web search options</p>
              <p className='text-sm text-gray-400'>Google search for current information.</p>
            </div>
          </div>

          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#faccff] sm:h-12 sm:w-12'>
              <IconCategory2 size={30} className='' color='#ed37fe' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Picture/Video recommendations.</p>
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
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Get longer output content search</p>
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
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Save course module on cloud</p>
              <p className='text-sm text-gray-400'>Find out more here</p>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start space-x-4 text-white'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fcffc1] sm:h-12 sm:w-12'>
              <IconCloudComputing size={30} className='' color='#d1a300' />
            </span>
            <div>
              <p className='text-md font-medium text-gray-700 dark:text-white sm:text-lg'>Save your chats on the cloud</p>
              <p className='text-sm text-gray-400'>Coming soon!</p>
            </div>
          </div>
        </div>
        {user_?.isSubscribed ? (
          <ButtonPrimary
            className='mt-5 w-full'
            onClick={async () => {
              const confirm = window.confirm('Are you sure you want to cancel your subscription?');
              if (confirm) {
                // User clicked OK, cancel subscription
                await updateData('users', user.sub, {
                  isSubscribed: false,
                  stripeSubscriptionStatus: 'cancelled',
                });
                window.location.href = 'https://billing.stripe.com/p/login/14k5lt0S9ccZa7S7ss';
              }
            }}
          >
            Cancel Subscription
          </ButtonPrimary>
        ) : (
          <form action='/api/checkout_sessions' method='POST'>
            <ButtonPrimary type='submit' className='mt-5 w-full'>
              {'Subscribe'}
            </ButtonPrimary>
          </form>
        )}

        {/* <form action='/api/checkout_sessions' method='POST'>
          <section>
            <button type='submit' role='link'>
              Checkout
            </button>
          </section>
          <style jsx>
            {`
              section {
                background: #ffffff;
                display: flex;
                flex-direction: column;
                width: 400px;
                height: 112px;
                border-radius: 6px;
                justify-content: space-between;
              }
              button {
                height: 36px;
                background: #556cd6;
                border-radius: 4px;
                color: white;
                border: 0;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
              }
              button:hover {
                opacity: 0.8;
              }
            `}
          </style>
        </form> */}
      </section>
      {IsOpen && <PaymentModal onClose={() => setIsOpen(false)} />}
      {IsOpenCancel && <PaymentCancleModal onClose={() => setisOpenCancel(false)} />}
    </div>
  );
};

export default PageSubcription;

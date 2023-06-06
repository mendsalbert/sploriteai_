import { FC, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { UpgradeModal } from './UpgradeModal';
import useUserSubscription from '@/utils/useUserSubscription';

interface Props {
  //   selectedConversation: Conversation;
  //   onNewConversation: () => void;
}

export const User: FC<Props> = ({}) => {
  const { user, error } = useUser();
  const [IsOpen, setIsOpen] = useState(false);
  const { isSubscribed, isLoading, isError } = useUserSubscription(user?.sub);

  return (
    <nav className=' flex w-full justify-between rounded-lg bg-[#1f2937] py-3 '>
      <div className='flex w-full flex-col justify-center space-y-6 px-3'>
        <div className='flex w-full flex-row items-start justify-between'>
          <div className='flex flex-row items-center justify-center space-x-2'>
            {/* <span className='h-9 w-9 rounded-full bg-blue-500'></span> */}
            {user && <Image alt='name' className='h-8 w-8 rounded-full sm:h-9 sm:w-9' src={user?.picture} width='100' height='100' />}
            <div className='flex-grow'>
              <h4 className='font-semibold'>{user?.name}</h4>
              <p className='mt-0.5 text-xs'>{user?.nickname}</p>
            </div>
          </div>
          <span className='rounded-lg bg-green-600 px-3 py-1 text-xs'>{isSubscribed ? 'plus' : 'free'}</span>
        </div>
        {isSubscribed ? (
          <div className='w-full cursor-pointer rounded-lg px-2 py-3 text-center ring-1 ring-green-400'>Subscribed</div>
        ) : (
          <div
            className='w-full cursor-pointer rounded-lg px-2 py-3 text-center ring-1 ring-[#404652]'
            onClick={() => {
              setIsOpen(!IsOpen);
            }}
          >
            Upgrade to plus
          </div>
        )}
      </div>
      {IsOpen && <UpgradeModal onClose={() => setIsOpen(false)} />}
    </nav>
  );
};

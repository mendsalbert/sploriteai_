import { IconBrain, IconDots } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className='group ' style={{ overflowWrap: 'anywhere' }}>
      <div className='m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl'>
        <div className='min-w-[40px] text-right font-bold'>
          <IconBrain size={33} className='rounded-lg bg-blue-600 text-white  ring-4' />
        </div>
        <IconDots className='animate-pulse' />
      </div>
    </div>
  );
};

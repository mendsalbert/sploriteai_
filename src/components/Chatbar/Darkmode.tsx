import { FC } from 'react';
import { IconFileExport, IconMoon, IconSun } from '@tabler/icons-react';

interface Props {
  text: any;
  onClickDark: () => void;
  onClickLight: () => void;
}

export const Darkmode: FC<Props> = ({ text, onClickDark, onClickLight }) => {
  return (
    <button className='mt-4 flex  w-full cursor-pointer select-none flex-row items-center justify-between  gap-3 rounded-lg bg-[#1f2937] py-1 px-1 text-[14px] leading-3 text-white transition-colors duration-200 '>
      <span
        onClick={onClickLight}
        className={` ${
          text == 'light'
            ? 'flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-[#111827] py-2 px-2'
            : 'flex w-full flex-row items-center justify-center space-x-2 rounded-lg py-2 px-2 hover:bg-gray-500/10'
        }`}
      >
        <IconMoon size={18} />

        <p>light</p>
      </span>
      <span
        onClick={onClickDark}
        className={` ${
          text == 'dark'
            ? 'flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-[#111827] py-2 px-2'
            : 'flex w-full flex-row items-center justify-center space-x-2 rounded-lg py-2 px-2 hover:bg-gray-500/10'
        }`}
      >
        <IconSun size={18} />
        <p>dark</p>
      </span>
      {/* <div>{icon}</div>
      <span>{text}</span> */}
    </button>
  );
};

import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { useTranslation } from 'next-i18next';
import { IconExternalLink, Icon3dRotate } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  model: OpenAIModel;
  models: OpenAIModel[];
  defaultModelId: OpenAIModelID;
  onModelChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, models, defaultModelId, onModelChange }) => {
  const { t } = useTranslation('chat');

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-row   items-center space-x-3 pb-2'>
        <span className='rounded-xl bg-[#cce6fe] p-2 '>
          <Icon3dRotate size={30} color='#3f90ef' />
        </span>
        <label className='mb-2 flex-row text-left font-bold text-neutral-700 dark:text-neutral-400'>{t('Model')}</label>
      </div>
      <div
        className='out m-0 w-full resize-none
        rounded-xl   border-black/10 bg-transparent text-black outline-none ring-1 ring-black ring-opacity-5 focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:bg-transparent dark:text-white '
        // className='w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white'
      >
        <select
          // className='w-full bg-transparent p-2'
          className='out m-0 w-full  resize-none  rounded-xl border-black/10 bg-transparent p-0 py-4
          pr-8 pl-2 text-black  shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:border-gray-900/50  dark:bg-[#1f2937] dark:bg-transparent dark:text-white  dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4'
          placeholder={t('Select a model') || ''}
          value={model?.id || defaultModelId}
          onChange={(e) => {
            onModelChange(models.find((model) => model.id === e.target.value) as OpenAIModel);
          }}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id} className='dark:bg-[#343541] dark:text-white'>
              {model.id === defaultModelId ? `Default (${model.name})` : model.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className='mt-3 flex w-full items-center text-left text-neutral-700 dark:text-neutral-400'>
        <a href='https://platform.openai.com/account/usage' target='_blank' className='flex items-center'>
          <IconExternalLink size={18} className={'mr-1 inline'} />
          {t('View Account Usage')}
        </a>
      </div> */}
    </div>
  );
};

import { SupportedExportFormats } from '@/types/export';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Import } from '../Settings/Import';
import { Key } from '../Settings/Key';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { ClearConversations } from './ClearConversations';
import { Darkmode } from './Darkmode';
import { User } from './User';
import { IconFileExport } from '@tabler/icons-react';
interface Props {
  lightMode: 'light' | 'dark';
  apiKey: string;
  conversationsCount: number;
  onToggleLightMode: (mode: 'light' | 'dark') => void;
  onApiKeyChange: (apiKey: string) => void;
  onClearConversations: () => void;
  onExportConversations: () => void;
  onImportConversations: (data: SupportedExportFormats) => void;
}

export const ChatbarSettings: FC<Props> = ({ lightMode, apiKey, conversationsCount, onToggleLightMode, onApiKeyChange, onClearConversations, onExportConversations, onImportConversations }) => {
  const { t } = useTranslation('sidebar');
  return (
    <div className='flex w-full flex-col items-center space-y-1  text-sm'>
      {conversationsCount > 0 ? <ClearConversations onClearConversations={onClearConversations} /> : null}

      <Import onImport={onImportConversations} />

      <SidebarButton text={t('Export data')} icon={<IconFileExport size={18} />} onClick={() => onExportConversations()} />

      {/* <Key apiKey={apiKey} onApiKeyChange={onApiKeyChange} /> */}

      <User />
      <Darkmode onClickLight={() => onToggleLightMode('light')} text={lightMode} onClickDark={() => onToggleLightMode('dark')} />
    </div>
  );
};

'use client';
import { Message } from '@/types/chat';
import { OpenAIModel } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import useUserSubscription from '@/utils/useUserSubscription';
import { useUser } from '@auth0/nextjs-auth0/client';

// const client = google.customsearch('v1');
import { IconMessageForward, IconMicrophone, IconPhoto, IconPlayerStop, IconRepeat, IconSend, IconPlayerStopFilled, IconLoader2, IconRefreshDot, IconBrandGoogle } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import React, { FC, KeyboardEvent, MutableRefObject, use, useCallback, useEffect, useRef, useState } from 'react';
import { PromptList } from './PromptList';
import { VariableModal } from './VariableModal';
import { DetectDocumentTextCommand, TextractClient } from '@aws-sdk/client-textract';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
interface Props {
  messageIsStreaming: boolean;
  model: OpenAIModel;
  conversationIsEmpty: boolean;
  messages: Message[];
  prompts: Prompt[];
  onSend: (message: Message) => void;
  onRegenerate: () => void;
  stopConversationRef: MutableRefObject<boolean>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

import { Buffer } from 'buffer';
import { Loading } from '@nextui-org/react';
import { FileUploadModal } from './FileUploadModal';
import { GoogleSearchComponent } from './SearchComp';

globalThis.Buffer = Buffer;

export const ChatInput: FC<Props> = ({ messageIsStreaming, model, conversationIsEmpty, messages, prompts, onSend, onRegenerate, stopConversationRef, textareaRef }) => {
  const { t } = useTranslation('chat');
  const [isVoiceContent, setIsVoiceContent] = useState(false);
  const [hidemic, setHidemic] = useState(false);
  //camera feature

  const [isGoogleOpen, setGoogleIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, error } = useUser();

  const [loading, setLoading] = useState(false);
  const { isSubscribed, isLoading, isError } = useUserSubscription(user?.sub);

  const [data, setData] = useState([]);

  const onRunOCR = async (src: any) => {
    setLoading(true);
    const client = new TextractClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAXDRZEXPNJZXR2RXH',
        secretAccessKey: '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',
      },
    });

    // convert image to byte Uint8Array base 64
    const blob = Buffer?.from(src?.split(',')[1], 'base64');

    const params = {
      Document: {
        Bytes: blob,
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    };

    const command = new DetectDocumentTextCommand(params);
    try {
      const data = await client.send(command);
      // process data.
      if (data?.Blocks) {
        setData(data.Blocks as []);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // error handling.
    }
  };

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({});

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setHidemic(true);
    }
    setIsVoiceContent(false);
  }, []);

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  useEffect(() => {
    setContent(transcript);
    setIsVoiceContent(transcript?.length > 1);
  }, [transcript]);

  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showPromptList, setShowPromptList] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [promptInputValue, setPromptInputValue] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log('content', content);
  const promptListRef = useRef<HTMLUListElement | null>(null);

  const filteredPrompts = prompts.filter((prompt) => prompt.name.toLowerCase().includes(promptInputValue.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = model.maxLength;

    if (value.length > maxLength) {
      alert(t(`Message limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`, { maxLength, valueLength: value.length }));
      return;
    }

    setContent(value);
    setIsVoiceContent(false);

    updatePromptListVisibility(value);
  };

  const handleSend = () => {
    if (messageIsStreaming) {
      return;
    }

    if (!content) {
      alert(t('Please enter a message'));
      return;
    }

    onSend({ role: 'user', content });
    setContent('');
    setIsVoiceContent(false);

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  //google search functionality
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const apiKey = 'AIzaSyCDNBPCnGj61OyzRbLk2ba18HqejrFABL8';
  const cx = '215262e966af841ff';
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${content}&sort=date:r:1`;

  const handleStopConversation = () => {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  };

  const isMobile = () => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleInitModal = () => {
    const selectedPrompt = filteredPrompts[activePromptIndex];
    if (selectedPrompt) {
      setContent((prevContent) => {
        const newContent = prevContent?.replace(/\/\w*$/, selectedPrompt.content);
        return newContent;
      });
      setIsVoiceContent(false);

      handlePromptSelect(selectedPrompt);
    }
    setShowPromptList(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showPromptList) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) => (prevIndex < prompts.length - 1 ? prevIndex + 1 : prevIndex));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) => (prevIndex < prompts.length - 1 ? prevIndex + 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleInitModal();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowPromptList(false);
      } else {
        setActivePromptIndex(0);
      }
    } else if (e.key === 'Enter' && !isTyping && !isMobile() && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  const updatePromptListVisibility = useCallback((text: string) => {
    const match = text.match(/\/\w*$/);

    if (match) {
      setShowPromptList(true);
      setPromptInputValue(match[0].slice(1));
    } else {
      setShowPromptList(false);
      setPromptInputValue('');
    }
  }, []);

  const handlePromptSelect = (prompt: Prompt) => {
    const parsedVariables = parseVariables(prompt.content);
    setVariables(parsedVariables);

    if (parsedVariables.length > 0) {
      setIsModalVisible(true);
    } else {
      setContent((prevContent) => {
        const updatedContent = prevContent?.replace(/\/\w*$/, prompt.content);
        return updatedContent;
      });
      setIsVoiceContent(false);
      updatePromptListVisibility(prompt.content);
    }
  };

  const handleSubmit = (updatedVariables: string[]) => {
    const newContent = content?.replace(/{{(.*?)}}/g, (match, variable) => {
      const index = variables.indexOf(variable);
      return updatedVariables[index];
    });

    setContent(newContent);
    setIsVoiceContent(false);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (promptListRef.current) {
      promptListRef.current.scrollTop = activePromptIndex * 30;
    }
  }, [activePromptIndex]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${textareaRef?.current?.scrollHeight > 400 ? 'auto' : 'hidden'}`;
    }
  }, [content]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (promptListRef.current && !promptListRef.current.contains(e.target as Node)) {
        setShowPromptList(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const textArray: string[] = [];

    // Iterate through the data and push the text values to the array
    data?.forEach((item: { Text: string }) => {
      textArray.push(item.Text);
    });
    // Join the array elements into a single string
    const joinedText = textArray.join(' ');
    // Update the content state with the joined string
    setContent(joinedText);
  }, [data]);

  return (
    <div className='absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 dark:border-white/20 dark:via-[#1f2937] dark:to-[#1f2937] md:pt-2'>
      <div className='stretch mx-2 mt-4  flex flex-col items-center justify-center gap-3 last:mb-2 sm:flex-row md:mx-4 md:mt-[52px] md:last:mb-6 lg:mx-auto lg:max-w-3xl'>
        {messageIsStreaming && (
          <button
            className='absolute top-0 left-0 right-0 mx-auto mb-3 flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 dark:border-neutral-600 dark:bg-[#343541] dark:text-white md:mb-0 md:mt-2'
            onClick={handleStopConversation}
          >
            <IconPlayerStop size={16} /> {t('Stop Generating')}
          </button>
        )}
        {!messageIsStreaming && !conversationIsEmpty && (
          <button className='absolute top-0 left-0 right-0 mx-auto mb-3 flex w-fit items-center gap-3 rounded-xl  border border-neutral-200 bg-white py-2 px-4 text-black  dark:border-blue-500 dark:bg-blue-600 dark:text-white md:mb-0 md:mt-2'>
            <IconRepeat size={20} onClick={onRegenerate} className='hover:opacity-90' /> {t('Refresh response')}
            {/* <IconBrandYoutube size={20} className='hover:opacity-90' /> {t('Videos')}
            <IconPhoto size={20} className='hover:opacity-90' /> {t('Picture')} */}
          </button>
        )}
        <div className='!important relative mx-2 flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none focus:outline-none  dark:border-gray-900/50 dark:bg-[#1f2937] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] sm:mx-4'>
          <textarea
            ref={textareaRef}
            className='
out sm:text-md m-0 w-full
            resize-none border-0 bg-transparent p-0 py-4 pr-8 pl-2 text-sm text-black outline-none focus:border-sky-500  focus:outline-none focus:ring-0 focus:ring-sky-500 dark:bg-transparent dark:text-white md:py-3 md:pl-4'
            style={{
              resize: 'none',
              bottom: `${textareaRef?.current?.scrollHeight}px`,
              outline: 'none',
              maxHeight: '400px',
              overflow: `${textareaRef.current && textareaRef.current.scrollHeight > 400 ? 'auto' : 'hidden'}`,
            }}
            placeholder={t('Type a message or "/" to select a prompt..') || ''}
            value={content}
            rows={1}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button className='absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60  dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200' onClick={handleSend}>
            {messageIsStreaming ? <div className='h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100'></div> : <IconMessageForward size={25} />}
          </button>

          {showPromptList && filteredPrompts.length > 0 && (
            <div className='absolute bottom-12 w-full'>
              <PromptList activePromptIndex={activePromptIndex} prompts={filteredPrompts} onSelect={handleInitModal} onMouseOver={setActivePromptIndex} promptListRef={promptListRef} />
            </div>
          )}

          {isModalVisible && <VariableModal prompt={prompts[activePromptIndex]} variables={variables} onSubmit={handleSubmit} onClose={() => setIsModalVisible(false)} />}
        </div>
        {/* <p>ds</p> */}

        <div className='flex flex-row items-center justify-center space-x-2'>
          {isSubscribed ? (
            <span
              onClick={() => {
                setGoogleIsOpen(!isGoogleOpen);
              }}
              className=' cursor-pointer rounded-full bg-[#3d82eb] p-2'
            >
              <IconBrandGoogle
                size={18}
                onClick={() => {
                  // onSend({ role: 'assistant', content:  });
                }}
              />
            </span>
          ) : (
            ''
          )}

          {!hidemic ? (
            <div className='flex flex-col items-center justify-center'>
              <span onClick={listening ? SpeechRecognition.stopListening : handleStart} className='cursor-pointer rounded-full bg-[#d34b10] p-2'>
                {listening ? <IconPlayerStopFilled className='animate-ping' size={18} /> : <IconMicrophone className={listening ? `animate-ping` : ''} size={18} />}
              </span>
              {isVoiceContent && (
                <span className='mt-2 flex flex-row items-center justify-center rounded-full bg-green-600 py-0.5 px-2' onClick={resetTranscript}>
                  <IconRefreshDot size={16} />
                  <span>Reset</span>
                </span>
              )}
            </div>
          ) : (
            ''
          )}
          {isSubscribed ? (
            <label
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className={`${loading ? 'animate-bounce' : ''} cursor-pointer rounded-full bg-[#e58a20]  p-2`}
            >
              {loading ? <IconLoader2 className='animate-spin' size={18} /> : <IconPhoto size={18} />}
            </label>
          ) : (
            ''
          )}
        </div>
      </div>

      {isOpen ? <FileUploadModal onClose={() => setIsOpen(false)} onRunOCR={onRunOCR} /> : ''}
      {isGoogleOpen ? <GoogleSearchComponent onClose={() => setIsOpen(false)} /> : ''}
      <div className='px-3 pt-2 pb-3 text-center text-[12px] text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6'>
        <a href='https://github.com/mckaywrigley/chatbot-ui' target='_blank' rel='noreferrer' className='underline'>
          Sploritechat
        </a>
        . {t(' provides a better user experience with Open AI API.')}
      </div>
    </div>
  );
};

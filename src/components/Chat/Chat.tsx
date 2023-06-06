'use client';
import Logo from '@/shared/Logo';
import { Conversation, Message } from '@/types/chat';
import { KeyValuePair } from '@/types/data';
import { ErrorMessage } from '@/types/error';
import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import { throttle } from '@/utils';
import { IconArrowDown, IconClearAll, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { FC, memo, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '../Global/Spinner';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ChatMessage } from './ChatMessage';
import { ErrorMessageDiv } from './ErrorMessageDiv';
import { ModelSelect } from './ModelSelect';
import { IconCategory2, IconCloudComputing, IconCloudLockOpen, IconCloudUp, IconFileDownload, IconPhotoDown, IconRulerMeasure, IconWorldWww } from '@tabler/icons-react';

interface Props {
  conversation: Conversation;
  models: OpenAIModel[];
  apiKey: string;
  serverSideApiKeyIsSet: boolean;
  defaultModelId: OpenAIModelID;
  messageIsStreaming: boolean;
  modelError: ErrorMessage | null;
  loading: boolean;
  prompts: Prompt[];
  onSend: (message: Message, deleteCount?: number) => void;
  onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
  onEditMessage: (message: Message, messageIndex: number) => void;
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat: FC<Props> = memo(
  ({ conversation, models, apiKey, serverSideApiKeyIsSet, defaultModelId, messageIsStreaming, modelError, loading, prompts, onSend, onUpdateConversation, onEditMessage, stopConversationRef }) => {
    const { t } = useTranslation('chat');
    const [currentMessage, setCurrentMessage] = useState<Message>();
    const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showScrollDownButton, setShowScrollDownButton] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = useCallback(() => {
      if (autoScrollEnabled) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        textareaRef.current?.focus();
      }
    }, [autoScrollEnabled]);

    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const bottomTolerance = 30;

        if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
          setAutoScrollEnabled(false);
          setShowScrollDownButton(true);
        } else {
          setAutoScrollEnabled(true);
          setShowScrollDownButton(false);
        }
      }
    };

    const handleScrollDown = () => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    };

    const handleSettings = () => {
      setShowSettings(!showSettings);
    };

    const onClearAll = () => {
      if (confirm(t<string>('Are you sure you want to clear all messages?'))) {
        onUpdateConversation(conversation, { key: 'messages', value: [] });
      }
    };

    const scrollDown = () => {
      if (autoScrollEnabled) {
        messagesEndRef.current?.scrollIntoView(true);
      }
    };
    const throttledScrollDown = throttle(scrollDown, 250);

    // appear scroll down button only when user scrolls up

    useEffect(() => {
      throttledScrollDown();
      setCurrentMessage(conversation.messages[conversation.messages.length - 2]);
    }, [conversation.messages, throttledScrollDown]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setAutoScrollEnabled(entry.isIntersecting);
          if (entry.isIntersecting) {
            textareaRef.current?.focus();
          }
        },
        {
          root: null,
          threshold: 0.5,
        }
      );
      const messagesEndElement = messagesEndRef.current;
      if (messagesEndElement) {
        observer.observe(messagesEndElement);
      }
      return () => {
        if (messagesEndElement) {
          observer.unobserve(messagesEndElement);
        }
      };
    }, [messagesEndRef]);

    // const objects = convertDataToObject(data);
    // console.log(objects);

    return (
      <div className='relative my-2 mx-2  flex-1 overflow-hidden rounded-2xl bg-white dark:bg-[#1f2937] sm:mx-0 sm:my-4'>
        {!(apiKey || serverSideApiKeyIsSet) ? (
          <div className='mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]'>
            <div className='mx-auto flex w-full flex-col items-center justify-center text-center'>
              <Logo className='mx-auto' />
            </div>
            <div className='text-center text-3xl font-semibold text-black dark:text-white'>
              Welcome to Splorite<span className='italic text-green-500'>Chat</span>
            </div>
            <div className='text-center text-lg text-black dark:text-white'>
              <div className='mb-8'>
                Splorite Chat - an extension of Sploritie - offers personalized learning, tailored to your interests and preferences. Discover engaging educational content, designed just for you. Try
                Splorite Chat today and take control of your learning journey!
              </div>
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              <div className='mb-2'>{t('Please set your OpenAI API key in the bottom left of the sidebar.')}</div>
              <div>
                {t("If you don't have an OpenAI API key, you can get one here: ")}
                <a href='https://platform.openai.com/account/api-keys' target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                  openai.com
                </a>
              </div>
            </div>
          </div>
        ) : modelError ? (
          <ErrorMessageDiv error={modelError} />
        ) : (
          <>
            <div className='max-h-full overflow-x-hidden' ref={chatContainerRef} onScroll={handleScroll}>
              {conversation.messages.length === 0 ? (
                <>
                  <div className='mx-auto flex w-[300px] flex-col space-y-10 pt-12 sm:w-[600px]'>
                    <div className='text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>
                      {models.length === 0 ? (
                        <div>
                          <Spinner size='16px' className='mx-auto' />
                        </div>
                      ) : (
                        <>
                          <div className='mx-auto flex w-full flex-col items-center justify-center text-center'>
                            <Logo className='mx-auto' />
                            <p> Splorite</p>
                          </div>
                          <span className='space-x-1 text-lg'>
                            {' '}
                            <a href='/subscription'>
                              <span className='rounded-full bg-green-500 px-2 py-1 text-sm '>Subscribe</span>
                            </a>
                            <span>for features like </span>
                          </span>
                          <div className='grid-col-1 mx-2 mb-52 mt-3 grid gap-2 overflow-x-scroll text-left  sm:grid-cols-2 sm:gap-5'>
                            <div className='flex flex-row items-center justify-start space-x-4 text-left text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#dbf0e0] sm:h-12 sm:w-12'>
                                <IconCloudLockOpen size={30} className='' color='#53ba6b' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Unlock all features</p>
                                <p className='text-sm text-gray-400'> Get access to all of our features</p>

                                {/* <span className='tooltip'>(Search, Prompt library)</span>{' '} */}
                              </div>
                            </div>

                            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8e1f5] sm:h-12 sm:w-12'>
                                <IconPhotoDown size={30} className='' color='#8e55e8' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Image upload to extract text</p>
                                <p className='text-sm text-gray-400'>Image to text chat input</p>
                              </div>
                            </div>

                            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6dbce] sm:h-12 sm:w-12'>
                                <IconFileDownload size={30} className='' color='#d55018' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Download output option</p>
                                <p className='text-sm text-gray-400'>Download your chat output as PDF.</p>
                              </div>
                            </div>

                            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#cce6fe] sm:h-12 sm:w-12'>
                                <IconWorldWww size={30} className='' color='#3f90ef' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Web search options</p>
                                <p className='text-sm text-gray-400'>Google search for current information.</p>
                              </div>
                            </div>

                            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#faccff] sm:h-12 sm:w-12'>
                                <IconCategory2 size={30} className='' color='#ed37fe' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Picture/Video recommendations.</p>
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
                                <p className='text-sm font-medium sm:text-lg'>Get longer output content search</p>
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
                                <p className='text-sm font-medium sm:text-lg'>Save course module on cloud</p>
                                <p className='text-sm text-gray-400'>Find out more here</p>
                              </div>
                            </div>
                            <div className='flex flex-row items-center justify-start space-x-4 text-white'>
                              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#fcffc1] sm:h-12 sm:w-12'>
                                <IconCloudComputing size={30} className='' color='#d1a300' />
                              </span>
                              <div>
                                <p className='text-sm font-medium sm:text-lg'>Save your chats on the cloud</p>
                                <p className='text-sm text-gray-400'>Coming soon!</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* {models.length > 0 && (
                      <div className='flex h-full flex-col space-y-4 rounded-xl border border-neutral-200 p-4 text-center dark:border-[#404652]'>
                        <ModelSelect
                          model={conversation.model}
                          models={models}
                          defaultModelId={defaultModelId}
                          onModelChange={(model) =>
                            onUpdateConversation(conversation, {
                              key: 'model',
                              value: model,
                            })
                          }
                        />

                       
                      </div>
                    )} */}
                  </div>
                </>
              ) : (
                <>
                  <div className='flex justify-center  bg-white py-2 text-lg text-neutral-500 dark:border-none dark:bg-[#1f2937] dark:text-neutral-200'>
                    {t('Model')}: {conversation.model.name}
                    <button className='ml-2 cursor-pointer hover:opacity-50' onClick={handleSettings}>
                      <IconSettings size={18} />
                    </button>
                    <button className='ml-2 cursor-pointer hover:opacity-50' onClick={onClearAll}>
                      <IconClearAll size={18} />
                    </button>
                  </div>
                  {showSettings && (
                    <div className='flex flex-col space-y-10 md:mx-auto md:max-w-xl md:gap-6 md:py-3 md:pt-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl'>
                      <div className='flex h-full flex-col space-y-4 border-b border-neutral-200 p-4 dark:border-neutral-600 md:rounded-lg md:border'>
                        <ModelSelect
                          model={conversation.model}
                          models={models}
                          defaultModelId={defaultModelId}
                          onModelChange={(model) =>
                            onUpdateConversation(conversation, {
                              key: 'model',
                              value: model,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {conversation.messages.map((message, index) => (
                    <ChatMessage key={index} message={message} messageIndex={index} onEditMessage={onEditMessage} />
                  ))}

                  {loading && <ChatLoader />}

                  <div className='h-[162px] bg-white dark:bg-[#1f2937]' ref={messagesEndRef} />
                </>
              )}
            </div>

            <ChatInput
              stopConversationRef={stopConversationRef}
              textareaRef={textareaRef}
              messageIsStreaming={messageIsStreaming}
              conversationIsEmpty={conversation.messages.length === 0}
              messages={conversation.messages}
              model={conversation.model}
              prompts={prompts}
              onSend={(message) => {
                setCurrentMessage(message);
                onSend(message);
              }}
              onRegenerate={() => {
                if (currentMessage) {
                  onSend(currentMessage, 2);
                }
              }}
            />
          </>
        )}
        {showScrollDownButton && (
          <div className='absolute bottom-0 right-0 mb-4 mr-4 pb-20'>
            <button
              className='flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-neutral-200'
              onClick={handleScrollDown}
            >
              <IconArrowDown size={18} />
            </button>
          </div>
        )}
      </div>
    );
  }
);
Chat.displayName = 'Chat';

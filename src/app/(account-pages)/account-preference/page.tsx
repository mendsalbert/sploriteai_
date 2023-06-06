'use client';
import React, { FC, useEffect, useState } from 'react';
import Label from '@/components/Label';
import Avatar from '@/shared/Avatar';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Input from '@/shared/Input';
import Select from '@/shared/Select';
import Textarea from '@/shared/Textarea';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from '@/app/reducersSlices/authReducer';
import Image from 'next/image';
import { Formik, Form } from 'formik';
import { Loading } from '@nextui-org/react';
import Checkbox from '@/shared/Checkbox';
import { addUserPreference, getUserPreference } from '@/app/reducersSlices/preferenceReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface AccountPageProps {}

const AccountPreference = () => {
  const dispatch = useDispatch<any>();
  const { user, error } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(getUserPreference(user));
    }
  }, [user]);
  const preferences = useSelector((state: any) => state.preference?.preferences);

  const isLoading = useSelector((state: any) => state.preference?.isLoading);
  const [isloading, setisloading] = useState(false);
  const [learningStyle, setLearningStyle] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [stageofEducation, setstageofEducation] = useState('');
  const [interest, setinterest] = useState('');
  const [quiz, setquiz] = useState(false);
  const [example, setexample] = useState(false);
  const [picture, setpicture] = useState(false);
  const [video, setvideo] = useState(false);
  const [podcast, setpodcast] = useState(false);
  const [learninggoals, setlearninggoals] = useState('');

  const renderRadio = (name: string, id: string, label: string, defaultChecked?: boolean) => {
    return (
      <div className='flex items-center'>
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          name={name}
          value={label}
          onChange={() => {
            // console.log('nameé', name);
            if (name == 'LearningStyle') {
              setLearningStyle(label);
            } else if (name == 'DifficultyLevel') {
              setDifficultyLevel(label);
            } else if (name == 'StateofEducation') {
              setstageofEducation(label);
            }
            // name == 'LearningStyle' ?  : 'difficultyLevel' ? setDifficultyLevel(label) : setstageofEducation(label);
          }}
          type='radio'
          className='!checked:bg-primary-500 h-6 w-6 border-neutral-300 bg-transparent text-primary-500 focus:ring-primary-500'
        />
        <label htmlFor={id + name} className='ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
          {label}
        </label>
      </div>
    );
  };

  const onsubmitHandler = () => {
    setisloading(true);
    const values = {
      preferences: {
        learningStyle,
        difficultyLevel,
        stageofEducation,
        interest,
        quiz,
        // example,
        picture,
        video,
        // podcast,
        learninggoals,
      },
    };
    dispatch(addUserPreference(values, user));
    setisloading(false);
    showToast();
  };

  // console.log(preferences);
  const showToast = () => {
    toast.success('Account Preference updated successful');
  };

  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* HEADING */}
      <ToastContainer />

      <h2 className='text-3xl font-semibold'>How best do you learn?</h2>
      <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
      <div className='flex flex-col md:flex-row'>
        <div className='mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:pl-0'>
          <div>
            <div>
              <label className='text-lg font-semibold' htmlFor=''>
                Learning style
              </label>
              <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {renderRadio('LearningStyle', 'Do', 'Visual', preferences?.preferences?.learningStyle || false)}
                {renderRadio('LearningStyle', 'Allow', 'Auditory', preferences?.preferences?.learningStyle || false)}
              </div>
            </div>
          </div>
          {/* ---- */}
          <div className='mt-3 mb-3'>
            <div>
              <label className='text-lg font-semibold' htmlFor=''>
                Difficulty Level{' '}
              </label>
              <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {renderRadio('DifficultyLevel', 'Do', 'Beginner', preferences?.preferences?.difficultyLevel || false)}
                {renderRadio('DifficultyLevel', 'Allow', 'Intermediate', preferences?.preferences?.difficultyLevel || false)}
                {renderRadio('DifficultyLevel', 'Allow', 'Advanced', preferences?.preferences?.difficultyLevel || false)}
              </div>
            </div>
          </div>
          {/* ---- */}

          {/* ---- */}
          <div className='mt-3 mb-3'>
            <div>
              <label className='text-lg font-semibold' htmlFor=''>
                Stage of education:{' '}
              </label>
              <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {renderRadio('StateofEducation', ' Do', 'Preschool', preferences?.preferences?.stageofEducation || false)}
                {renderRadio('StateofEducation', 'Allow', 'Elementary', preferences?.preferences?.stageofEducation || false)}
                {renderRadio('StateofEducation', 'Allow', 'High School', preferences?.preferences?.stageofEducation || false)}
                {renderRadio('StateofEducation', 'Allow', 'Tertiary', preferences?.preferences?.stageofEducation || false)}
                {renderRadio('StateofEducation', 'Allow', 'Graduate', preferences?.preferences?.stageofEducation || false)}
              </div>
            </div>
          </div>
          {/* ---- */}

          <div className='mt-2'>
            <label className='text-lg font-semibold' htmlFor=''>
              Subject/topic interests
            </label>
            <Input
              value={interest}
              onChange={(e) => {
                setinterest(e.target.value);
              }}
              name='username'
              className='mt-1.5'
              placeholder={preferences?.preferences?.interest || ''}
            />
          </div>
          {/* ---- */}
          <div>
            <div className='mt-3'>
              <label className='text-lg font-semibold' htmlFor=''>
                Content type preferences{' '}
              </label>
              <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                <Checkbox
                  label='Questions'
                  name='Quizes'
                  onChange={(e) => {
                    setquiz(e);
                  }}
                  defaultChecked={preferences?.preferences?.quiz || false}
                />
                {/* <Checkbox
                  label='Examples'
                  name='Examples'
                  onChange={(e) => {
                    setexample(e);
                  }}
                  defaultChecked={preferences?.preferences?.example || false}
                /> */}
                <Checkbox
                  label='Pictures'
                  name='Pictures'
                  onChange={(e) => {
                    setpicture(e);
                  }}
                  defaultChecked={preferences?.preferences?.picture || false}
                />
                <Checkbox
                  label='Videos'
                  name='Videos'
                  onChange={(e) => {
                    setvideo(e);
                  }}
                  defaultChecked={preferences?.preferences?.video || false}
                />
                {/* <Checkbox
                  label='Podcast/Audio'
                  name='Podcast/Audio'
                  onChange={(e) => {
                    setpodcast(e);
                  }}
                  defaultChecked={preferences?.preferences?.podcast || false}
                /> */}
              </div>
            </div>
          </div>
          {/* ---- */}
          <div className='max-w-lg'>
            <div>
              <h2 className='py-3 text-lg font-semibold'>What are your learning goals</h2>
            </div>

            <Textarea
              rows={14}
              value={learninggoals}
              onChange={(e) => {
                setlearninggoals(e.target.value);
              }}
              placeholder={preferences?.preferences?.learninggoals || ''}
            />
          </div>

          {/* ---- */}

          <div className='pt-2'>
            <ButtonPrimary
              onClick={() => {
                onsubmitHandler();
              }}
            >
              {' '}
              {isloading ? <Loading color='white' size='md' /> : 'Save'}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPreference;

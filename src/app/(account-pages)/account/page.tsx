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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface AccountPageProps {}

const AccountPage = () => {
  const dispatch = useDispatch<any>();
  const { user, error } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(getUserData(user));
    }
  }, [user]);
  const user_ = useSelector((state: any) => state.auth?.user?.result);
  const isLoading = useSelector((state: any) => state.auth?.isLoading);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const showToast = () => {
    toast.success('User data updated successful');
  };

  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* HEADING */}
      <ToastContainer />

      <h2 className='text-3xl font-semibold'>Account infomation</h2>
      <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>
      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-shrink-0 items-start'>
          <div className='relative flex overflow-hidden rounded-full'>
            {/* <Avatar sizeClass="w-32 h-32" imgUrl={user_?.picture}  /> */}
            {user_ && <Image alt={`${user_?.name}`} className='h-32 w-32' src={`${user_?.picture}`} width='100' height='100' />}

            <input type='file' className='absolute inset-0 cursor-pointer opacity-0' />
          </div>
        </div>
        <div className='mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:pl-16'>
          <Formik
            initialValues={{
              name: user_?.name,
              gender: '',
              country: '',
              username: user_?.nickname,
              email: user_?.email,
              dob: '',
              address: '',
              phone: '',
              about: user_?.about,
            }}
            onSubmit={(values) => {
              dispatch(updateUserData(values, user));
              // alert('user data updated successful');
              showToast();

              // Handle form submission here
            }}
          >
            {({ values, handleChange, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      className='mt-1.5'
                      name='name'
                      value={values.name}
                      // defaultValue={user_?.name}
                      placeholder={user_?.name}
                      onChange={handleChange}
                    />
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>Gender</Label>
                    <Select className='mt-1.5' name='gender' value={values.gender} onChange={handleChange}>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </Select>
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Select value={values.country} onChange={handleChange} name='country'>
                      {countries.map((country: any) => (
                        <option key={country.alpha2Code} value={country.name} className='bg-cover bg-center py-1 pl-8 pr-2' style={{ backgroundImage: `url(${country.flag})` }}>
                          {country.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>Username</Label>
                    <Input
                      value={values.username}
                      onChange={handleChange}
                      name='username'
                      className='mt-1.5'
                      placeholder={user_?.username}
                      // defaultValue={`${user_?.nickname}`}
                    />
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>Email</Label>
                    <Input className='mt-1.5' name='email' value={values.email} onChange={handleChange} placeholder={`${user_?.email}`} />
                  </div>
                  {/* ---- */}
                  <div className='max-w-lg'>
                    <Label>Date of birth</Label>
                    <Input value={values.dob} onChange={handleChange} className='mt-1.5' type='date' name='dob' defaultValue={user_?.dob} />
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>Addess</Label>
                    <Input value={values.address} onChange={handleChange} name='address' className='mt-1.5' placeholder={user_?.address} />
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>Phone number</Label>
                    <Input value={values.phone} onChange={handleChange} className='mt-1.5' name='phone' placeholder={user_?.phone} />
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>About you</Label>
                    <Textarea value={values.about} onChange={handleChange} name='about' className='mt-1.5' placeholder={user_?.about} />
                  </div>
                  <div className='pt-2'>
                    <ButtonPrimary type='submit'> {isLoading ? <Loading color='white' size='md' /> : 'Save Info'}</ButtonPrimary>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

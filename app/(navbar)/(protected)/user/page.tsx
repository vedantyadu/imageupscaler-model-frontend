'use client';

import { UserdataContext } from '@/app/context/UserdataContext';
import { axiosbackend } from '@/app/utils/axios';
import { useContext } from 'react';
import { TbLogout2 } from 'react-icons/tb';

export default function User() {
  const { userdata } = useContext(UserdataContext);

  const logout = async () => {
    try {
      await axiosbackend.get('/api/auth/logout');
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className='flex flex-col w-full space-y-2'>
      <span>{userdata?.email}</span>
      <span>{userdata?.user_id}</span>
      <button
        onClick={logout}
        className='flex mr-auto justify-center items-center space-x-2 text-sm font-medium transition-colors hover:border-red-500 hover:text-red-500 border-red-700 text-red-700 border px-4 py-2 rounded-md'
      >
        <TbLogout2 className='text-lg' />
        <span>Logout</span>
      </button>
    </div>
  );
}

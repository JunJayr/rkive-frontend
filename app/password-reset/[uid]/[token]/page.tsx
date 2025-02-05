'use client';

import { useState } from 'react';
import { useResetPasswordConfirmMutation } from '@/redux/features/authApiSlice'; // Import the mutation
import Spinner from '@/components/common/Spinner';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface Props {
    uid: string;
    token: string;
}

export default function Page({ uid, token }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await resetPasswordConfirm({
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      }).unwrap();
      toast.success('Password reset successful!');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex flex-grow items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://pbs.twimg.com/media/Egbd8bVWAAEtEzP?format=jpg&name=4096x4096')",
        }}
      >
        <div className="sm:w-full sm:max-w-sm bg-white bg-opacity-60 p-6 rounded-md shadow-md">
          <img alt="New Logo" src="/logo.png" className="mx-auto h-20 w-auto" />
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-indigo-900">
            Reset your password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <input
                id="new_password"
                name="new_password"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />
            </div>
            <div className="mt-3">
              <input
                id="re_new_password"
                name="re_new_password"
                type="password"
                placeholder="Confirm New Password"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full flex items-center justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              {isLoading ? <Spinner sm /> : 'Reset Password'}
            </button>
          </form>
          <div className="mt-5 text-right text-sm">
            <Link
              href="/auth/login"
              className="font-semibold text-indigo-800 hover:text-indigo-600"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-5 w-full">
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-xs">&copy; 2025 Rkive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

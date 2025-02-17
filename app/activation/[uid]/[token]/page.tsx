'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useActivationMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

interface Props {
  params: Promise<{ uid: string; token: string }>; // params is now a Promise
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation();

  // Unwrap the promise to get `uid` and `token`
  const { uid, token } = use(params);

  useEffect(() => {
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success('Account activated successfully!');
      })
      .catch(() => {
        toast.error('Failed to activate account. Please try again.');
      })
      .finally(() => {
        router.push('/auth/login');
      });
  }, [uid, token, activation, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Rkive Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Activating your account...
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-gray-600">
          Please wait while we verify your activation details.
        </p>

        {/* Loader Animation (Optional) */}
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
        </div>
      </div>
    </div>
  );
}

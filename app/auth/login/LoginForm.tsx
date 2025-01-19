'use client';

import Link from 'next/link';
import Spinner from '@/components/common/Spinner';
import { useLogin } from '@/hooks';

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://pbs.twimg.com/media/Egbd8bVWAAEtEzP?format=jpg&name=4096x4096')",
      }}
    >
      <div className="sm:w-full sm:max-w-sm bg-white bg-opacity-60 p-6 rounded-md shadow-md">
        <img
          alt="New Logo"
          src="/logo.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-indigo-900">
          Login to your account
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mt-3">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
          </div>
          <div className="mt-3">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-5 w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            {isLoading ? <Spinner sm /> : 'Login'}
          </button>
        </form>
        <div className="mt-5 text-right text-sm">
          <a href="" className="font-semibold text-indigo-800 hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
        <p className="mt-5 text-center text-sm text-gray-900">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-indigo-800 hover:text-indigo-600">
            Sign Up
          </Link>
        </p>
      </div>
      <footer className="absolute bottom-5 w-full">
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-xs">&copy; 2025 Rkive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy-50 text-brandNavy-600 dark:bg-gray-900 dark:text-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-brandNavy-600 dark:text-gray-100">
              Rkive
            </h1>
            <p className="mt-5 sm:mt-10 text-center text-xl text-brandNavy-400 dark:text-gray-400 lg:w-10/12">
              Search manuscripts or design inspirations.
            </p>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex w-11/12 md:w-8/12 xl:w-6/12"
          >
            <div className="flex w-full rounded-md shadow-sm">
              <input
                type="text"
                name="q"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-l-md border border-brandNavy-300 dark:border-gray-700
                           bg-white dark:bg-gray-800 placeholder-brandNavy-300
                           focus:outline-none focus:border-brandGold-400"
                placeholder="Enter a keyword..."
                required
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-brandGold-400 hover:bg-brandGold-500 text-brandNavy-900
                           font-semibold py-3 px-6 rounded-r-md focus:outline-none"
              >
                <span>Find</span>
                <svg
                  className="h-5 w-5 fill-current text-brandNavy-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                >
                  <path d="M55.146,51.887 L41.588,37.786 c3.486-4.144,5.396-9.358,5.396-14.786 
                           c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23
                           c4.761,0,9.298-1.436,13.177-4.162 l13.661,14.208
                           c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837
                           C56.255,54.982,56.293,53.08,55.146,51.887 z 
                           M23.984,6 c9.374,0,17,7.626,17,17s-7.626,17-17,17 
                           s-17-7.626-17-17 S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

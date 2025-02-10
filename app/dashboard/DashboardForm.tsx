'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner'; // Import Spinner Component

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // New Loading State
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true); // Activate Spinner
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
          <form onSubmit={handleSearch} className="flex w-11/12 md:w-8/12 xl:w-6/12">
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
                disabled={loading} // Disable button while loading
              >
                {loading ? <Spinner sm /> : <span>Find</span>}
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

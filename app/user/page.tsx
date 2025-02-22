'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';
import Layout from '@/components/utils/Layout'; // Import Layout

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      router.push(`/user/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Layout>
      {/* Protect this page with RequireAuth */}
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-inter">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="pt-16">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-gray-900 dark:text-gray-100">
                Rkive
              </h1>
              <p className="mt-5 sm:mt-10 text-center text-xl text-gray-700 dark:text-gray-400 lg:w-10/12">
                Search manuscripts or design inspirations.
              </p>
            </div>
            <form onSubmit={handleSearch} className="flex w-11/12 md:w-8/12 xl:w-6/12">
              <div className="flex w-full rounded-2xl shadow-md">
                <input
                  type="text"
                  name="q"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-l-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-shadow duration-200"
                  placeholder="Enter a keyword..."
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white 
                            font-semibold py-3 px-6 rounded-r-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-colors duration-200 text-lg shadow-md"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner sm />
                    </div>
                  ) : (
                    'Find'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
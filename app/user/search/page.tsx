'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';
import { useSearchManuscriptsQuery } from '@/redux/features/authApiSlice';
import Layout from '@/components/utils/Layout';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
  }, [searchParams]);

  // Fetch manuscripts based on searchTerm, only after the component is mounted
  const {
    data: manuscripts = [],
    isLoading: isSearching,
    isError: searchError,
  } = useSearchManuscriptsQuery(searchTerm, {
    skip: !searchTerm,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/user/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleResultClick = (pdfUrl: string) => {
    if (pdfUrl) {
      console.log("Opening PDF:", pdfUrl);
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-inter relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Search Bar */}
        <div className="fixed top-3 left-20 z-10 w-2/3">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="flex w-full rounded-2xl shadow-md">
              <input
                type="search"
                id="search"
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-l-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-shadow duration-200"
                placeholder="Search for manuscripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-r-2xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-colors duration-200 text-lg shadow-md"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <Spinner sm />
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <main className="pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-start space-y-8">
          <div className="w-full max-w-4xl mt-8">
            {isSearching && <Spinner />}
            {searchError && (
              <p className="text-red-500 text-center text-base">
                Failed to fetch manuscripts. Please try again later.
              </p>
            )}

            {/* Render the list of manuscripts */}
            {manuscripts.length > 0 ? (
              <ul className="space-y-4">
                {manuscripts.map((manuscript: any) => (
                  <li
                    key={manuscript.id}
                    onClick={() => handleResultClick(manuscript.pdf_url)}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {manuscript.title}
                      </span>
                      {manuscript.description && (
                        <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                          {manuscript.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !isSearching && (
                <p className="text-gray-700 dark:text-gray-400 text-center text-base">
                  No results found.
                </p>
              )
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
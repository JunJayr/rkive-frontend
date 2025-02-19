'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';
import { useSearchManuscriptsQuery } from '@/redux/features/authApiSlice';

export default function SearchPage() {
  // 1) Grab the search parameter (?q=...)
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  // 2) Fetch manuscripts based on the search term
  const {
    data: manuscripts = [],
    isLoading: isSearching,
    isError: searchError,
  } = useSearchManuscriptsQuery(query, {
    skip: !query,
  });

  // 3) Update the local state whenever the route's query changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // 4) Handle the search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/user/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  // 5) Handle result click to open the PDF in a new tab
  const handleResultClick = (pdfUrl: string) => {
    if (pdfUrl) {
      console.log("Opening PDF:", pdfUrl);
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-brandNavy-50 text-brandNavy-600 dark:bg-gray-900 dark:text-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Search Bar */}
      <div className="fixed top-3 left-20 z-10 w-2/3">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="flex w-full rounded-md shadow-sm">
            <input
              type="search"
              id="search"
              className="w-full p-3 rounded-l-md border border-brandNavy-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 placeholder-brandNavy-300
                         focus:outline-none focus:border-brandGold-400"
              placeholder="Search for manuscripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brandGold-400 hover:bg-brandGold-500 text-brandNavy-900
                         font-semibold py-3 px-6 rounded-r-md focus:outline-none"
              disabled={isSearching}
            >
              {isSearching ? <Spinner sm /> : <span>Search</span>}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <main className="pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-start space-y-8">
        <div className="w-full max-w-4xl mt-8">
          {isSearching && <Spinner />}
          {searchError && (
            <p className="text-red-500 text-center">
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
                  className="p-4 bg-brandNavy-100 dark:bg-gray-800 rounded-lg shadow 
                             hover:bg-brandNavy-200 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-brandNavy-600 dark:text-gray-100">
                      {manuscript.title}
                    </span>
                    {manuscript.description && (
                      <p className="text-sm text-brandNavy-400 dark:text-gray-400 mt-1">
                        {manuscript.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !isSearching && (
              <p className="text-brandNavy-400 dark:text-gray-400 text-center">
                No results found for "{query}".
              </p>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

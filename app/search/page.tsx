'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';
import {useOpenManuscript} from '@/hooks'; // The custom hook for opening PDFs
import { useSearchManuscriptsQuery } from '@/redux/features/authApiSlice';

export default function SearchPage() {
  // 1) Grab the search parameter (?q=...)
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  // 2) RTK Query: fetch manuscripts that match the search term
  const {
    data: manuscripts,
    isLoading,
    isError,
  } = useSearchManuscriptsQuery(query, {
    skip: !query, // Skip the query if there's no search term
  });

  // 3) Hook to open PDFs in a new tab + optional "opening" state
  const { isOpening, openManuscript } = useOpenManuscript();

  // 4) Update the local state whenever the route's query changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // 5) Handle the search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  // 6) Click handler to open the PDF in a new tab
  const handleResultClick = (pdfUrl: string) => {
    openManuscript(pdfUrl);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Search Bar */}
      <div className="fixed top-3 left-20 z-10 w-2/3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="search"
              id="search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for manuscripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <main className="pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-start space-y-8">
        <div className="w-full max-w-4xl mt-8">
          {isLoading && <Spinner />}
          {isError && (
            <p className="text-red-500 text-center">
              Failed to fetch manuscripts. Please try again later.
            </p>
          )}

          {/* Render the list of manuscripts if we have any */}
          {manuscripts?.length > 0 ? (
            <ul className="space-y-4">
              {manuscripts.map((manuscript: any) => (
                <li
                  key={manuscript.id}
                  onClick={() => handleResultClick(manuscript.pdf_url)}
                  className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-blue-500 hover:underline">
                      {manuscript.title}
                    </span>
                    {manuscript.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {manuscript.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <p className="text-gray-500 text-center">
                No results found for "{query}".
              </p>
            )
          )}
        </div>
      </main>

      {/* (Optional) show a loading overlay if isOpening is true */}
      {isOpening && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <p className="text-white">Opening PDF...</p>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

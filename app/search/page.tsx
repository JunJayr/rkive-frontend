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
    data: manuscripts = [], // FIX: Default value to prevent undefined errors
    isLoading: isSearching,
    isError: searchError,
  } = useSearchManuscriptsQuery(query, {
    skip: !query, // Skip the query if there's no search term
  });

  // 3) Update the local state whenever the route's query changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // 4) Handle the search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  // 5) Handle result click to open the PDF in a new tab
  const handleResultClick = (pdfUrl: string) => {
    if (pdfUrl) {
      console.log("Opening PDF:", pdfUrl); // Debugging: Check the actual URL in the console
  
      // Open the PDF in a new tab with the correct URL
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
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
          {isSearching && <Spinner />}
          {searchError && (
            <p className="text-red-500 text-center">
              Failed to fetch manuscripts. Please try again later.
            </p>
          )}

          {/* Render the list of manuscripts if we have any */}
          {manuscripts.length > 0 ? ( // FIX: manuscripts always has a default value now
            <ul className="space-y-4">
              {manuscripts.map((manuscript: any) => (
                <li
                  key={manuscript.id}
                  onClick={() => handleResultClick(manuscript.pdf_url)} // Open PDF directly
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
            !isSearching && (
              <p className="text-gray-500 text-center">
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

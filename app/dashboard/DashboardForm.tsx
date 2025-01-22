'use client';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function Dashboard() {
    return (
        <div className="relative min-h-screen bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start min-h-screen">
                {/* Page Title */}
                <h1 className="text-4xl font-bold mb-6" style={{ color: '#294167', marginTop: '10%' }}>
                    Rkive
                </h1>

                {/* Search Bar */}
                <div className="flex items-center w-full max-w-md mt-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring focus:ring-yellow-300 focus:outline-none"
                    />
                    <button
                        className="px-4 py-2"
                        style={{
                            backgroundColor: '#294167',
                            color: '#FFCC00',
                            borderTopRightRadius: '0.375rem',
                            borderBottomRightRadius: '0.375rem',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            style={{ color: '#FFCC00' }} // Yellow icon
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17.65 17.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 017.65 15.15z"
                            />
                        </svg>
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useGetManuscriptsQuery } from '@/redux/features/authApiSlice';
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
                <div className="w-full max-w-md mt-4">
                    <form>   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input 
                                type="search" 
                                id="default-search" 
                                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Search Mockups, Logos..." 
                                required 
                            />
                            <button 
                                type="submit" 
                                className="text-white absolute right-2.5 bottom-2.5 bg-yellow-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

'use client';

import Sidebar from '@/components/common/Sidebar';
import { useState, useEffect, useRef } from 'react';
import { useRetrieveUserQuery, useLogoutMutation } from '@/redux/features/authApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { logout as setLogout } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference for dropdown
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
                toast.success('Logged out');
            })
            .catch(() => {
                toast.error('Failed to logout');
            });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (isLoading || isFetching) {
        return (
            <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow">
                <div className="flex items-center justify-between px-4 py-4 max-w-full">
                    <Sidebar />
                    <p className="text-gray-900 font-semibold">Loading...</p>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow">
            <div className="flex items-center justify-between h-16 px-1 py-4 max-w-full">
                {/* Sidebar */}
                <Sidebar />

                {/* Profile Dropdown (Right-Aligned) */}
                <div ref={dropdownRef} className="relative ml-auto">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-2 text-gray-900 font-semibold hover:text-gray-600"
                    >
                        <span>
                            {user?.last_name}, {user?.first_name}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                            <a
                                href="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                My Profile
                            </a>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

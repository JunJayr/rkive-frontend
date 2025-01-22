import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser, FaPaperclip, FaCog, FaUsers, FaClipboard } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Menu Icon */}
            <button
                className="p-2 text-gray-700 rounded-md hover:bg-gray-200 fixed top-4 left-4 z-50"
                onClick={toggleSidebar}
                style={{ backgroundColor: 'transparent' }}
            >
                <AiOutlineMenu size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-100 border-r border-gray-300 transition-transform duration-300 z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64`}
            >
                {/* Sidebar Header */}
                <button
                    className="p-2 text-gray-700 rounded-md hover:bg-gray-200 fixed top-4 left-4 z-50"
                    onClick={toggleSidebar}
                    style={{ backgroundColor: 'transparent' }}
                >
                <AiOutlineMenu size={24} />
                </button>
                <div className="flex items-center h-16 px-4 bg-gray-100 border-b border-gray-300">
                    <Link href="/dashboard" className="flex-grow text-center">
                        <h1 className="text-xl font-bold tracking-tight text-gray-800 cursor-pointer">
                            Rkive
                        </h1>
                    </Link>
                </div>

                {/* Sidebar Menu */}
                <ul className="mt-4">
                    {/* Panel Nomination */}
                    <li className="p-3 hover:bg-gray-200 flex items-center space-x-2">
                        <FaUsers className="text-gray-700" />
                        <Link
                            href="/forms/panel-nomination"
                            className="block text-gray-700 font-semibold text-base"
                        >
                            Panel Nomination
                        </Link>
                    </li>

                    {/* Defense Application */}
                    <li className="p-3 hover:bg-gray-200 flex items-center space-x-2">
                        <FaClipboard className="text-gray-700" />
                        <Link
                            href="/forms/defense-application"
                            className="block text-gray-700 font-semibold text-base"
                        >
                            Defense Application
                        </Link>
                    </li>

                    {/* Submit Thesis */}
                    <li className="p-3 hover:bg-gray-200 flex items-center space-x-2">
                        <FaPaperclip className="text-gray-700" />
                        <Link
                            href="/forms/submit-study"
                            className="block text-gray-700 font-semibold text-base"
                        >
                            Submit Thesis/Capstone
                        </Link>
                    </li>

                    {/* Settings */}
                    <li className="p-3 hover:bg-gray-200 flex items-center space-x-2">
                        <FaCog className="text-gray-700" />
                        <Link
                            href="/settings"
                            className="block text-gray-700 font-semibold text-base"
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

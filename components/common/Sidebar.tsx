'use client'

import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser, FaPaperclip, FaCog, FaUsers, FaClipboard, FaSignOutAlt, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
      dispatch(setLogout());
      toast.success('Logged out');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="relative">
      {/* Menu Icon (Hamburger) */}
      <button
        className="p-2 text-yellow rounded-md hover:bg-gray-200 fixed top-4 left-4 z-50"
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
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 transform transition-transform duration-300 z-50 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
            className="p-2 text-yellow rounded-md hover:bg-gray-200 fixed top-4 left-4 z-50"
            onClick={toggleSidebar}
            style={{ backgroundColor: 'transparent' }}
        >
            <AiOutlineMenu size={24} />
        </button>
        {/* Sidebar Header */}
        <div className="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
          <Link href="/dashboard" className="text-white" onClick={closeSidebar}>
            Rkive
          </Link>
        </div>

        {/* Sidebar Menu */}
        <nav className="text-sm text-gray-300">
          <ul className="flex flex-col">
            {/* Dashboard */}
            <li className="px-4 cursor-pointer bg-gray-700 text-white hover:bg-gray-600">
              <Link href="/dashboard" className="py-3 flex items-center" onClick={closeSidebar}>
                <FaHome className="w-4 mr-3" />
                Dashboard
              </Link>
            </li>

            

            {/* Profile */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <Link href="/profile" className="py-3 flex items-center" onClick={closeSidebar}>
                <FaUser className="w-4 mr-3" />
                Profile
              </Link>
            </li>

            {/* Panel Nomination */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <Link href="/forms/panel-nomination" className="py-3 flex items-center" onClick={closeSidebar}>
                <FaUsers className="w-4 mr-3" />
                Panel Nomination
              </Link>
            </li>

            {/* Defense Application */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <Link href="/forms/defense-application" className="py-3 flex items-center" onClick={closeSidebar}>
                <FaClipboard className="w-4 mr-3" />
                Defense Application
              </Link>
            </li>

            {/* Submit Thesis */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <Link href="/forms/submit-study" className="py-3 flex items-center" onClick={closeSidebar}>
                <FaPaperclip className="w-4 mr-3" />
                Submit Thesis
              </Link>
            </li>

            {/* Logout */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <button onClick={() => { handleLogout(); closeSidebar(); }} className="py-3 flex items-center w-full text-left">
                <FaSignOutAlt className="w-4 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

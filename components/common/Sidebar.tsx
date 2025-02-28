'use client';

import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser, FaPaperclip, FaClipboard, FaUsers, FaSignOutAlt, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname
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
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const menuItems = [
    { name: 'Dashboard', href: '/user', icon: <FaHome className="w-4 mr-3" /> },
    /*{ name: 'Profile', href: '/user/profile', icon: <FaUser className="w-4 mr-3" /> },*/
    { name: 'Panel Nomination', href: '/user/panel-nomination', icon: <FaUsers className="w-4 mr-3" /> },
    { name: 'Defense Application', href: '/user/defense-application', icon: <FaClipboard className="w-4 mr-3" /> },
    { name: 'Submit Thesis', href: '/user/submit-study', icon: <FaPaperclip className="w-4 mr-3" /> },
  ];

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
        <div className="py-3 text-2xl text-center tracking-widest bg-gray-800 border-b-2 border-gray-800 mb-8">
          <Link href="/user" className="text-white" onClick={closeSidebar}>
            Rkive
          </Link>
        </div>

        {/* Sidebar Menu */}
        <nav className="text-sm text-gray-300">
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`px-4 cursor-pointer ${
                  pathname === item.href ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
                }`}
              >
                <Link href={item.href} className="py-3 flex items-center" onClick={closeSidebar}>
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Logout */}
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="py-3 flex items-center w-full text-left"
              >
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

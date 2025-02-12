'use client';

import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Spinner from '@/components/common/Spinner';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-brandNavy-50 text-brandNavy-600 dark:bg-gray-900 dark:text-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="mx-auto py-12 sm:py-24 px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center text-brandNavy-600 dark:text-gray-100 mb-10">
            Admin Dashboard
          </h1>

          {/* Admin Panel Overview */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-3xl font-extrabold mt-4">1,234</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">Active Users</h2>
              <p className="text-3xl font-extrabold mt-4">456</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">Reports</h2>
              <p className="text-3xl font-extrabold mt-4">12</p>
            </div>
          </section>

          {/* User Management Table */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 py-2 px-4">Name</th>
                    <th className="border-b-2 border-gray-300 py-2 px-4">Email</th>
                    <th className="border-b-2 border-gray-300 py-2 px-4">Role</th>
                    <th className="border-b-2 border-gray-300 py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4">John Doe</td>
                    <td className="py-3 px-4">johndoe@example.com</td>
                    <td className="py-3 px-4">User</td>
                    <td className="py-3 px-4">
                      <button className="bg-brandGold-400 hover:bg-brandGold-500 text-brandNavy-900 font-semibold px-4 py-2 rounded">
                        Edit
                      </button>
                      <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Add more rows as necessary */}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

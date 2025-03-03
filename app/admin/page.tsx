'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/common';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useAdminDashboard } from '@/hooks/admin';

export default function AdminDashboard() {
  const {
    users,
    documentCount,
    loading,
    selectedUser,
    showModal,
    handleUserClick,
    handleInputChange,
    handleSave,
    handleDelete,
    handleAddUser,
    setShowModal,
  } = useAdminDashboard();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repassword: '',
  });

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUserClick = async () => {
    if (newUser.password !== newUser.repassword) {
      alert('Passwords do not match!');
      return;
    }
    await handleAddUser(newUser);
    setShowAddModal(false);
    setNewUser({ first_name: '', last_name: '', email: '', password: '', repassword: '' }); // Reset form
  };

  const overviewConfig = [
    { key: 'totalAccounts', label: 'Total Accounts', value: (users?.length || 0).toString() },
    {
      key: 'generatedDocumentsCount',
      label: 'Generated Documents Count',
      value: (documentCount?.generated_documents_count || '0').toString(),
    },
    { key: 'manuscriptsCount', label: 'Manuscripts Count', value: (documentCount?.manuscripts_count || 0).toString() },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-inter">
      <Sidebar />
      <main className="pt-20 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {overviewConfig.map((item) => (
              <div
                key={item.key}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700 flex flex-col items-center"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</h2>
                <p className="text-gray-700 dark:text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* User Management Table */}
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-gray-600 transition-colors duration-200"
              >
                Add Account
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">First Name</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Last Name</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Email</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Active</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Staff</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Superuser</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Dean</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Head Dept</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Faculty</th>
                    <th className="border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 text-gray-900 dark:text-gray-300">Is Student</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-blue-500 cursor-pointer hover:text-blue-600" onClick={() => handleUserClick(user)}>
                        {user.first_name}
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{user.last_name}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{user.email}</td>
                      <td className="py-3 px-4">{user.is_active ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_staff ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_superuser ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_dean ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_headdept ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_faculty ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                      <td className="py-3 px-4">{user.is_student ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-[#1A202C] p-6 rounded-3xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 ease-in-out hover:shadow-3xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Add New Account</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-white hover:text-gray-300"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - First Name, Last Name, Email */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={newUser.first_name}
                        onChange={handleAddInputChange}
                        className="w-full p-4 bg-gray-700 border border-gray-600 text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-md transition-shadow duration-200 placeholder-gray-400"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={newUser.last_name}
                        onChange={handleAddInputChange}
                        className="w-full p-4 bg-gray-700 border border-gray-600 text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-md transition-shadow duration-200 placeholder-gray-400"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleAddInputChange}
                        className="w-full p-4 bg-gray-700 border border-gray-600 text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-md transition-shadow duration-200 placeholder-gray-400"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  {/* Right Column - Password, Re-enter Password */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleAddInputChange}
                        className="w-full p-4 bg-gray-700 border border-gray-600 text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-md transition-shadow duration-200 placeholder-gray-400"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Re-enter Password</label>
                      <input
                        type="password"
                        name="repassword"
                        value={newUser.repassword}
                        onChange={handleAddInputChange}
                        className="w-full p-4 bg-gray-700 border border-gray-600 text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-md transition-shadow duration-200 placeholder-gray-400"
                        placeholder="Re-enter password"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleAddUserClick}
                    className="w-full bg-blue-500 text-white px-5 py-3 rounded-2xl hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Edit Modal - Restored Original Landscape Design with X Button */}
          {showModal && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedUser.first_name} {selectedUser.last_name} ({selectedUser.email})
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={selectedUser.first_name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-shadow duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={selectedUser.last_name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-shadow duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={selectedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm transition-shadow duration-200"
                      />
                    </div>
                  </div>

                  {/* Right Column - Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={!!selectedUser.is_active}
                        onChange={(e) => handleInputChange({ target: { name: 'is_active', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Active</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_staff"
                        checked={!!selectedUser.is_staff}
                        onChange={(e) => handleInputChange({ target: { name: 'is_staff', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Staff</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_superuser"
                        checked={!!selectedUser.is_superuser}
                        onChange={(e) => handleInputChange({ target: { name: 'is_superuser', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Superuser</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_dean"
                        checked={!!selectedUser.is_dean}
                        onChange={(e) => handleInputChange({ target: { name: 'is_dean', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Dean</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_headdept"
                        checked={!!selectedUser.is_headdept}
                        onChange={(e) => handleInputChange({ target: { name: 'is_headdept', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Head Dept</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_faculty"
                        checked={!!selectedUser.is_faculty}
                        onChange={(e) => handleInputChange({ target: { name: 'is_faculty', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Faculty</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_student"
                        checked={!!selectedUser.is_student}
                        onChange={(e) => handleInputChange({ target: { name: 'is_student', value: e.target.checked } } as any)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Is Student</label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
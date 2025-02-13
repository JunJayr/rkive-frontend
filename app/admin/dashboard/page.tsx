'use client';

import { useState } from 'react';
import { Spinner } from '@/components/common';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useAdminDashboard } from '@/hooks';

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
    handleAddUser, // <-- Extracted from useAdminDashboard
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
    await handleAddUser(newUser); // <-- Call the function from the hook
    setShowAddModal(false);
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

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
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
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex flex-col items-center"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* User Management Table */}
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Add Account
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 py-2 px-4">First Name</th>
                  <th className="border-b-2 border-gray-300 py-2 px-4">Last Name</th>
                  <th className="border-b-2 border-gray-300 py-2 px-4">Email</th>
                  <th className="border-b-2 border-gray-300 py-2 px-4">Is Active</th>
                  <th className="border-b-2 border-gray-300 py-2 px-4">Is Staff</th>
                  <th className="border-b-2 border-gray-300 py-2 px-4">Is Superuser</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-blue-500 cursor-pointer hover:underline" onClick={() => handleUserClick(user)}>
                      {user.first_name}
                    </td>
                    <td className="py-3 px-4">{user.last_name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.is_active ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                    <td className="py-3 px-4">{user.is_staff ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                    <td className="py-3 px-4">{user.is_superuser ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Account Modal */}
          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add New Account</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium">First Name</label>
                  <input type="text" name="first_name" value={newUser.first_name} onChange={handleAddInputChange} className="w-full p-2 border rounded-lg text-black" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input type="text" name="last_name" value={newUser.last_name} onChange={handleAddInputChange} className="w-full p-2 border rounded-lg text-black" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input type="email" name="email" value={newUser.email} onChange={handleAddInputChange} className="w-full p-2 border rounded-lg text-black" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">password</label>
                  <input type="password" name="password" value={newUser.password} onChange={handleAddInputChange} className="w-full p-2 border rounded-lg text-black" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">repassword</label>
                  <input type="repassword" name="repassword" value={newUser.repassword} onChange={handleAddInputChange} className="w-full p-2 border rounded-lg text-black" />
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={handleAddUserClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
                  <button onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* User Edit Modal */}
          {showModal && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={selectedUser.first_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={selectedUser.last_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={selectedUser.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Is active</label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={!!selectedUser.is_active}
                    onChange={(e) => handleInputChange({ target: { name: 'is_active', value: e.target.checked } } as any)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Is staff</label>
                  <input
                    type="checkbox"
                    name="is_staff"
                    checked={!!selectedUser.is_staff}
                    onChange={(e) => handleInputChange({ target: { name: 'is_staff', value: e.target.checked } } as any)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Is superuser</label>
                  <input
                    type="checkbox"
                    name="is_superuser"
                    checked={!!selectedUser.is_superuser}
                    onChange={(e) => handleInputChange({ target: { name: 'is_superuser', value: e.target.checked } } as any)}
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Save</button>
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
                  <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
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

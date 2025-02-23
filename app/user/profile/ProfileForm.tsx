'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import Layout from '@/components/utils/Layout';

export default function ProfileForm() {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

  const config = [
    {
      key: 'first_name',
      label: 'First Name',
      value: user?.first_name,
    },
    {
      key: 'last_name',
      label: 'Last Name',
      value: user?.last_name,
    },
    {
      key: 'email',
      label: 'Email',
      value: user?.email,
    },
  ];

  if (isLoading || isFetching) {  
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner lg />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-inter">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="pt-16">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
            {/* Title & Description */}
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-gray-900 dark:text-gray-100">
                Profile
              </h1>
              <p className="mt-5 sm:mt-10 text-center text-xl text-gray-700 dark:text-gray-400 lg:w-10/12">
                View and manage your account details.
              </p>
            </div>
            {/* Profile List */}
            <div className="w-full max-w-3xl bg-white dark:bg-gray-600 p-12 rounded-3xl shadow-2xl">
              <List config={config} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
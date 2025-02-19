'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';

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
            <div className="flex justify-center my-8">
                <Spinner lg />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brandNavy-50 text-brandNavy-600 dark:bg-gray-900 dark:text-gray-100 relative">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="pt-20 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {/* Title & Description */}
                <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-brandNavy-600 dark:text-gray-100">
                            Profile
                        </h1>
                        <p className="mt-5 sm:mt-10 text-center text-xl text-brandNavy-400 dark:text-gray-400 lg:w-10/12">
                            View and manage your account details.
                        </p>
                    </div>
                    {/* Profile List */}
                    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-brandNavy-300 dark:border-gray-700">
                        <List config={config} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

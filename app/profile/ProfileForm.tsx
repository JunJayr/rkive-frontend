'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';
import Navbar from '@/components/common/Navbar'; // Import the Navbar component
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';

export default function ProfileForm() {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    const config = [
        {
            label: 'First Name',
            value: user?.first_name,
        },
        {
            label: 'Last Name',
            value: user?.last_name,
        },
        {
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
        <>
			{/* Sidebar */}
            <Sidebar />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-20 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {/* Added padding-top (pt-20) to create space for the navbar */}
                <List config={config} />
            </main>
			<Footer />
        </>
    );
}

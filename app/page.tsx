import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rkive | Home',
  description: 'Rkive Home Page',
};

export default function Page() {
  return (
    <main
      className="bg-white min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#FFFFFF', // White background
      }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png" // Replace with your actual logo path
            alt="Rkive Logo"
            className="h-16 w-16" // Adjust height and width as necessary
          />
        </div>

        {/* Title */}
        <h1
          className="text-5xl font-bold tracking-tight"
          style={{ color: '#294167' }} // Navy blue for the title
        >
          Rkive Web Application
        </h1>

        {/* Description */}
        <p
          className="mt-6 text-lg leading-8"
          style={{ color: '#294167', maxWidth: '700px', }} // Navy blue for paragraph text
        >
          Rkive is a web-based application designed to manage capstone and thesis
          proposals and defense presentations at CITC-USTP CDO, addressing accessibility of
          previous studies and centralizing the process.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: '#294167', // Navy blue button
              outlineColor: '#FFCC00', // Yellow focus outline
            }}
          >
            Log into your account
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-semibold leading-6 hover:opacity-80"
            style={{ color: '#FFCC00' }} // Yellow for the link
          >
            Or create an account{' '}
            <span aria-hidden="true" style={{ color: '#FFCC00' }}>
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

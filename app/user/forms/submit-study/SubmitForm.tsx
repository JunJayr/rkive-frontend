'use client';

import { useManuscriptSubmission } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';
import Layout from '@/components/utils/Layout';

export default function SubmitForm() {
  const {
    title,
    description,
    file,
    isLoading,
    isError,
    isSuccess,
    onChangeTitle,
    onChangeDescription,
    onChangeFile,
    onSubmit,
  } = useManuscriptSubmission();

  return (
    <Layout>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <Spinner sm />
        </div>
      )}
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-inter">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <form onSubmit={onSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Submit Manuscript
              </h2>

              <div>
                <label
                  htmlFor="title"
                  className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={onChangeTitle}
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-shadow duration-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={onChangeDescription}
                  rows={3}
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-shadow duration-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  File Upload
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  name="file"
                  id="file"
                  onChange={onChangeFile}
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-shadow duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-colors duration-200 text-base font-semibold shadow-md flex items-center justify-center"
              >
                {isLoading ? <Spinner sm /> : 'Submit'}
              </button>

              {isSuccess && (
                <p className="text-green-500 text-sm">
                  Manuscript submitted successfully!
                </p>
              )}
              {isError && (
                <p className="text-red-500 text-sm">
                  Failed to submit manuscript. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
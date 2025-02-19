'use client';

import { useManuscriptSubmission } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';

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
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-16 rounded-lg shadow-lg">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Title</label>
              <input
                name="title"
                value={title}
                onChange={onChangeTitle}
                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={onChangeDescription}
                rows={4}
                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white">File Upload</label>
              <input
                type="file"
                accept=".pdf"
                onChange={onChangeFile}
                className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">
              {isLoading ? <Spinner sm /> : 'Submit'}
            </button>

            {isSuccess && <p className="text-green-500">Manuscript submitted successfully!</p>}
            {isError && <p className="text-red-500">Failed to submit manuscript. Please try again.</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

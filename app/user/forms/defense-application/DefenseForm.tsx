'use client';

import { useApplicationGeneration } from '@/hooks';
import DateFormatter from '@/components/utils/DateFormatter'; 
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';
import Layout from '@/components/utils/Layout';

export default function ApplicationForm() {
  const {
    formData,
    isLoading,
    previewUrl,
    setPreviewUrl,
    handleDownload,
    handleChange,
    handleSubmit,
  } = useApplicationGeneration();

  const pdfUrl = previewUrl ? `${previewUrl}#toolbar=0` : null;

  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-16 rounded-lg shadow-lg">
            {pdfUrl ? (
              <div>
                <div className="relative mb-6">
                  <button
                    type="button"
                    onClick={handleClosePreview}
                    className="absolute top-0 right-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    aria-label="Close Preview"
                  >
                    X
                  </button>
                </div>
                <iframe
                  src={pdfUrl}
                  className="w-full h-[500px] border border-gray-300 dark:border-gray-600 mb-4"
                  title="Application Document Preview"
                />
                <div className="flex justify-center">
                  <button
                    onClick={handleDownload}
                    className="px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Department</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Lead Researcher</label>
                    <input
                      name="lead_researcher"
                      value={formData.lead_researcher}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Lead Contact Number</label>
                    <input
                      name="lead_contactno"
                      value={formData.lead_contactno}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <h2 className="block text-sm font-medium text-white">Research Proponents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-white">{index}.</span>
                      <input
                        type="text"
                        name={`co_researcher${index}`}
                        value={formData[`co_researcher${index}`] || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Research Title</label>
                  <input
                    name="research_title"
                    value={formData.research_title}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Defense Date & Time</label>
                    <input
                      type="datetime-local"
                      name="datetime_defense"
                      value={formData.datetime_defense}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Defense Venue</label>
                    <input
                      name="place_defense"
                      value={formData.place_defense}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Adviser</label>
                    <input
                      name="adviser"
                      value={formData.adviser}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Panel Chair</label>
                    <input
                      name="panel_chair"
                      value={formData.panel_chair}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <h2 className="block text-sm font-medium text-white">Panel Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-white">{index}.</span>
                      <input
                        type="text"
                        name={`panel${index}`}
                        value={formData[`panel${index}`] || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Documenter</label>
                  <input
                    name="documenter"
                    value={formData.documenter}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">
                  {isLoading ? <Spinner sm /> : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

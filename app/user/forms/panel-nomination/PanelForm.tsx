'use client';

import { usePanelGeneration } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';
import Layout from '@/components/utils/Layout';

export default function PanelForm() {
  const {
    formData,
    isLoading,
    previewUrl,
    handleChange,
    handleSubmit,
    setPreviewUrl,
    handleDownload,
  } = usePanelGeneration();

  const pdfUrl = previewUrl ? `${previewUrl}#toolbar=0` : null;

  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
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
                  title="Document Preview"
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
                {/* Research Title */}
                <div className="lg:col-span-2">
                  <label htmlFor="research_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Research Title
                  </label>
                  <input
                    type="text"
                    name="research_title"
                    id="research_title"
                    value={formData.research_title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                {/* Lead Researcher */}
                <div className="lg:col-span-2">
                  <label htmlFor="lead_researcher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Lead Researcher
                  </label>
                  <input
                    type="text"
                    name="lead_researcher"
                    id="lead_researcher"
                    value={formData.lead_researcher}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                {/* Research Proponents */}
                <h2 className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  Research Proponents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-gray-900 dark:text-gray-100">{index}.</span>
                      <input
                        type="text"
                        name={`co_researcher${index}`}
                        value={formData[`co_researcher${index}`] || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Adviser and Panel Chair (Left and Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Adviser (Left) */}
                  <div>
                    <label htmlFor="adviser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Adviser
                    </label>
                    <input
                      type="text"
                      name="adviser"
                      id="adviser"
                      value={formData.adviser}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Panel Chair (Right) */}
                  <div>
                    <label htmlFor="panel_chair" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Panel Chair
                    </label>
                    <input
                      type="text"
                      name="panel_chair"
                      id="panel_chair"
                      value={formData.panel_chair}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Panel Members */}
                <h2 className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  Panel Members
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-gray-900 dark:text-gray-100">{index}.</span>
                      <input
                        type="text"
                        name={`panel${index}`}
                        value={formData[`panel${index}`] || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
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

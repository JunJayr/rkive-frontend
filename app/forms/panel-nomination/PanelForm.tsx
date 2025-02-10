'use client';

import { usePanelGeneration } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';

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
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Download
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="px-4 md:px-8 max-w-3xl mx-auto py-12 space-y-12"
            >
              {/* Research Title & Lead Researcher */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  Research Details
                </h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="research_title"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Research Title
                    </label>
                    <input
                      type="text"
                      name="research_title"
                      id="research_title"
                      value={formData.research_title}
                      onChange={handleChange}
                      className="block w-full mt-2 p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead_researcher"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Lead Researcher
                    </label>
                    <input
                      type="text"
                      name="lead_researcher"
                      id="lead_researcher"
                      value={formData.lead_researcher}
                      onChange={handleChange}
                      className="block w-full mt-2 p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Research Proponents */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  Research Proponents
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Enter the names of all individuals contributing to the research.
                </p>
                <div className="mt-6 space-y-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-gray-900 dark:text-gray-100">{index}.</span>
                      <input
                        type="text"
                        name={`co_researcher${index}`}
                        value={formData[`co_researcher${index}`] || ''}
                        onChange={handleChange}
                        className="block w-full p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Information */}
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                  Panel Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Enter the details of the panel members evaluating the research.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="panel_chair"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Panel Chair
                    </label>
                    <input
                      type="text"
                      name="panel_chair"
                      id="panel_chair"
                      value={formData.panel_chair}
                      onChange={handleChange}
                      className="block w-full mt-2 p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="adviser"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Adviser
                    </label>
                    <input
                      type="text"
                      name="adviser"
                      id="adviser"
                      value={formData.adviser}
                      onChange={handleChange}
                      className="block w-full mt-2 p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      required
                    />
                  </div>
                  <h2 className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    Panel Members
                  </h2>
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <span className="text-gray-900 dark:text-gray-100">{index}.</span>
                      <input
                        type="text"
                        name={`panel${index}`}
                        value={formData[`panel${index}`] || ''}
                        onChange={handleChange}
                        className="block w-full p-1.5 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

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
  );
}

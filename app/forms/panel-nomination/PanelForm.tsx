'use client';

import { usePanelGeneration } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

export default function PanelForm() {
  const {
    formData,
    isLoading,
    previewUrl,
    handleChange,
    handleSubmit,
    setPreviewUrl,
    handleDownload, // if you wish to keep the download logic separate in the hook
  } = usePanelGeneration();

  // Append #toolbar=0 to hide most default Chrome PDF toolbar items
  const pdfUrl = previewUrl ? `${previewUrl}#toolbar=0` : null;

  // Closes the preview and returns to the form
  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-20 px-4">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          {/* Heading + optional close button */}
          <div className="relative mb-6">
            <h2 className="text-center text-2xl font-bold tracking-tight text-indigo-900">
              Nomination of Members of Oral Examination Panel
            </h2>
            {pdfUrl && (
              <button
                type="button"
                onClick={handleClosePreview}
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
                aria-label="Close Preview"
              >
                X
              </button>
            )}
          </div>

          {pdfUrl ? (
            <div>
              {/* Optional inline PDF preview */}
              <iframe
                src={pdfUrl}
                className="w-full h-[500px] border border-gray-300 mb-4"
                title="Document Preview"
              />

              {/* Centered "Download" button */}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Research Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Research Title
                </label>
                <input
                  name="research_title"
                  value={formData.research_title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Lead Researcher */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lead Researcher
                </label>
                <input
                  name="lead_researcher"
                  value={formData.lead_researcher}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Co-Researchers */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-2">
                  Co-Researchers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <label
                        htmlFor={`co_researcher${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {`Co-Researcher ${index + 1}`}
                      </label>
                      <input
                        id={`co_researcher${index}`}
                        name={`co_researcher${index > 0 ? index : ''}`}
                        value={
                          formData[
                            `co_researcher${
                              index > 0 ? index : ''
                            }` as keyof typeof formData
                          ]
                        }
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Information */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-2">
                  Panel Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Panel Chair
                    </label>
                    <input
                      name="panel_chair"
                      value={formData.panel_chair}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Adviser
                    </label>
                    <input
                      name="adviser"
                      value={formData.adviser}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                {[1, 2, 3].map((panelNumber) => (
                  <div key={panelNumber}>
                    <label
                      htmlFor={`panel${panelNumber}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {`Panel Member ${panelNumber}`}
                    </label>
                    <input
                      id={`panel${panelNumber}`}
                      name={`panel${panelNumber}`}
                      value={
                        formData[
                          `panel${panelNumber}` as keyof typeof formData
                        ]
                      }
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

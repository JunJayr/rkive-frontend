'use client';

import { useApplicationGeneration } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

export default function ApplicationForm() {
  const {
    formData,
    isLoading,
    previewUrl,       // For PDF preview
    setPreviewUrl,    // So we can clear the preview on X button click
    handleDownload,   // So we can trigger a local file download
    handleChange,
    handleSubmit,
  } = useApplicationGeneration();

  // For hiding default Chrome PDF toolbar (optional)
  const pdfUrl = previewUrl ? `${previewUrl}#toolbar=0` : null;

  // Closes the PDF preview and returns to the form
  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-20 px-4">
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          {/* Heading + optional close button */}
          <div className="relative mb-6">
            <h2 className="text-center text-2xl font-bold tracking-tight text-indigo-900">
              Application for Oral Defense
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

          {/* If we have a PDF to show, display the preview + a Download button. Otherwise, show the form. */}
          {pdfUrl ? (
            <div>
              <iframe
                src={pdfUrl}
                className="w-full h-[500px] border border-gray-300 mb-4"
                title="Application Document Preview"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Lead Researcher */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-4">
                  Lead Researcher
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      name="lead_researcher"
                      value={formData.lead_researcher}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <input
                      name="lead_contactno"
                      value={formData.lead_contactno}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Co-Researchers */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-4">
                  Co-Researchers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700">
                        {`Co-Researcher ${index + 1}`}
                      </label>
                      <input
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

              {/* Research Details */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-4">
                  Research Details
                </h3>
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
              </div>

              {/* Defense Information */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-4">
                  Defense Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="datetime_defense"
                      value={formData.datetime_defense}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Defense Venue
                    </label>
                    <input
                      name="place_defense"
                      value={formData.place_defense}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Panel Members */}
              <div>
                <h3 className="text-lg font-medium text-indigo-900 mb-4">
                  Panel Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-medium text-gray-700">
                      {`Panel Member ${panelNumber}`}
                    </label>
                    <input
                      name={`panel${panelNumber}`}
                      value={
                        formData[`panel${panelNumber}` as keyof typeof formData]
                      }
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Documenter */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Documenter
                </label>
                <input
                  name="documenter"
                  value={formData.documenter}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
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

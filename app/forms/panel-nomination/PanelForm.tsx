'use client';

import { usePanelGeneration } from '@/hooks';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

export default function PanelForm() {
  const { formData, isLoading, handleChange, handleSubmit } = usePanelGeneration();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-20 px-4"> {/* Added `py-20` for spacing */}
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg"> {/* Reduced max width */}
          <h2 className="text-center text-2xl font-bold tracking-tight text-indigo-900 mb-6"> {/* Adjusted font size */}
              Nomination of Members of Oral Examination Panel
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Research Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Research Title</label>
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
              <label className="block text-sm font-medium text-gray-700">Lead Researcher</label>
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
              <h3 className="text-lg font-medium text-indigo-900 mb-2">Co-Researchers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">{`Co-Researcher ${index + 1}`}</label>
                    <input
                      name={`co_researcher${index > 0 ? index : ''}`}
                      value={formData[`co_researcher${index > 0 ? index : ''}` as keyof typeof formData]}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Panel Information */}
            <div>
              <h3 className="text-lg font-medium text-indigo-900 mb-2">Panel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Panel Chair</label>
                  <input
                    name="panel_chair"
                    value={formData.panel_chair}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adviser</label>
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
                  <label className="block text-sm font-medium text-gray-700">{`Panel Member ${panelNumber}`}</label>
                  <input
                    name={`panel${panelNumber}`}
                    value={formData[`panel${panelNumber}` as keyof typeof formData]}
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
              {isLoading ? <Spinner sm /> : 'Generate Panel Nomination Document'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

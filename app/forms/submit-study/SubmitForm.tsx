'use client';

import { useManuscriptSubmission } from '@/hooks'; // ✅ Correct Import
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

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
		<div className="flex flex-col min-h-screen">
			{/* Navbar */}
			<Navbar />

			{/* Main Content Centered */}
			<div className="flex flex-col items-center justify-center flex-grow p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">Submit Manuscript</h1>

				{/* Form */}
				<form className="space-y-6 w-full max-w-2xl" onSubmit={onSubmit}>
					{/* Title Input */}
					<div className="relative h-11 w-full min-w-[200px]">
						<input
							className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-yellow-500 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
							placeholder="Enter Title"
							value={title}
							onChange={onChangeTitle}
							required
						/>
					</div>

					{/* Description Input */}
					<div>
						<textarea
							className="w-full p-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
							placeholder="Enter Description"
							value={description}
							onChange={onChangeDescription}
							rows={4}
							required
						></textarea>
					</div>

					{/* File Upload Input */}
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">
							Upload file
						</label>
						<input
							className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
							id="file_input"
							type="file"
							accept=".pdf"
							onChange={onChangeFile}
							required
						/>
					</div>

					{/* Submit Button with Spinner */}
					<button
						type="submit"
						className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
						disabled={isLoading}
					>
						{isLoading ? <Spinner /> : 'Submit'}
					</button>

					{/* Success/Error Messages */}
					{isSuccess && <p className="text-green-500">Manuscript submitted successfully!</p>}
					{isError && <p className="text-red-500">Failed to submit manuscript. Please try again.</p>}
				</form>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}

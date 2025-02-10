'use client';

import { use } from 'react';
import { useResetPasswordConfirm } from '@/hooks';
import Link from 'next/link';
import Spinner from '@/components/common/Spinner';

interface Props {
	params: Promise<{ uid: string; token: string }>;
}

export default function PasswordResetConfirmPage({ params }: Props) {
	const { uid, token } = use(params); // Unwrap params correctly
	const { new_password, re_new_password, isLoading, onChange, onSubmit } =
		useResetPasswordConfirm(uid, token);

	return (
		<div className="flex h-screen">
			<div
				className="flex flex-grow items-center justify-center bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://pbs.twimg.com/media/Egbd8bVWAAEtEzP?format=jpg&name=4096x4096')",
				}}
			>
				<div className="sm:w-full sm:max-w-sm bg-white bg-opacity-60 p-6 rounded-md shadow-md">
					<img alt="New Logo" src="/logo.png" className="mx-auto h-20 w-auto" />
					<h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-indigo-900">
						Reset your password
					</h2>

					<form onSubmit={onSubmit} className="mt-5">
						<div className="mt-3">
							<input
								id="new_password"
								name="new_password"
								type="password"
								placeholder="New Password"
								value={new_password}
								onChange={onChange}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
								required
							/>
						</div>
						<div className="mt-3">
							<input
								id="re_new_password"
								name="re_new_password"
								type="password"
								placeholder="Confirm New Password"
								value={re_new_password}
								onChange={onChange}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
								required
							/>
						</div>
						<button
							type="submit"
							className="mt-5 w-full flex items-center justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-600"
						>
							{isLoading ? <Spinner sm /> : 'Reset Password'}
						</button>
					</form>

					<div className="mt-5 text-right text-sm">
						<Link href="/auth/login" className="font-semibold text-indigo-800 hover:text-indigo-600">
							Back to login
						</Link>
					</div>
				</div>
			</div>

			<footer className="absolute bottom-5 w-full">
				<div className="flex items-center justify-center">
					<p className="text-gray-400 text-xs">&copy; 2025 Rkive. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}

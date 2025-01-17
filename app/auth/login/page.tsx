import Link from "next/link";

export default function Page() {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('https://pbs.twimg.com/media/Egbd8bVWAAEtEzP?format=jpg&name=4096x4096')",
      }}
    >
      <div className="sm:w-full sm:max-w-sm bg-white bg-opacity-75 p-6 rounded-md shadow-md">
        <img
          alt="New Logo"
          src="/logo-removed.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-indigo-900">
          Login to your account
        </h2>
        <form>
          <div>
            <div className="mt-3">
              <input
                id="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name="email"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div>
            <div className="mt-3">
              <input
                id="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-5 flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
          <div className="mt-5 text-right text-sm">
            <a href="" className="font-semibold text-indigo-800 hover:text-indigo-600">
              Forgot password?
            </a>
          </div>
        </form>

        <p className="mt-5 text-center text-sm/6 text-gray-900">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-indigo-800 hover:text-indigo-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

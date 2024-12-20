"use client";
import NavBar from "@/components/navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col gap-10">
      <NavBar title={"404 oh no"} isDarkMode={false} toggleTheme={() => {}} />
      <div className="flex justify-center flex-col items-center w-full"></div>
      <div className="flex justify-center flex-col items-center w-full">
        <div className="p-4 text-center max-w-[26rem] md:max-w-[40rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            404 Not Found
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            We couldn&apos;t find this page, use the button below to go back.
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
            <Link
              href="/"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 hover:shadow-card-shadow  transition-all duration-500 ease-in"
            >
              <div className="text-center">
                <div className="-mt-1 font-sans text-lg font-semibold ">
                  Back
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

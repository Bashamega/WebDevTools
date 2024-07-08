"use client";

import Link from "next/link";
import { FaCode, FaMarkdown, FaInfo } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";
import Search from "./search";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Example({ open, togglePanel }) {
  return (
    <Dialog
      open={open}
      onClose={togglePanel}
      className="relative z-10 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={togglePanel}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl min-w-72 dark:bg-gray-800">
                <div className="px-4 sm:px-6"></div>
                <div className="relative mt-6 flex-1 flex flex-col justify-between gap-8 px-4 sm:px-6">
                  <div className="flex flex-col gap-8 mt-3">
                    <Search />
                    <Link
                      href="/codeedit"
                      className="text-white  text-[0.57rem] font-bold  sm:text-sm p-4 bg-blue-500 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <p className="flex items-center justify-center gap-2">
                        <FaCode fontSize={20} />
                        Code Editor
                      </p>
                    </Link>
                    <Link
                      href="/MD"
                      className="text-white  text-[0.57rem] font-bold  sm:text-sm p-4 bg-blue-500 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <p className="flex items-center justify-center gap-2">
                        {" "}
                        <FaMarkdown fontSize={20} />
                        Markdown Editor
                      </p>
                    </Link>
                    <Link
                      href="/about"
                      className="text-white font-bold text-[0.6rem]  sm:text-sm p-4 bg-blue-500 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <FaInfo fontSize={15} />
                      About
                    </Link>
                    <Link
                      href="/contribute"
                      className="text-white font-bold text-[0.6rem]  sm:text-sm  p-4 bg-blue-500 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <IoMdGitPullRequest fontSize={20} />
                      Contribute
                    </Link>
                  </div>
                  <span class="text-sm text-gray-500 text-center dark:text-gray-400">
                    © {new Date().getFullYear()}{" "}
                    <Link href="/" class="hover:underline">
                      WebDevTools
                    </Link>
                    . All Rights Reserved.
                  </span>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

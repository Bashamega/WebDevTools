"use client";

import React from "react";

const Modal = ({ showModal, content, setShowModal }) => {
  const modal = () => {
    return (
      showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full pb-40"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-black">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Choose a Type</p>
            </div>
            <div className="grid grid-cols-3 gap-4">{content}</div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )
    );
  };
  return modal();
};

export default Modal;

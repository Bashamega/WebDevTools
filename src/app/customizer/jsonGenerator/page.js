"use client";
import { faker } from "@faker-js/faker";
import React, { useState, useEffect } from "react";
import Search from "@/app/assets/search";

export default function JsonGenerator() {
  const [jsonList, setJsonList] = useState([
    { fieldName: "address", type: "location.street" },
    { fieldName: "id", type: "location.street" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [chosenType, setChosenType] = useState("");
  const [chosenRow, setChosenRow] = useState("");

  const onGenerate = () => {
    //get all the fieldname into one list

    function generateData(fakerMethod) {
      // Split the faker method string to navigate the faker object
      const methodParts = fakerMethod.split(".");
      let result = faker;

      // Dynamically navigate the faker object based on the methodParts
      for (const part of methodParts) {
        if (typeof result[part] === "function") {
          result = result[part]();
        } else if (result[part]) {
          result = result[part];
        } else {
          // Handle case where the specified method does not exist
          throw new Error(`Faker method not found: ${fakerMethod}`);
        }
      }
      return result;
    }

    function transformInputData() {
      // Generate an array of objects, each object containing one key-value pair

      let combinedData = [];
      for (let i = 0; i < 10; i++) {
        const transformedData = jsonList.map((item) => ({
          [item.fieldName]: generateData(item.type),
        }));
        combinedData.push(Object.assign({}, ...transformedData));
      }

      // Optional: Combine all objects into a single object if needed

      return combinedData;
    }
    console.log(transformInputData());
  };

  const modal = () => {
    return (
      showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-black">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Choose a Type</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div
                onClick={() => {
                  setJsonList(
                    jsonList.map((item, index) => {
                      if (chosenRow === index) {
                        return { ...item, type: "email" };
                      }
                      return item;
                    })
                  );
                  setShowModal(false);
                }}
                className="hover:bg-sky-700"
              >
                <h2 className="font-semibold text-lg ">email</h2>
                <p className="text-sm">email</p>
              </div>
            </div>

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

  useEffect(() => {}, []);
  return (
    <main>
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between h-15">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="mr-2 flex border rounded items-center p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-[18px] md:text-2xl font-bold mr-4">
            Web Dev Tools
          </h1>
          <p>Json Generator</p>
        </a>
        <Search />
      </nav>

      <div className="flex justify-center align-top">
        <div className="relative overflow-x-auto">
          <table className="m-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Field Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Option
                </th>
              </tr>
            </thead>
            <tbody>
              {jsonList.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <input
                        type="text"
                        id="paragraphs"
                        value={item.fieldName}
                        min={1}
                        className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        max={10}
                        onChange={(e) => {
                          setJsonList(
                            jsonList.map((item, index) => {
                              if (i === index) {
                                return { ...item, fieldName: e.target.value };
                              }
                              return item;
                            })
                          );
                        }}
                      />
                    </th>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setChosenRow(i);
                          setShowModal(true);
                        }}
                        type="button"
                        className="m-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        {item.type}
                      </button>
                    </td>
                    <td className="px-6 py-4">Silver</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div> {modal()}</div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 mt-5 bg-slate-700 flex justify-center ">
        <button
          onClick={() => {
            onGenerate();
          }}
          type="button"
          className="m-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Generate JSON Data
        </button>
        <button
          onClick={() => {}}
          type="button"
          className="m-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Preview
        </button>
      </div>
    </main>
  );
}

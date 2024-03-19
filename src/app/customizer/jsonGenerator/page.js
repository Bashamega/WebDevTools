"use client";
import { faker } from "@faker-js/faker";
import React, { useState, useEffect } from "react";
import Search from "@/app/assets/search";
import Button from "./components/Button";
import { fakerListType } from "./constants/fakerConstants";
import Modal from "./components/Modal";

export default function JsonGenerator() {
  const [showModal, setShowModal] = useState(false);
  const [rowNumber, setRowNumber] = useState("");
  const [chosenRow, setChosenRow] = useState("");
  const [jsonList, setJsonList] = useState([
    {
      fieldName: "address",
      type: "location.street",
      typeLabel: "Street Address",
    },
    { fieldName: "email", type: "internet.email", typeLabel: "Email" },
  ]);

  const dummy = {
    fieldName: "address",
    type: "location.street",
    typeLabel: "Street Address",
  };

  const onGenerate = () => {
    function generateData(fakerMethod) {
      const methodParts = fakerMethod.split(".");
      let result = faker;

      // check the faker object based on the methodParts
      for (const part of methodParts) {
        if (typeof result[part] === "function") {
          result = result[part]();
        } else if (result[part]) {
          result = result[part];
        } else {
          throw new Error(`Faker method not found: ${fakerMethod}`);
        }
      }
      return result;
    }
    function transformInputData() {
      let combinedData = [];
      for (let i = 0; i < rowNumber; i++) {
        const transformedData = jsonList.map((item) => ({
          [item.fieldName]: generateData(item.type),
        }));
        combinedData.push(Object.assign({}, ...transformedData));
      }

      return combinedData;
    }
    const data = transformInputData();
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

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
        <div className="flex-1 relative overflow-x-auto m-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                      <Button
                        onClick={() => {
                          setChosenRow(i);
                          setShowModal(true);
                        }}
                        title={item.typeLabel}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => {
                          setJsonList(
                            jsonList.filter((obj, index) => index !== i)
                          );
                        }}
                        title={"Delete"}
                      />

                      <Button
                        onClick={() => {
                          if (i < jsonList.length - 1) {
                            let newArr = [...jsonList];
                            [newArr[i], newArr[i + 1]] = [
                              newArr[i + 1],
                              newArr[i],
                            ];
                            setJsonList(newArr);
                          }
                        }}
                        title={"down"}
                        size="small"
                      />
                      <Button
                        onClick={() => {
                          if (i > 0) {
                            let newArr = [...jsonList];
                            [newArr[i], newArr[i - 1]] = [
                              newArr[i - 1],
                              newArr[i],
                            ];
                            setJsonList(newArr);
                          }
                        }}
                        title={"up"}
                        size="small"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pb-11">
            <Button
              onClick={() => {
                setJsonList([...jsonList, dummy]);
              }}
              title="Add Field"
              size="large"
            />
          </div>
        </div>

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          content={fakerListType.map((obj) => {
            return (
              <div
                onClick={() => {
                  setJsonList(
                    jsonList.map((item, index) => {
                      if (chosenRow === index) {
                        return {
                          ...item,
                          type: obj.function,
                          typeLabel: obj.typeLabel,
                        };
                      }
                      return item;
                    })
                  );
                  setShowModal(false);
                }}
                className="hover:bg-sky-700"
              >
                <h2 className="font-semibold text-lg ">{obj.typeLabel}</h2>
                <p className="text-sm">{obj.typeDescription}</p>
              </div>
            );
          })}
        />
      </div>

      {/* the footer */}
      <div className="fixed bottom-0 left-0 right-0 mt-5 bg-slate-700 flex justify-center ">
        <button
          onClick={onGenerate}
          type="button"
          className="m-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Generate JSON Data
        </button>

        <input
          placeholder="Row Number"
          type="number"
          value={rowNumber}
          className="m-2 text-black text-center p-2 border border-gray-300 rounded"
          onChange={(e) => {
            if (+e.target.value <= 1000) {
              setRowNumber(+e.target.value);
            } else {
              setRowNumber(1000);
            }
          }}
        />
      </div>
    </main>
  );
}
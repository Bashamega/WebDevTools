"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaHome, FaExpandArrowsAlt } from "react-icons/fa";
import ColorsList from "./components/ColorsList";
import "./gradient-generator.css";
import CopyCSSModal from "./components/CopyCSSModal";
import GradientType from "./components/GradientType";
import GradientRotation from "./components/GradientRotation";
import GradientFullScreen from "./components/GradientFullScreen";
import Swal from "sweetalert2";
import { NavBar } from "@/app/components/navbar";

const gradientTypes = [
  { id: 1, name: "Linear", value: "linear-gradient" },
  { id: 2, name: "Radial", value: "radial-gradient" },
  { id: 3, name: "Conic", value: "conic-gradient" },
  { id: 4, name: "Repeating Linear", value: "repeating-linear-gradient" },
  { id: 5, name: "Repeating Radial", value: "repeating-radial-gradient" },
  { id: 6, name: "Repeating Conic", value: "repeating-conic-gradient" },
];
const gradientPositions = [
  { id: 1, name: "0%", value: 0 },
  { id: 2, name: "10%", value: 10 },
  { id: 3, name: "20%", value: 20 },
  { id: 4, name: "30%", value: 30 },
  { id: 5, name: "40%", value: 40 },
  { id: 6, name: "50%", value: 50 },
  { id: 7, name: "60%", value: 60 },
  { id: 8, name: "70%", value: 70 },
  { id: 9, name: "80%", value: 80 },
  { id: 10, name: "90%", value: 90 },
  { id: 11, name: "100%", value: 100 },
];
const gradientRotations = [
  { id: 1, name: "0°", value: 0 },
  { id: 2, name: "45°", value: 45 },
  { id: 3, name: "90°", value: 90 },
  { id: 4, name: "135°", value: 135 },
  { id: 5, name: "180°", value: 180 },
  { id: 6, name: "225°", value: 225 },
  { id: 7, name: "270°", value: 270 },
  { id: 8, name: "315°", value: 315 },
  { id: 9, name: "360°", value: 360 },
];

const GradientGenerator = () => {
  const [colorsList, setColorsList] = useState([]);
  const [gradient, setGradient] = useState("");
  const [gradientType, setGradientType] = useState(gradientTypes[0]);
  const [gradientPosition, setGradientPosition] = useState(
    gradientPositions[0]
  );
  const [gradientRotation, setGradientRotation] = useState(
    gradientRotations[0]
  );
  const colorsListRef = useRef(colorsList);
  const gradientRef = useRef(gradient);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copyCSSModal, setCopyCSSModal] = useState(false);

  // update the colorsListRef whenever colorsList changes
  useEffect(() => {
    colorsListRef.current = colorsList;
  }, [colorsList]);

  // update the gradientRef whenever gradient changes
  useEffect(() => {
    gradientRef.current = gradient;
  }, [gradient]);

  useEffect(() => {
    let newGrad = colorsListRef.current
      .map((color, index) => {
        return `${color.color} ${color.position}%`;
      })
      .join(", ");

    if (colorsListRef.current.length > 0) {
      if (colorsListRef.current.length == 1) {
        setGradient(`${colorsListRef.current[0].color}`);
        gradientRef.current = `${colorsListRef.current[0].color}`;
      } else {
        if (gradientType.value === "linear-gradient") {
          setGradient(
            `${gradientType.value}(${gradientRotation.value}deg, ${newGrad})`
          );
          gradientRef.current = `${gradientType.value}(${gradientRotation.value}deg, ${newGrad})`;
        } else if (gradientType.value === "conic-gradient") {
          setGradient(
            `${gradientType.value}(from ${gradientRotation.value}deg, ${newGrad})`
          );
          gradientRef.current = `${gradientType.value}(from ${gradientRotation.value}deg, ${newGrad})`;
        } else {
          setGradient(`${gradientType.value}(${newGrad})`);
          gradientRef.current = `${gradientType.value}(${newGrad})`;
        }
      }
    }
  }, [colorsList, gradientType, gradientPosition, gradientRotation]);

  const generateRandomGradient = () => {
    function createHex() {
      var hexCode1 = "";
      var hexValues1 = "0123456789abcdef";

      for (var i = 0; i < 6; i++) {
        hexCode1 += hexValues1.charAt(
          Math.floor(Math.random() * hexValues1.length)
        );
      }
      return hexCode1;
    }

    var deg = Math.floor(Math.random() * 360);
    const randomNoOfColors = Math.floor(Math.random() * 4) + 2; // generate random number of colors between 1 and 4
    var gradient = "";
    var colors = [];

    for (var i = 0; i < randomNoOfColors; i++) {
      colors.push({
        id: `item_${i + 1}`,
        color: "#" + createHex(),
        position: i * 100,
      });
    }

    colors.sort((a, b) => a.position - b.position);

    colors.forEach((color, index) => {
      gradient += `${color.color} ${color.position}%${
        index < colors.length - 1 ? ", " : ""
      }`;
    });

    setGradient(`linear-gradient(${deg}deg, ${gradient})`);
    gradientRef.current = `linear-gradient(${deg}deg, ${gradient})`;
    setColorsList(colors);
    setGradientRotation({
      id: gradientRotations.length + 1,
      name: `${deg}°`,
      value: deg,
    });

    // setGradient(gradient);
    // gradientRef.current = gradient;
    // setColorsList([
    //   {
    //     id: 1,
    //     color: "#" + createHex(),
    //     position: 0,
    //   },
    //   {
    //     id: 2,
    //     color: "#" + createHex(),
    //     position: 100,
    //   },
    // ]);
  };

  const handleCopyCSSClick = () => {
    if (colorsListRef.current.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please generate a gradient first!",
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    setCopyCSSModal(true);
  };

  return (
    <main className="" class="bg-gray-900">

       <NavBar title={"Gradient generator"}/>
      <div class="flex justify-center flex-col items-center w-full">
        <div className="flex flex-col gap-3 mt-10 items-center">
          <h1 className="text-5xl font-extrabold text-center">
            Gradient Generator
          </h1>
          <p className="text-slate-400 text-center">
            Create and export beautiful gradients.
          </p>
        </div>

        {copyCSSModal && (
          <CopyCSSModal
            colorsListRef={colorsListRef}
            gradientRef={gradientRef}
            setCopyCSSModal={setCopyCSSModal}
            key={colorsListRef.current.length}
          />
        )}

        <div className="flex justify-between flex-col md:flex-row mb-[100px] mt-[50px] w-full max-w-6xl mx-auto gap-8 px-4">
          {/* generator maker */}
          <div className="md:w-1/2 w-full p-5 rounded-xl bg-gray-800 shadow-lg md:order-1 order-2">
            <div className="mb-4">
              <ColorsList
                colorsList={colorsList}
                setColorsList={setColorsList}
              />
            </div>

            <div className="flex justify-between items-center gap-4 mb-6">
              <GradientType
                gradientType={gradientType}
                gradientTypes={gradientTypes}
                setGradientType={setGradientType}
              />
              <GradientRotation
                gradientRotation={gradientRotation}
                gradientRotations={gradientRotations}
                setGradientRotation={setGradientRotation}
              />
            </div>

            <div className="flex justify-between items-center gap-4 mt-12">
              <div className="w-full relative">
                <button
                  className="rounded-lg bg-gray-700 p-3 text-md font-semibold text-white w-full text-center border outline-none border-gray-600 active:scale-95 transition-transform duration-200"
                  onClick={generateRandomGradient}
                >
                  Random
                </button>
              </div>

              <div className="w-full relative">
                <button
                  className="rounded-lg bg-blue-600 p-3 text-md font-semibold text-white w-full text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200"
                  onClick={() => handleCopyCSSClick()}
                >
                  Copy CSS
                </button>
              </div>
            </div>
          </div>
          <div
            className={`md:w-1/2 w-full md:h-auto h-[250px] rounded-xl md:order-2 order-1 relative`}
            style={{
              background:
                colorsListRef.current.length > 0 && gradientRef.current,
              backgroundImage:
                colorsListRef.current.length > 0 && gradientRef.current,
            }}
          >
            {colorsListRef.current.length > 0 && (
              <button
                className="absolute right-2 top-2"
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                <FaExpandArrowsAlt className="text-white text-base font-normal" />
              </button>
            )}
          </div>
        </div>

        {isFullScreen && (
          <GradientFullScreen
            colorsListRef={colorsListRef}
            gradientRef={gradientRef}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        )}

        <footer class="w-[26rem] md:w-[40rem] max-w-full bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a
                href="/"
                class="hover:underline"
              >
                WebDevTools
              </a>
              . All Rights Reserved.
            </span>{" "}
            &emsp;
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a
                  href="/"
                  class="mr-4 hover:underline md:mr-6 flex items-center justify-center gap-2"
                >
                  <FaHome />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Bashamega/WebDevTools"
                  class="hover:underline flex items-center justify-center gap-2"
                >
                  <FaGithub />
                  Repository
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default GradientGenerator;

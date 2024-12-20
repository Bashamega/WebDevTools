"use client";
import { useState } from "react";
import NavBar from "@/components/navbar";

interface ColorMap {
  [key: string]: string;
}

const colorMap: ColorMap = {
  black: "black",
  white: "white",
  gray: "gray",
  red: "red",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  indigo: "indigo",
  purple: "purple",
  pink: "pink",
};

const convertColor = (color: string): string | undefined => {
  if (colorMap[color.toLowerCase()]) {
    return colorMap[color.toLowerCase()];
  }
};

interface GetColorClassParams {
  color: string;
  prefix: string;
}

const getColorClass = ({ color, prefix }: GetColorClassParams): string => {
  if (color.startsWith("#") || color.startsWith("rgb")) {
    return `${prefix}-[${color}]`;
  }

  const [statePrefix, tailwindPrefix] = prefix.includes(":")
    ? prefix.split(":")
    : [null, prefix];

  const baseColor = Object.keys(colorMap).find((key) =>
    color.toLowerCase().includes(key),
  );
  const colorShade = color.includes("light")
    ? "300"
    : color.includes("dark")
      ? "700"
      : "500";

  if (baseColor) {
    if (statePrefix) {
      return `${statePrefix}:${tailwindPrefix}-${baseColor}-${colorShade}`;
    } else {
      return `${tailwindPrefix}-${baseColor}-${colorShade}`;
    }
  }

  return `${prefix}-${color}`;
};

interface TailwindMap {
  [key: string]: (v: string) => string;
}

interface ConvertValueToTailwind {
  (value: string): string | number;
}

interface MapCssToTailwind {
  (property: string, value: string, pseudoClass?: string): string | null;
}

const mapCssToTailwind: MapCssToTailwind = (
  property,
  value,
  pseudoClass = "",
) => {
  const convertValueToTailwind: ConvertValueToTailwind = (value) => {
    if (typeof value !== "string") return value;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    if (value.endsWith("px")) {
      if (numValue === 0) return 0;
      if (numValue % 4 === 0) return numValue / 4;
      return numValue;
    } else if (value.endsWith("rem")) {
      return numValue * 4;
    } else if (value.endsWith("%")) {
      return value;
    }
    return value;
  };

  const twValue = convertValueToTailwind(value.trim());

  const tailwindMap: TailwindMap = {
    // Spacing
    "margin-top": (v: string) => `mt-${v}`,
    "margin-right": (v: string) => `mr-${v}`,
    "margin-bottom": (v: string) => `mb-${v}`,
    "margin-left": (v: string) => `ml-${v}`,
    margin: (v: string) => `m-${v}`,
    "padding-top": (v: string) => `pt-${v}`,
    "padding-right": (v: string) => `pr-${v}`,
    "padding-bottom": (v: string) => `pb-${v}`,
    "padding-left": (v: string) => `pl-${v}`,
    padding: (v: string) => `p-${v}`,
    width: (v: string) => (v.endsWith("%") ? `w-${parseInt(v)}` : `w-${v}`),
    height: (v: string) => (v.endsWith("%") ? `h-${parseInt(v)}` : `h-${v}`),
    "max-width": (v: string) => (v === "100%" ? "max-w-full" : `max-w-${v}`),
    "max-height": (v: string) => (v === "100%" ? "max-h-full" : `max-h-${v}`),
    "min-width": (v: string) => (v === "100%" ? "min-w-full" : `min-w-${v}`),
    "min-height": (v: string) => (v === "100%" ? "min-h-full" : `min-h-${v}`),

    // Borders
    "border-width": (v: string) => `border-${convertValueToTailwind(v)}`,
    "border-style": (v: string) =>
      v === "solid" ? `border-solid` : `border-${v}`,
    "border-color": (v: string) => {
      const parts = v.split(" ");
      let classes: string[] = [];
      let width: string | undefined,
        style: string | undefined,
        color: string | undefined;

      parts.forEach((part) => {
        if (part.endsWith("px") || ["thin", "medium", "thick"].includes(part)) {
          width = part;
        } else if (
          [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
          ].includes(part)
        ) {
          style = part;
        } else {
          color = part;
        }
      });

      if (width) {
        const twWidth =
          width === "thin"
            ? "1"
            : width === "medium"
              ? "2"
              : width === "thick"
                ? "4"
                : convertValueToTailwind(width);
        classes.push(`border-${twWidth}`);
      } else {
        classes.push("border"); // Default to border-1 if no width specified
      }

      if (style) {
        classes.push(style === "solid" ? `border-solid` : `border-${style}`);
      }

      if (color) {
        const twColor = convertColor(color);
        classes.push(twColor ? `border-${twColor}` : `border-${color}`);
      }

      return classes.join(" ");
    },
    "border-radius": (v: string) => `rounded-${convertValueToTailwind(v)}`,

    // Typography
    "font-size": (v: string) => {
      const sizes: { [key: string]: string } = {
        "0.75rem": "text-xs",
        "0.875rem": "text-sm",
        "1rem": "text-base",
        "1.125rem": "text-lg",
        "1.25rem": "text-xl",
        "1.5rem": "text-2xl",
        "1.875rem": "text-3xl",
        "2.25rem": "text-4xl",
        "3rem": "text-5xl",
        "3.75rem": "text-6xl",
        "4.5rem": "text-7xl",
        "6rem": "text-8xl",
        "8rem": "text-9xl",
      };
      return sizes[v] || `text-${v}`;
    },
    "font-weight": (v: string) => {
      const weights: { [key: string]: string } = {
        100: "font-thin",
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black",
      };
      return weights[v] || `font-${v}`;
    },
    "text-align": (v: string) =>
      ({
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      })[v] || "",
    "line-height": (v: string) => {
      const leadings: { [key: string]: string } = {
        1: "leading-none",
        1.25: "leading-tight",
        1.375: "leading-snug",
        1.5: "leading-normal",
        1.625: "leading-relaxed",
        2: "leading-loose",
      };
      return leadings[v] || `leading-${v}`;
    },
    "letter-spacing": (v: string) => {
      const trackings: { [key: string]: string } = {
        "-0.05em": "tracking-tighter",
        "-0.025em": "tracking-tight",
        0: "tracking-normal",
        "0.025em": "tracking-wide",
        "0.05em": "tracking-wider",
        "0.1em": "tracking-widest",
      };
      return trackings[v] || `tracking-${v}`;
    },
    "text-decoration": (v: string) =>
      ({
        underline: "underline",
        "line-through": "line-through",
        none: "no-underline",
      })[v] || "",
    "font-style": (v: string) =>
      ({ italic: "italic", normal: "not-italic" })[v] || "",

    // Colors
    color: (v: string) => getColorClass({ color: v, prefix: "text" }),
    "background-color": (v: string) =>
      getColorClass({ color: v, prefix: "bg" }),
    // "border-color": (v: string) => getColorClass({ color: v, prefix: "border" }),

    // Additional pseudo-class specific mappings
    opacity: (v: string) =>
      `${pseudoClass}opacity-${parseInt((parseFloat(v) * 100).toString())}`,
    transform: (v: string) =>
      v === "none" ? `${pseudoClass}transform-none` : `${pseudoClass}transform`,
    scale: (v: string) =>
      `${pseudoClass}scale-${parseInt((parseFloat(v) * 100).toString())}`,
    rotate: (v: string) => `${pseudoClass}rotate-${v.replace("deg", "")}`,
    "translate-x": (v: string) =>
      `${pseudoClass}translate-x-${convertValueToTailwind(v)}`,
    "translate-y": (v: string) =>
      `${pseudoClass}translate-y-${convertValueToTailwind(v)}`,
    "skew-x": (v: string) => `${pseudoClass}skew-x-${v.replace("deg", "")}`,
    "skew-y": (v: string) => `${pseudoClass}skew-y-${v.replace("deg", "")}`,
    "box-shadow": (v: string) => {
      const shadows: { [key: string]: string } = {
        none: `${pseudoClass}shadow-none`,
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)": `${pseudoClass}shadow-sm`,
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)": `${pseudoClass}shadow`,
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)": `${pseudoClass}shadow-md`,
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)": `${pseudoClass}shadow-lg`,
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)": `${pseudoClass}shadow-xl`,
        "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)": `${pseudoClass}shadow-inner`,
      };
      return shadows[v] || `${pseudoClass}shadow-[${v}]`;
    },
  };

  const pseudoClassPrefix = pseudoClass ? `${pseudoClass}:` : "";
  const tailwindClass = tailwindMap[property]
    ? tailwindMap[property](String(twValue))
    : null;

  return tailwindClass ? `${pseudoClassPrefix}${tailwindClass}` : null;
};

interface ShorthandProperty {
  [key: string]: string;
}

const handleShorthand = (
  property: string,
  value: string,
): ShorthandProperty[] | null => {
  const values = value.split(" ").map((v) => v.trim());
  const sides = ["top", "right", "bottom", "left"];

  if (values.length === 1) {
    return sides.map((side) => ({ [`${property}-${side}`]: values[0] }));
  } else if (values.length === 2) {
    return [
      { [`${property}-top`]: values[0] },
      { [`${property}-right`]: values[1] },
      { [`${property}-bottom`]: values[0] },
      { [`${property}-left`]: values[1] },
    ];
  } else if (values.length === 3) {
    return [
      { [`${property}-top`]: values[0] },
      { [`${property}-right`]: values[1] },
      { [`${property}-bottom`]: values[2] },
      { [`${property}-left`]: values[1] },
    ];
  } else if (values.length === 4) {
    return sides.map((side, index) => ({
      [`${property}-${side}`]: values[index],
    }));
  }
  return null;
};

interface ParsedCss {
  tailwindClasses: string;
  unsupportedStyles: string[];
}

interface CssRule {
  fullProperty: string;
  value: string;
}

const parseCss = (css: string): ParsedCss => {
  const tailwindClasses: string[] = [];
  const unsupportedStyles: string[] = [];

  const cssRules: string[] =
    css.match(/([a-zA-Z\-]+(?::[a-z-]+)?)\s*:\s*([^;]+)\s*;/g) || [];

  cssRules.forEach((rule: string) => {
    const [fullProperty, value] = rule
      .replace(";", "")
      .split(":")
      .map((item) => item.trim());
    let property = fullProperty;
    let pseudoClass = "";

    if (fullProperty.includes(":")) {
      [property, pseudoClass] = fullProperty.split(":");
      pseudoClass += ":";
    }

    if (property === "padding" || property === "margin") {
      const expandedProps = handleShorthand(property, value);
      expandedProps?.forEach((prop) => {
        const [subProp, subValue] = Object.entries(prop)[0];
        const tailwindClass = mapCssToTailwind(subProp, subValue, pseudoClass);
        if (tailwindClass) {
          tailwindClasses.push(tailwindClass);
        } else {
          unsupportedStyles.push(`${pseudoClass}${subProp}: ${subValue}`);
        }
      });
    } else {
      const tailwindClass = mapCssToTailwind(property, value, pseudoClass);
      if (tailwindClass) {
        tailwindClasses.push(tailwindClass);
      } else {
        unsupportedStyles.push(`${pseudoClass}${property}: ${value}`);
      }
    }
  });

  return {
    tailwindClasses: tailwindClasses.join(" "),
    unsupportedStyles,
  };
};

export default function Home() {
  const [cssInput, setCssInput] = useState("");
  const [tailwindOutput, setTailwindOutput] = useState("");
  const [unsupportedStyles, setUnsupportedStyles] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleConvert = () => {
    const { tailwindClasses, unsupportedStyles } = parseCss(cssInput);
    setTailwindOutput(tailwindClasses);
    setUnsupportedStyles(unsupportedStyles);
  };

  const handleCopy = () => {
    if (tailwindOutput) {
      navigator.clipboard.writeText(tailwindOutput);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"} min-h-screen w-full pb-2`}
    >
      <NavBar
        title="CSS to Tailwind Converter"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <h1 className="relative z-10 font-sans text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 mb-7 mt-4">
        CSS to Tailwind Converter
      </h1>
      <div className="flex flex-col items-center justify-center p-4">
        <textarea
          className={`w-full max-w-2xl h-60 p-3 border border-gray-300 rounded-lg mb-4 ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}hover:border-blue-400 focus:border-blue-500 focus:outline-none`}
          placeholder="Enter CSS here..."
          value={cssInput}
          onChange={(e) => setCssInput(e.target.value)}
        />

        <button
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 items-center justify-center"
          onClick={handleConvert}
        >
          Convert to Tailwind
        </button>

        {tailwindOutput && (
          <div
            className={`w-full max-w-2xl p-4 rounded-lg shadow-md mb-4 relative items-center justify-center ${isDarkMode ? "bg-gray-800 border-gray-300  text-gray-400" : "bg-gray-200 border-gray-300  text-gray-500"}hover:border-blue-400 focus:border-blue-500 outline-none`}
          >
            <h2 className="text-xl font-semibold mb-2">Tailwind Output:</h2>
            <p className="font-mono text-sm break-words">{tailwindOutput}</p>

            <button
              className={`absolute top-2 right-2 ${copySuccess ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"} rounded p-2 focus:outline-none transition-colors duration-300`}
              onClick={handleCopy}
            >
              {copySuccess ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 7.707a1 1 0 00-1.414-1.414L9 12.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16h8m0 0l-3 3m3-3l-3-3m5-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h3"
                  />
                </svg>
              )}
            </button>
          </div>
        )}

        {unsupportedStyles.length > 0 && (
          <div className="w-full max-w-2xl bg-red-100 p-4 rounded-lg shadow-md mb-4 relative items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Unsupported CSS:</h2>
            <ul className="list-disc list-inside">
              {unsupportedStyles.map((style, idx) => (
                <li key={idx} className="text-red-600 font-mono text-sm">
                  {style}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

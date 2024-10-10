"use client";
import { useState } from "react";
import { NavBar } from "@/components/navbar";

const convertColor = (color) => {
  const colorMap = {
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

  if (colorMap[color.toLowerCase()]) {
    return colorMap[color.toLowerCase()];
  }
};

const getColorClass = (color, prefix) => {
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

const mapCssToTailwind = (property, value, pseudoClass = "") => {
  const convertValueToTailwind = (value) => {
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

  const tailwindMap = {
    // Spacing
    "margin-top": (v) => `mt-${v}`,
    "margin-right": (v) => `mr-${v}`,
    "margin-bottom": (v) => `mb-${v}`,
    "margin-left": (v) => `ml-${v}`,
    margin: (v) => `m-${v}`,
    "padding-top": (v) => `pt-${v}`,
    "padding-right": (v) => `pr-${v}`,
    "padding-bottom": (v) => `pb-${v}`,
    "padding-left": (v) => `pl-${v}`,
    padding: (v) => `p-${v}`,
    width: (v) => (v.endsWith("%") ? `w-${parseInt(v)}` : `w-${v}`),
    height: (v) => (v.endsWith("%") ? `h-${parseInt(v)}` : `h-${v}`),
    "max-width": (v) => (v === "100%" ? "max-w-full" : `max-w-${v}`),
    "max-height": (v) => (v === "100%" ? "max-h-full" : `max-h-${v}`),
    "min-width": (v) => (v === "100%" ? "min-w-full" : `min-w-${v}`),
    "min-height": (v) => (v === "100%" ? "min-h-full" : `min-h-${v}`),

    //Borders

    border: (v) => {
      const parts = v.split(" ");
      let classes = [];
      let width, style, color;

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
    "border-width": (v) => `border-${convertValueToTailwind(v)}`,
    "border-style": (v) => (v === "solid" ? `border-solid` : `border-${v}`),
    "border-color": (v) => {
      const color = convertColor(v);
      return color ? `border-${color}` : `border-${v}`;
    },
    "border-radius": (v) => `rounded-${convertValueToTailwind(v)}`,

    // Typography
    "font-size": (v) => {
      const sizes = {
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
    "font-weight": (v) => {
      const weights = {
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
    "text-align": (v) =>
      ({
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      })[v],
    "line-height": (v) => {
      const leadings = {
        1: "leading-none",
        1.25: "leading-tight",
        1.375: "leading-snug",
        1.5: "leading-normal",
        1.625: "leading-relaxed",
        2: "leading-loose",
      };
      return leadings[v] || `leading-${v}`;
    },
    "letter-spacing": (v) => {
      const trackings = {
        "-0.05em": "tracking-tighter",
        "-0.025em": "tracking-tight",
        0: "tracking-normal",
        "0.025em": "tracking-wide",
        "0.05em": "tracking-wider",
        "0.1em": "tracking-widest",
      };
      return trackings[v] || `tracking-${v}`;
    },
    "text-decoration": (v) =>
      ({
        underline: "underline",
        "line-through": "line-through",
        none: "no-underline",
      })[v],
    "font-style": (v) => ({ italic: "italic", normal: "not-italic" })[v],

    // Colors
    color: (v) => getColorClass(v, "text"),
    "background-color": (v) => getColorClass(v, "bg"),
    "border-color": (v) => getColorClass(v, "border"),

    color: (v) => getColorClass(v, `${pseudoClass}text`),
    "background-color": (v) => getColorClass(v, `${pseudoClass}bg`),
    "border-color": (v) => getColorClass(v, `${pseudoClass}border`),
    "outline-color": (v) => getColorClass(v, `${pseudoClass}outline`),
    "text-decoration-color": (v) =>
      getColorClass(v, `${pseudoClass}decoration`),
    fill: (v) => getColorClass(v, `${pseudoClass}fill`),
    stroke: (v) => getColorClass(v, `${pseudoClass}stroke`),

    // Additional pseudo-class specific mappings
    opacity: (v) => `${pseudoClass}opacity-${parseInt(parseFloat(v) * 100)}`,
    transform: (v) =>
      v === "none" ? `${pseudoClass}transform-none` : `${pseudoClass}transform`,
    scale: (v) => `${pseudoClass}scale-${parseInt(parseFloat(v) * 100)}`,
    rotate: (v) => `${pseudoClass}rotate-${v.replace("deg", "")}`,
    "translate-x": (v) =>
      `${pseudoClass}translate-x-${convertValueToTailwind(v)}`,
    "translate-y": (v) =>
      `${pseudoClass}translate-y-${convertValueToTailwind(v)}`,
    "skew-x": (v) => `${pseudoClass}skew-x-${v.replace("deg", "")}`,
    "skew-y": (v) => `${pseudoClass}skew-y-${v.replace("deg", "")}`,
    "box-shadow": (v) => {
      const shadows = {
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

    // // boxShadow
    "box-shadow": (v) => {
      const shadows = {
        none: "shadow-none",
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)":
          "shadow-sm",
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)":
          "shadow",
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)":
          "shadow-md",
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)":
          "shadow-lg",
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)": "shadow-xl",
        "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)": "shadow-inner",
      };

      return shadows[v] || `shadow-${v}`;
    },

    //colors
    color: (v) => {
      const color = convertColor(v);
      return color ? `text-${color}` : `text-${v}`;
    },
    "background-color": (v) => {
      const color = convertColor(v);
      return color ? `bg-${color}` : `bg-${v}`;
    },
    "border-color": (v) => {
      const color = convertColor(v);
      return color ? `border-${color}` : `border-${v}`;
    },

    //Border
    "border-radius": (v) =>
      ({
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      })[v] || `rounded-${v}`,

    "border-width": (v) =>
      ({
        "0px": "border-0",
        "2px": "border-2",
        "4px": "border-4",
        "8px": "border-8",
        "": "border",
      })[v] || `border-${v}`,

    "border-style": (v) =>
      ({
        solid: "border-solid",
        dashed: "border-dashed",
        dotted: "border-dotted",
        double: "border-double",
        none: "border-none",
      })[v] || `border-${v}`,

    "border-color": (v) =>
      ({
        inherit: "border-inherit",
        currentColor: "border-current",
        transparent: "border-transparent",
        "rgb(0 0 0)": "border-black",
        "rgb(255 255 255)": "border-white",
        "rgb(248 250 252)": "border-slate-50",
        "rgb(241 245 249)": "border-slate-100",
        "rgb(226 232 240)": "border-slate-200",
        "rgb(203 213 225)": "border-slate-300",
        "rgb(148 163 184)": "border-slate-400",
        "rgb(100 116 139)": "border-slate-500",
        "rgb(2 6 23)": "border-slate-950",
        " rgb(71 85 105)": "border-slate-600",
        " rgb(51 65 85)": "border-slate-700",
        " rgb(30 41 59)": "border-slate-800",
        " rgb(15 23 42)": "border-slate-900",
        " rgb(249 250 251)": "border-gray-50",
        " rgb(243 244 246)": "border-gray-100",
        " rgb(229 231 235)": "border-gray-200",
        "rgb(209 213 219)": "border-gray-300",
        "rgb(156 163 175)": "border-gray-400",
        "rgb(107 114 128)": "border-gray-500",
        "rgb(75 85 99)": "border-gray-600",
        "rgb(55 65 81)": "border-gray-700",
        "rgb(31 41 55)": "border-gray-800",
        "rgb(17 24 39)": "border-gray-900",
        "rgb(3 7 18)": "border-gray-950",
        "rgb(250 250 250)": "border-zinc-50",
        "rgb(244 244 245)": "border-zinc-100",
        "rgb(228 228 231)": "border-zinc-200",
        "rgb(212 212 216)": "border-zinc-300",
        "rgb(161 161 170)": "border-zinc-400",
        "rgb(113 113 122)": "border-zinc-500",
        "rgb(82 82 91)": "border-zinc-600",
        "rgb(63 63 70)": "border-zinc-700",
        "rgb(39 39 42)": "border-zinc-800",
        "rgb(24 24 27)": "border-zinc-900",
        "rgb(9 9 11)": "border-zinc-950",
        "rgb(250 250 250)": "border-neutral-50",
        "rgb(245 245 245)": "border-neutral-100",
        "rgb(229 229 229)": "border-neutral-200",
        "rgb(212 212 212)": "border-neutral-300",
        "rgb(163 163 163)": "border-neutral-400",
        "rgb(115 115 115)": "border-neutral-500",
        "rgb(82 82 82)": "border-neutral-600",
        "rgb(64 64 64)": "border-neutral-700",
        "rgb(38 38 38)": "border-neutral-800",
        "rgb(23 23 23)": "border-neutral-900",
        "rgb(10 10 10)": "border-neutral-950",
        "rgb(250 250 249)": "border-stone-50",
        "rgb(245 245 244)": "border-stone-100",
        "rgb(231 229 228)": "border-stone-200",
        "rgb(214 211 209)": "border-stone-300",
        "rgb(168 162 158)": "border-stone-400",
        "rgb(120 113 108)": "border-stone-500",
        "rgb(87 83 78)": "border-stone-600",
        "rgb(68 64 60)": "border-stone-700",
        "rgb(41 37 36)": "border-stone-800",
        "rgb(28 25 23)": "border-stone-900",
        "rgb(12 10 9)": "border-stone-950",
        "rgb(254 242 242)": "border-red-50",
        "rgb(254 226 226)": "border-red-100",
        "rgb(254 202 202)": "border-red-200",
        "rgb(252 165 165)": "border-red-300",
        "rgb(248 113 113)": "border-red-400",
        "rgb(239 68 68)": "border-red-500",
        "rgb(220 38 38)": "border-red-600",
        "rgb(185 28 28)": "border-red-700",
        "rgb(153 27 27)": "border-red-800",
        "rgb(127 29 29)": "border-red-900",
        "rgb(69 10 10)": "border-red-950",
        "rgb(254 242 242)": "border-rose-50",
        "rgb(254 226 226)": "border-rose-100",
        "rgb(254 202 202)": "border-rose-200",
        "rgb(252 165 165)": "border-rose-300",
        "rgb(248 113 113)": "border-rose-400",
        "rgb(239 68 68)": "border-rose-500",
        "rgb(220 38 38)": "border-rose-600",
        "rgb(185 28 28)": "border-rose-700",
        "rgb(153 27 27)": "border-rose-800",
        "rgb(127 29 29)": "border-rose-900",
        "rgb(69 10 10)": "border-rose-950",
        "rgb(254 242 242)": "border-pink-50",
        "rgb(254 226 226)": "border-pink-100",
        "rgb(254 202 202)": "border-pink-200",
        "rgb(252 165 165)": "border-pink-300",
        "rgb(248 113 113)": "border-pink-400",
        "rgb(239 68 68)": "border-pink-500",
        "rgb(220 38 38)": "border-pink-600",
        "rgb(185 28 28)": "border-pink-700",
        "rgb(153 27 27)": "border-pink-800",
        "rgb(127 29 29)": "border-pink-900",
        "rgb(69 10 10)": "border-pink-950",
        "rgb(254 242 242)": "border-orange-50",
        "rgb(254 226 226)": "border-orange-100",
        "rgb(254 202 202)": "border-orange-200",
        "rgb(253 186 186)": "border-orange-300",
        "rgb(251 146 146)": "border-orange-400",
        "rgb(249 115 115)": "border-orange-500",
        "rgb(234 88 88)": "border-orange-600",
        "rgb(194 65 65)": "border-orange-700",
        "rgb(154 52 52)": "border-orange-800",
        "rgb(124 45 45)": "border-orange-900",
        "rgb(67 20 20)": "border-orange-950",
        "rgb(255 251 235)": "border-amber-50",
        "rgb(254 243 199)": "border-amber-100",
        "rgb(253 230 138)": "border-amber-200",
        "rgb(252 211 77)": "border-amber-300",
        "rgb(251 191 36)": "border-amber-400",
        "rgb(245 158 11)": "border-amber-500",
        "rgb(217 119 6)": "border-amber-600",
        "rgb(180 83 9)": "border-amber-700",
        "rgb(146 64 14)": "border-amber-800",
        "rgb(120 53 15)": "border-amber-900",
        "rgb(69 26 3)": "border-amber-950",
        "rgb(254 252 232)": "border-yellow-50",
        "rgb(254 249 195)": "border-yellow-100",
        "rgb(254 240 138)": "border-yellow-200",
        "rgb(253 224 71)": "border-yellow-300",
        "rgb(250 204 21)": "border-yellow-400",
        "rgb(234 179 8)": "border-yellow-500",
        "rgb(202 138 4)": "border-yellow-600",
        "rgb(161 98 7)": "border-yellow-700",
        "rgb(133 77 14)": "border-yellow-800",
        "rgb(113 63 18)": "border-yellow-900",
        "rgb(66 32 6)": "border-yellow-950",
        "rgb(247 254 231)": "border-lime-50",
        "rgb(236 252 203)": "border-lime-100",
        "rgb(217 249 157)": "border-lime-200",
        "rgb(190 242 100)": "border-lime-300",
        "rgb(163 230 53)": "border-lime-400",
        "rgb(132 204 22)": "border-lime-500",
        "rgb(101 163 13)": "border-lime-600",
        "rgb(77 124 15)": "border-lime-700",
        "rgb(63 98 18)": "border-lime-800",
        "rgb(54 83 20)": "border-lime-900",
        "rgb(26 46 5)": "border-lime-950",
        "rgb(240 253 244)": "border-green-50",
        "rgb(220 252 231)": "border-green-100",
        "rgb(187 247 208)": "border-green-200",
        "rgb(134 239 172)": "border-green-300",
        "rgb(74 222 128)": "border-green-400",
        "rgb(34 197 94)": "border-green-500",
        "rgb(22 163 74)": "border-green-600",
        "rgb(21 128 61)": "border-green-700",
        "rgb(22 101 52)": "border-green-800",
        "rgb(20 83 45)": "border-green-900",
        "rgb(5 46 22)": "border-green-950",
        "rgb(236 253 245)": "border-emerald-50",
        "rgb(209 250 229)": "border-emerald-100",
        "rgb(167 243 208)": "border-emerald-200",
        "rgb(110 231 183)": "border-emerald-300",
        "rgb(52 211 153)": "border-emerald-400",
        "rgb(16 185 129)": "border-emerald-500",
        "rgb(5 150 105)": "border-emerald-600",
        "rgb(4 120 87)": "border-emerald-700",
        "rgb(6 95 70)": "border-emerald-800",
        "rgb(6 78 59)": "border-emerald-900",
        "rgb(2 44 34)": "border-emerald-950",
        "rgb(240 253 250)": "border-teal-50",
        "rgb(204 251 241)": "border-teal-100",
        "rgb(153 246 228)": "border-teal-200",
        "rgb(94 234 212)": "border-teal-300",
        "rgb(45 212 191)": "border-teal-400",
        "rgb(20 184 166)": "border-teal-500",
        "rgb(13 148 136)": "border-teal-600",
        "rgb(15 118 110)": "border-teal-700",
        "rgb(17 94 89)": "border-teal-800",
        "rgb(19 78 74)": "border-teal-900",
        "rgb(4 47 46)": "border-teal-950",
        "rgb(236 254 255)": "border-cyan-50",
        "rgb(207 250 254)": "border-cyan-100",
        "rgb(165 243 252)": "border-cyan-200",
        "rgb(103 232 249)": "border-cyan-300",
        "rgb(34 211 238)": "border-cyan-400",
        "rgb(6 182 212)": "border-cyan-500",
        "rgb(8 145 178)": "border-cyan-600",
        "rgb(14 116 144)": "border-cyan-700",
        "rgb(21 94 117)": "border-cyan-800",
        "rgb(22 78 99)": "border-cyan-900",
        "rgb(8 51 68)": "border-cyan-950",
        "rgb(240 249 255)": "border-sky-50",
        "rgb(191 232 249)": "border-sky-100",
        "rgb(135 215 249)": "border-sky-200",
        "rgb(77 190 242)": "border-sky-300",
        "rgb(38 154 188)": "border-sky-400",
        "rgb(15 120 148)": "border-sky-500",
        "rgb(5 97 122)": "border-sky-600",
        "rgb(6 78 97)": "border-sky-700",
        "rgb(8 65 82)": "border-sky-800",
        "rgb(8 55 70)": "border-sky-900",
        "rgb(3 30 38)": "border-sky-950",
        "rgb(240 248 255)": "border-blue-50",
        "rgb(191 219 254)": "border-blue-100",
        "rgb(135 181 250)": "border-blue-200",
        "rgb(77 140 247)": "border-blue-300",
        "rgb(38 97 245)": "border-blue-400",
        "rgb(15 78 232)": "border-blue-500",
        "rgb(5 61 199)": "border-blue-600",
        "rgb(6 52 160)": "border-blue-700",
        "rgb(8 41 122)": "border-blue-800",
        "rgb(8 33 100)": "border-blue-900",
        "rgb(3 18 56)": "border-blue-950",
        "rgb(243 244 255)": "border-indigo-50",
        "rgb(214 215 254)": "border-indigo-100",
        "rgb(173 174 252)": "border-indigo-200",
        "rgb(123 125 250)": "border-indigo-300",
        "rgb(73 76 248)": "border-indigo-400",
        "rgb(31 33 245)": "border-indigo-500",
        "rgb(13 16 233)": "border-indigo-600",
        "rgb(10 12 196)": "border-indigo-700",
        "rgb(10 10 158)": "border-indigo-800",
        "rgb(10 10 124)": "border-indigo-900",
        "rgb(4 4 69)": "border-indigo-950",
        "rgb(248 243 255)": "border-violet-50",
        "rgb(225 206 253)": "border-violet-100",
        "rgb(190 158 251)": "border-violet-200",
        "rgb(147 101 247)": "border-violet-300",
        "rgb(102 49 244)": "border-violet-400",
        "rgb(69 18 239)": "border-violet-500",
        "rgb(54 12 204)": "border-violet-600",
        "rgb(47 12 168)": "border-violet-700",
        "rgb(41 10 130)": "border-violet-800",
        "rgb(35 9 101)": "border-violet-900",
        "rgb(20 5 56)": "border-violet-950",
        "rgb(253 242 255)": "border-purple-50",
        "rgb(250 220 253)": "border-purple-100",
        "rgb(245 176 250)": "border-purple-200",
        "rgb(237 130 247)": "border-purple-300",
        "rgb(229 80 244)": "border-purple-400",
        "rgb(218 37 240)": "border-purple-500",
        "rgb(188 32 206)": "border-purple-600",
        "rgb(153 27 171)": "border-purple-700",
        "rgb(126 22 142)": "border-purple-800",
        "rgb(103 19 117)": "border-purple-900",
        "rgb(58 10 66)": "border-purple-950",
        "rgb(254 242 255)": "border-fuchsia-50",
        "rgb(252 216 253)": "border-fuchsia-100",
        "rgb(249 177 250)": "border-fuchsia-200",
        "rgb(243 134 247)": "border-fuchsia-300",
        "rgb(236 83 244)": "border-fuchsia-400",
        "rgb(229 39 241)": "border-fuchsia-500",
        "rgb(197 20 207)": "border-fuchsia-600",
        "rgb(162 16 172)": "border-fuchsia-700",
        "rgb(133 14 142)": "border-fuchsia-800",
        "rgb(110 12 117)": "border-fuchsia-900",
        "rgb(61 6 66)": "border-fuchsia-950",
        "rgb(253 242 255)": "border-pink-50",
        "rgb(252 216 253)": "border-pink-100",
        "rgb(249 177 250)": "border-pink-200",
        "rgb(243 134 247)": "border-pink-300",
        "rgb(236 83 244)": "border-pink-400",
        "rgb(229 39 241)": "border-pink-500",
        "rgb(197 20 207)": "border-pink-600",
        "rgb(162 16 172)": "border-pink-700",
        "rgb(133 14 142)": "border-pink-800",
        "rgb(110 12 117)": "border-pink-900",
        "rgb(61 6 66)": "border-pink-950",
      })[v] || `border-${v}`,

    //outline
    "outline-color": (v) =>
      ({
        inherit: "outline-inherit",
        currentColor: "outline-current",
        transparent: "outline-transparent",
        "rgb(0 0 0)": "outline-black",
        "rgb(255 255 255)": "outline-white",
        "rgb(248 250 252)": "outline-slate-50",
        "rgb(241 245 249)": "outline-slate-100",
        "rgb(226 232 240)": "outline-slate-200",
        "rgb(203 213 225)": "outline-slate-300",
        "rgb(148 163 184)": "outline-slate-400",
        "rgb(100 116 139)": "outline-slate-500",
        "rgb(2 6 23)": "outline-slate-950",
        " rgb(71 85 105)": "outline-slate-600",
        " rgb(51 65 85)": "outline-slate-700",
        " rgb(30 41 59)": "outline-slate-800",
        " rgb(15 23 42)": "outline-slate-900",
        " rgb(249 250 251)": "outline-gray-50",
        "rgb(243 244 246)": "outline-gray-100",
        "rgb(229 231 235)": "outline-gray-200",
        "rgb(209 213 219)": "outline-gray-300",
        "rgb(156 163 175)": "outline-gray-400",
        "rgb(107 114 128)": "outline-gray-500",
        "rgb(75 85 99)": "outline-gray-600",
        "rgb(55 65 81)": "outline-gray-700",
        "rgb(31 41 55)": "outline-gray-800",
        "rgb(17 24 39)": "outline-gray-900",
        "rgb(3 7 18)": "outline-gray-950",
        "rgb(250 250 250)": "outline-zinc-50",
        "rgb(244 244 245)": "outline-zinc-100",
        "rgb(228 228 231)": "outline-zinc-200",
        "rgb(212 212 216)": "outline-zinc-300",
        "rgb(161 161 170)": "outline-zinc-400",
        "rgb(113 113 122)": "outline-zinc-500",
        "rgb(82 82 91)": "outline-zinc-600",
        "rgb(63 63 70)": "outline-zinc-700",
        "rgb(39 39 42)": "outline-zinc-800",
        "rgb(24 24 27)": "outline-zinc-900",
        "rgb(9 9 11)": "outline-zinc-950",
        "rgb(250 250 250)": "outline-neutral-50",
        "rgb(245 245 245)": "outline-neutral-100",
        "rgb(229 229 229)": "outline-neutral-200",
        "rgb(212 212 212)": "outline-neutral-300",
        "rgb(163 163 163)": "outline-neutral-400",
        "rgb(115 115 115)": "outline-neutral-500",
        "rgb(82 82 82)": "outline-neutral-600",
        "rgb(64 64 64)": "outline-neutral-700",
        "rgb(38 38 38)": "outline-neutral-800",
        "rgb(23 23 23)": "outline-neutral-900",
        "rgb(10 10 10)": "outline-neutral-950",
        "rgb(250 250 249)": "outline-stone-50",
        "rgb(244 244 245)": "outline-stone-100",
        "rgb(228 228 231)": "outline-stone-200",
        "rgb(212 212 216)": "outline-stone-300",
        "rgb(168 162 158)": "outline-stone-400",
        "rgb(120 113 108)": "outline-stone-500",
        "rgb(87 83 78)": "outline-stone-600",
        "rgb(68 64 60)": "outline-stone-700",
        "rgb(41 37 36)": "outline-stone-800",
        "rgb(28 25 23)": "outline-stone-900",
        "rgb(12 10 9)": "outline-stone-950",
        "rgb(254 242 242)": "outline-red-50",
        "rgb(254 226 226)": "outline-red-100",
        "rgb(254 202 202)": "outline-red-200",
        "rgb(252 165 165)": "outline-red-300",
        "rgb(248 113 113)": "outline-red-400",
        "rgb(239 68 68)": "outline-red-500",
        "rgb(220 38 38)": "outline-red-600",
        "rgb(185 28 28)": "outline-red-700",
        "rgb(153 27 27)": "outline-red-800",
        "rgb(127 29 29)": "outline-red-900",
        "rgb(69 10 10)": "outline-red-950",
        "rgb(254 242 242)": "outline-rose-50",
        "rgb(254 226 226)": "outline-rose-100",
        "rgb(254 202 202)": "outline-rose-200",
        "rgb(252 165 165)": "outline-rose-300",
        "rgb(248 113 113)": "outline-rose- 400",
        "rgb(239 68 68)": "outline-rose-500",
        "rgb(220 38 38)": "outline-rose-600",
        "rgb(185 28 28)": "outline-rose-700",
        "rgb(153 27 27)": "outline-rose-800",
        "rgb(127 29 29)": "outline-rose-900",
        "rgb(69 10 10)": "outline-rose-950",
        "rgb(254 242 242)": "outline-pink-50",
        "rgb(254 226 226)": "outline-pink-100",
        "rgb(254 202 202)": "outline-pink-200",
        "rgb(252 165 165)": "outline-pink-300",
        "rgb(248 113 113)": "outline-pink-400",
        "rgb(239 68 68)": "outline-pink-500",
        "rgb(220 38 38)": "outline-pink-600",
        "rgb(185 28 28)": "outline-pink-700",
        "rgb(153 27 27)": "outline-pink-800",
        "rgb(127 29 29)": "outline-pink-900",
        "rgb(69 10 10)": "outline-pink-950",
        "rgb(254 242 242)": "outline-orange-50",
        "rgb(254 226 226)": "outline-orange-100",
        "rgb(254 202 202)": "outline-orange-200",
        "rgb(253 186 186)": "outline-orange-300",
        "rgb(251 146 146)": "outline-orange-400",
        "rgb(249 115 115)": "outline-orange-500",
        "rgb(234 88 88)": "outline-orange-600",
        "rgb(194 65 65)": "outline-orange-700",
        "rgb(154 52 52)": "outline-orange-800",
        "rgb(124 45 45)": "outline-orange-900",
        "rgb(67 20 20)": "outline-orange-950",
        "rgb(255 251 235)": "outline-amber-50",
        "rgb(254 243 199)": "outline-amber- 100",
        "rgb(253 230 138)": "outline-amber-200",
        "rgb(252 211 77)": "outline-amber-300",
        "rgb(251 191 36)": "outline-amber-400",
        "rgb(245 158 11)": "outline-amber-500",
        "rgb(217 119 6)": "outline-amber-600",
        "rgb(180 83 9)": "outline-amber-700",
        "rgb(146 64 14)": "outline-amber-800",
        "rgb(120 53 15)": "outline-amber-900",
        "rgb(69 26 3)": "outline-amber-950",
        "rgb(254 252 232)": "outline-yellow-50",
        "rgb(254 249 195)": "outline-yellow-100",
        "rgb(254 240 138)": "outline-yellow-200",
        "rgb(253 224 71)": "outline-yellow-300",
        "rgb(250 204 21)": "outline-yellow-400",
        "rgb(234 179 8)": "outline-yellow-500",
        "rgb(202 138 4)": "outline-yellow-600",
        "rgb(161 98 7)": "outline-yellow-700",
        "rgb(133 77 14)": "outline-yellow-800",
        "rgb(113 63 18)": "outline-yellow-900",
        "rgb(66 32 6)": "outline-yellow-950",
        "rgb(236 253 245)": "outline-lime-50",
        "rgb(220 252 231)": "outline-lime-100",
        "rgb(190 242 100)": "outline-lime-200",
        "rgb(163 230 53)": "outline-lime-300",
        "rgb(132 204 22)": "outline-lime-400",
        "rgb(101 163 13)": "outline-lime-500",
        "rgb(77 124 15)": "outline-lime-600",
        "rgb(63 98 18)": "outline-lime-700",
        "rgb(54 83 20)": "outline-lime-800",
        "rgb(26 46 5)": "outline-lime- 900",
        "rgb(240 253 250)": "outline-green-50",
        "rgb(187 247 208)": "outline-green-200",
        "rgb(134 239 172)": "outline-green-300",
        "rgb(74 222 128)": "outline-green-400",
        "rgb(34 197 94)": "outline-green-500",
        "rgb(22 163 74)": "outline-green-600",
        "rgb(21 128 61)": "outline-green-700",
        "rgb(22 101 52)": "outline-green-800",
        "rgb(20 83 45)": "outline-green-900",
        "rgb(5 46 22)": "outline-green-950",
        "rgb(236 253 245)": "outline-emerald-50",
        "rgb(167 243 208)": "outline-emerald-200",
        "rgb(110 231 183)": "outline-emerald-300",
        "rgb(52 211 153)": "outline-emerald-400",
        "rgb(16 185 129)": "outline-emerald-500",
        "rgb(5 150 105)": "outline-emerald-600",
        "rgb(4 120 87)": "outline-emerald-700",
        "rgb(6 95 70)": "outline-emerald-800",
        "rgb(6 78 59)": "outline-emerald-900",
        "rgb(2 44 34)": "outline-emerald-950",
        "rgb(240 253 250)": "outline-teal-50",
        "rgb(153 246 228)": "outline-teal-200",
        "rgb(94 234 212)": "outline-teal-300",
        "rgb(45 212 191)": "outline-teal-400",
        "rgb(20 184 166)": "outline-teal-500",
        "rgb(13 148 136)": "outline-teal-600",
        "rgb(15 118 110)": "outline-teal-700",
        "rgb(17 94 89)": "outline-teal-800",
        "rgb(19 78 74)": "outline-teal-900",
        "rgb(4 47 46)": "outline-teal-950",
        "rgb(236 254 255)": "outline-cyan-50",
        "rgb(165 243 252)": "outline-cyan-200",
        "rgb(103 232 249)": "outline-cyan-300",
        "rgb(34 211 238)": "outline-cyan-400",
        "rgb(6 182 212)": "outline-cyan-500",
        "rgb(8 145 178)": "outline-cyan-600",
        "rgb(14 116 144)": "outline-cyan-700",
        "rgb(21 94 117)": "outline-cyan-800",
        "rgb(22 78 99)": "outline-cyan-900",
        "rgb(8 51 68)": "outline-cyan-950",
        "rgb(240 249 255)": "outline-sky-50",
        "rgb(135 215 249)": "outline-sky-200",
        "rgb(77 190 242)": "outline-sky-300",
        "rgb(38 154 188)": "outline-sky-400",
        "rgb(15 120 148)": "outline-sky-500",
        "rgb(5 97 122)": "outline-sky-600",
        "rgb(6 78 97)": "outline-sky-700",
        "rgb(8 65 82)": "outline-sky-800",
        "rgb(8 55 70)": "outline-sky-900",
        "rgb(3 30 38)": "outline-sky-950",
        "rgb(240 248 255)": "outline-blue-50",
        "rgb(77 140 247)": "outline-blue-300",
        "rgb(38 97 245)": "outline-blue-400",
        "rgb(15 78 232)": "outline-blue-500",
        "rgb(5 61 199)": "outline-blue-600",
        "rgb(6 52 160)": "outline-blue-700",
        "rgb(8 41 122)": "outline-blue-800",
        "rgb(8 33 100)": "outline-blue-900",
        "rgb(3 18 56)": "outline-blue-950",
        "rgb(243 244 255)": "outline-indigo-50",
        "rgb(171 178 255)": "outline-indigo-200",
        "rgb(113 128 255)": "outline-indigo-300",
        "rgb(54 75 250)": "outline-indigo-400",
        "rgb(22 46 229)": "outline-indigo-500",
        "rgb(10 32 191)": "outline-indigo-600",
        "rgb(10 26 153)": "outline-indigo-700",
        "rgb(11 22 119)": "outline-indigo-800",
        "rgb(10 19 97)": "outline-indigo-900",
        "rgb(5 10 37)": "outline-indigo-950",
        "rgb(245 243 255)": "outline-violet-50",
        "rgb(214 210 255)": "outline-violet-200",
        "rgb(183 178 255)": "outline-violet-300",
        "rgb(148 135 255)": "outline-violet-400",
        "rgb(121 100 254)": "outline-violet-500",
        "rgb(96 69 250)": "outline-violet-600",
        "rgb(78 52 235)": "outline-violet-700",
        "rgb(65 41 214)": "outline-violet-800",
        "rgb(55 34 193)": "outline-violet-900",
        "rgb(30 18 94)": "outline-violet-950",
        "rgb(249 243 255)": "outline-purple-50",
        "rgb(234 218 255)": "outline-purple-200",
        "rgb(221 181 255)": "outline-purple-300",
        "rgb(204 136 255)": "outline-purple-400",
        "rgb(178 102 255)": "outline-purple-500",
        "rgb(154 73 255)": "outline-purple-600",
        "rgb(132 51 235)": "outline-purple-700",
        "rgb(114 39 214)": "outline-purple-800",
        "rgb(99 33 193)": "outline-purple-900",
        "rgb(57 19 94)": "outline-purple-950",
        "rgb(253 244 255)": "outline-fuchsia-50",
        "rgb(250 215 254)": "outline-fuchsia-200",
        "rgb(247 176 252)": "outline-fuchsia-300",
        "rgb(240 132 250)": "outline-fuchsia-400",
        "rgb(230 73 247)": "outline-fuchsia-500",
        "rgb(214 11 235)": "outline-fuchsia-600",
        "rgb(183 10 200)": "outline-fuchsia-700",
        "rgb(148 8 167)": "outline-fuchsia-800",
        "rgb(120 6 136)": "outline-fuchsia-900",
        "rgb(66 3 74)": "outline-fuchsia-950",
      })[v] || `outline-color ${v}`,

    "outline-width": (v) =>
      ({
        0: "outline-none",
        "1px": "outline-1",
        "2px": "outline-2",
        "3px": "outline-3",
        "4px": "outline-4",
        "5px": "outline-5",
        "6px": "outline-6",
        "8px": "outline-8",
        "12px": "outline-12",
        "16px": "outline-16",
        "24px": "outline-24",
      })[v] || `outline-${v}`,
    "outline-style": (v) =>
      ({
        none: "outline-none",
        solid: "outline-solid",
        dashed: "outline-dashed",
        dotted: "outline-dotted",
        double: "outline-double",
      })[v] || `outline-${v}`,
    "outline-offset": (v) =>
      ({
        0: "outline-offset-0",
        "1px": "outline-offset-1",
        "2px": "outline-offset-2",
        "3px": "outline-offset-3",
        "4px": "outline-offset-4",
        "5px": "outline-offset-5",
        "6px": "outline-offset-6",
        "8px": "outline-offset-8",
        "12px": "outline-offset-12",
        "16px": "outline-offset-16",
        "24px": "outline-offset-24",
      })[v] || `outline-offset-${v}`,
    "outline-opacity": (v) =>
      ({
        0: "outline-opacity-0",
        5: "outline-opacity-5",
        10: "outline-opacity-10",
        20: "outline-opacity-20",
        25: "outline-opacity-25",
        30: "outline-opacity-30",
        40: "outline-opacity-40",
        50: "outline-opacity-50",
        60: "outline-opacity-60",
        70: "outline-opacity-70",
        75: "outline-opacity-75",
        80: "outline-opacity-80",
        90: "outline-opacity-90",
        95: "outline-opacity-95",
        100: "outline-opacity-100",
      })[v] || `outline-opacity ${v}`,

    //box-shadow
    "box-shadow": (v) =>
      ({
        "var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring-0",
        "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring-1",
        "var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring-2",
        "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring",
        "var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring-4",
        "var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color)":
          "ring-8",
        " 0 1px 2px 0 rgb(0 0 0 / 0.05)": "shadow-sm",
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)":
          "shadow",
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)":
          "shadow-md",
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)":
          "shadow-lg",
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)":
          "shadow-xl",
        "0 25px 50px -12px rgb(0 0 0 / 0.25)": "shadow-2xl",
        "box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)": "shadow-inner",
        "0 0 #0000": "shadow-none",
      })[v] || `shadow-${v}`,

    //opacity
    opacity: (v) =>
      ({
        0: "opacity-0",
        0.05: "opacity-5",
        0.1: "opacity-10",
        0.15: "opacity-15",
        0.2: "opacity-20",
        0.25: "opacity-25",
        0.3: "opacity-30",
        0.35: "opacity-35",
        0.4: "opacity-40",
        0.45: "opacity-45",
        0.5: "opacity-50",
        0.55: "opacity-55",
        0.6: "opacity-60",
        0.65: "opacity-65",
        0.7: "opacity-70",
        0.75: "opacity-75",
        0.8: "opacity-80",
        0.85: "opacity-85",
        90: "opacity-90",
        95: "opacity-95",
        100: "opacity-100",
      })[v] || `opacity-${v}`,

    //filter
    filter: (v) =>
      ({
        "blur(4px)": "blur-sm",
        "blur(8px)": "blur",
        0: "blur-none",
        "blur(12px)": "blur-md",
        "blur(16px)": "blur-lg",
        "blur(24px)": "blur-xl",
        "blur(40px)": "blur-2xl",
        "blur(64px)": "blur-3xl",
        "brightness(0)": "brightness-0",
        " brightness(.5)": " brightness-50",
        "brightness(.75)": "brightness-75",
        "brightness(.9)": "brightness-90",
        "brightness(.95)": "brightness-95",
        "brightness(1)": "brightness-100",
        "brightness(1.05)": "brightness-105",
        "brightness(1.1)": "brightness-110",
        " brightness(1.25)": " brightness-125",
        "brightness(1.5)": "brightness-150",
        "brightness(2)": "brightness-200",
      })[v] || `filter-${v}`,

    //backdrop-filter
    "backdrop-filter": (v) =>
      ({
        "blur(4px)": "blur-sm",
        "blur(8px)": "blur",
        0: "blur-none",
        "blur(12px)": "blur-md",
        "blur(16px)": "blur-lg",
        "blur(24px)": "blur-xl",
        "blur(40px)": "blur-2xl",
        "blur(64px)": "blur-3xl",
        "brightness(0)": "brightness-0",
        " brightness(.5)": " brightness-50",
        "brightness(.75)": "brightness-75",
        "brightness(.9)": "brightness-90",
        "brightness(.95)": "brightness-95",
        "brightness(1)": "brightness-100",
        "brightness(1.05)": "brightness-105",
        "brightness(1.1)": "brightness-110",
        " brightness(1.25)": " brightness-125",
        "brightness(1.5)": "brightness-150",
        "brightness(2)": "brightness-200",
      })[v] || `backdrop-filter-${v}`,

    //transition
    transition: (v) =>
      ({
        none: "transition-none",
        all: "transition-all",
        colors: "transition-colors",
        opacity: "transition-opacity",
        shadow: "transition-shadow",
        transform: "transition-transform",
      })[v] || `transition-${v}`,
    "transition-duration": (v) =>
      ({
        75: "duration-75",
        100: "duration-100",
        150: "duration-150",
        200: "duration-200",
        300: "duration-300",
        500: "duration-500",
        700: "duration-700",
        1000: "duration-1000",
      })[v] || `duration-${v}`,
    "transition-timing-function": (v) =>
      ({
        linear: "ease-linear",
        in: "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
      })[v] || `ease-${v}`,
    "transition-delay": (v) =>
      ({
        75: "delay-75",
        100: "delay-100",
        150: "delay-150",
        200: "delay-200",
        300: "delay-300",
        500: "delay-500",
        700: "delay-700",
        1000: "delay-1000",
      })[v] || `delay-${v}`,

    //transform
    transform: (v) =>
      ({
        "scale(0)": "scale-0",
        "scaleX(0)": "scale-x-0",
        "scaleY(0)": "scale-y-0",
        "scale(.5)": "scale-50",
        "scaleX(.5)": "scale-x-50",
        "scaleY(.5)": "scale-y-50",
        "scale(.75)": "scale-75",
        "scaleX(.75)": "scale-x-75",
        "scaleY(.75)": "scale-y-75",
        "scale(.9)": "scale-90",
        "scaleX(.9)": "scale-x-90",
        "scaleY(.9)": "scale-y-90",
        "scale(.95)": "scale-95",
        "scaleX(.95)": "scale-x-95",
        "scaleY(.95)": "scale-y-95",
        "scale(1)": "scale-100",
        "scaleX(1)": "scale-x-100",
        "scaleY(1)": "scale-y-100",
        "scale(1.05)": "scale-105",
        "scaleX(1.05)": "scale-x-105",
        "scaleY(1.05)": "scale-y-105",
        "scale(1.1)": "scale-110",
        "scaleX(1.1)": "scale-x-110",
        "scaleY(1.1)": "scale-y-110",
        "scale(1.25)": "scale-125",
        "scaleX(1.25)": "scale-x-125",
        "scaleY(1.25)": "scale-y-125",
        "scale(1.5)": "scale-150",
        "scaleX(1.5)": "scale-x-150",
        "scaleY(1.5)": "scale-y-150",
        "scale(1.75)": "scale-175",
        "scaleX(1.75)": "scale-x-175",
        "scaleY(1.75)": "scale-y-175",
        "scale(2)": "scale-200",
        "scaleX(2)": "scale-x-200",
        "scaleY(2)": "scale-y-200",
        "rotate(0deg)": "rotate-0",
        "rotate(-180deg)": "rotate-180",
        "rotate(-90deg)": "rotate-90",
        "rotate(-45deg)": "rotate-45",
        "rotate(-12deg)": "rotate-12",
        "rotate(-6deg)": "rotate-6",
        "rotate(-3deg)": "rotate-3",
        "rotate(-2deg)": "rotate-2",
        "rotate(-1deg)": "rotate-1",
        "rotate(1deg)": "rotate-1",
        "rotate(2deg)": "rotate-2",
        "rotate(3deg)": "rotate-3",
        "rotate(6deg)": "rotate-6",
        "rotate(12deg)": "rotate-12",
        "rotate(45deg)": "rotate-45",
        "rotate(90deg)": "rotate-90",
        "rotate(180deg)": "rotate-180",
        "rotate(-180deg)": "rotate-180",
        "rotate(-90deg)": "rotate-90",
        "rotate(-45deg)": "rotate-45",
        "rotate(-12deg)": "rotate-12",
        "rotate(-6deg)": "rotate-6",
        "rotate(-3deg)": "rotate-3",
        "rotate(-2deg)": "rotate-2",
        "rotate(-1deg)": "rotate-1",
        "rotate(1deg)": "rotate-1",
        "rotate(2deg)": "rotate-2",
        "rotate(3deg)": "rotate-3",
        "rotate(6deg)": "rotate-6",
        "rotate(12deg)": "rotate-12",
        "rotate(45deg)": "rotate-45",
        "rotate(90deg)": "rotate-90",
        "rotate(180deg)": "rotate-180",
        "rotate(-180deg)": "rotate-180",
        "rotate(-90deg)": "rotate-90",
        "rotate(-45deg)": "rotate-45",
        "rotate(-12deg)": "rotate-12",
        "rotate(-6deg)": "rotate-6",
        "rotate(-3deg)": "rotate-3",
        "rotate(-2deg)": "rotate-2",
        "rotate(-1deg)": "rotate-1",
        "rotate(1deg)": "rotate-1",
        "rotate(2deg)": "rotate-2",
        "rotate(3deg)": "rotate-3",
        "rotate(6deg)": "rotate-6",
        "rotate(12deg)": "rotate-12",
        "rotate(45deg)": "rotate-45",
        "rotate(90deg)": "rotate-90",
        "rotate(180deg)": "rotate-180",
        "translateX(0px)": "translate-x-0",
        "translateY(0px)": "translate-y-0",
        "translateX(1px)": "translate-x-px",
        "translateY(1px)": "translate-y-px",
        "translateX(0.125rem)": "translate-x-0.5",
        "translateY(0.125rem)": "translate-y-0.5",
        "translateX(0.25rem)": "translate-x-1",
        "translateY(0.25rem)": "translate-y-1",
        "translateX(0.375rem)": "translate-x-1.5",
        "translateY(0.375rem)": "translate-y-1.5",
        "translateX(0.5rem)": "translate-x-2",
        "translateY(0.5rem)": "translate-y-2",
        "translateX(0.625rem)": "translate-x-2.5",
        "translateY(0.625rem)": "translate-y-2.5",
        "translateX(0.75rem)": "translate-x-3",
        "translateY(0.75rem)": "translate-y-3",
        "translateX(0.875rem)": "translate-x-3.5",
        "translateY(0.875rem)": "translate-y-3.5",
        "translateX(1rem)": "translate-x-4",
        "translateY(1rem)": "translate-y-4",
        "translateX(1.25rem)": "translate-x-5",
        "translateY(1.25rem)": "translate-y-5",
        "translateX(1.5rem)": "translate-x-6",
        "translateY(1.5rem)": "translate-y-6",
        "translateX(1.75rem)": "translate-x-7",
        "translateY(1.75rem)": "translate-y-7",
        "translateX(2rem)": "translate-x-8",
        "translateY(2rem)": "translate-y-8",
        "translateX(2.25rem)": "translate-x-9",
        "translateY(2.25rem)": "translate-y-9",
        "translateX(2.5rem)": "translate-x-10",
        "translateY(2.5rem)": "translate-y-10",
        "translateX(2.75rem)": "translate-x-11",
        "translateY(2.75rem)": "translate-y-11",
        "translateX(3rem)": "translate-x-12",
        "translateY(3rem)": "translate-y-12",
        "translateX(3.5rem)": "translate-x-14",
        "translateY(3.5rem)": "translate-y-14",
        "translateX(4rem)": "translate-x-16",
        "translateY(4rem)": "translate-y-16",
        "translateX(5rem)": "translate-x-20",
        "translateY(5rem)": "translate-y-20",
        "translateX(6rem)": "translate-x-24",
        "translateY(6rem)": "translate-y-24",
        "translateX(7rem)": "translate-x-28",
        "translateY(7rem)": "translate-y-28",
        "translateX(8rem)": "translate-x-32",
        "translateY(8rem)": "translate-y-32",
        "translateX(9rem)": "translate-x-36",
        "translateY(9rem)": "translate-y-36",
        "translateX(10rem)": "translate-x-40",
        "translateY(10rem)": "translate-y-40",
        "translateX(11rem)": "translate-x-44",
        "translateY(11rem)": "translate-y-44",
        "translateX(12rem)": "translate-x-48",
        "translateY(12rem)": "translate-y-48",
        "translateX(14rem)": "translate-x-56",
        "translateY(14rem)": "translate-y-56",
        "translateX(16rem)": "translate-x-64",
        "translateY(16rem)": "translate-y-64",
        "translateX(20rem)": "translate-x-80",
        "translateY(20rem)": "translate-y-80",
        "translateX(24rem)": "translate-x-96",
        "translateY(24rem)": "translate-y-96",
        "translateX(28rem)": "translate-x-112",
        "translateY(28rem)": "translate-y-112",
        "translateX(32rem)": "translate-x-128",
        "translateY(32rem)": "translate-y-128",
        "translateX(36rem)": "translate-x-144",
        "translateY(36rem)": "translate-y-144",
        "translateX(40rem)": "translate-x-160",
        "translateY(40rem)": "translate-y-160",
        "translateX(44rem)": "translate-x-176",
        "translateY(44rem)": "translate-y-176",
        "translateX(48rem)": "translate-x-192",
        "translateY(48rem)": "translate-y-192",
        "translateX(52rem)": "translate-x-208",
        "translateX(50%)": "translate-x-1/2",
        "translateY(50%)": "translate-y-1/2",
        "translateX(33.333333%)": "translate-x-1/3",
        "translateY(33.333333%)": "translate-y-1/3",
        "translateX(66.666667%)": "translate-x-2/3",
        "translateY(66.666667%)": "translate-y-2/3",
        "translateX(25%)": "translate-x-1/4",
        "translateY(25%)": "translate-y-1/4",
        "translateX(75%)": "translate-x-3/4",
        "translateY(75%)": "translate-y-3/4",
        "translateX(20%)": "translate-x-1/5",
        "translateY(20%)": "translate-y-1/5",
        "translateX(40%)": "translate-x-2/5",
        "translateY(40%)": "translate-y-2/5",
        "translateX(60%)": "translate-x-3/5",
        "translateY(60%)": "translate-y-3/5",
        "translateX(80%)": "translate-x-4/5",
        "translateY(80%)": "translate-y-4/5",
        "translateX(16.666667%)": "translate-x-1/6",
        "translateY(16.666667%)": "translate-y-1/6",
        "translateX(50%)": "translate-x-1/2",
        "translateY(50%)": "translate-y-1/2",
        "translateX(83.333333%)": "translate-x-5/6",
        "translateY(83.333333%)": "translate-y-5/6",
        "translateX(12.5%)": "translate-x-1/8",
        "translateY(12.5%)": "translate-y-1/8",
        "translateX(37.5%)": "translate-x-3/8",
        "translateY(37.5%)": "translate-y-3/8",
        "translateX(62.5%)": "translate-x-5/8",
        "translateY(62.5%)": "translate-y-5/8",
        "translateX(87.5%)": "translate-x-7/8",
        "translateY(87.5%)": "translate-y-7/8",
        "translateX(100%)": "translate-x-full",
        "translateY(100%)": "translate-y-full",
        "skewX(0deg)": "skew-x-0",
        "skewX(1deg)": "skew-x-1",
        "skewY(1deg)": "skew-y-1",
        "skewX(2deg)": "skew-x-2",
        "skewY(2deg)": "skew-y-2",
        "skewX(3deg)": "skew-x-3",
        "skewY(3deg)": "skew-y-3",
        "skewX(6deg)": "skew-x-6",
        "skewY(6deg)": "skew-y-6",
        "skewX(12deg)": "skew-x-12",
        "skewY(12deg)": "skew-y-12",
        "perspective(0px)": "perspective-none",
        "perspective(64px)": "perspective-sm",
        "perspective(128px)": "perspective",
        "perspective(256px)": "perspective-md",
        "perspective(512px)": "perspective-lg",
        "perspective(768px)": "perspective-xl",
        "perspective(1024px)": "perspective-2xl",
        "perspective(1536px)": "perspective-3xl",
        "perspective(1792px)": "perspective-4xl",
        "perspective(2048px)": "perspective-5xl",
        "perspective(2560px)": "perspective-6xl",
        "perspective(3072px)": "perspective-7xl",
        "perspective(3584px)": "perspective-8xl",
        "perspective(4096px)": " perspective-9xl",
        "perspective(4608px)": "perspective-10xl",
        "perspective(5120px)": "perspective-11xl",
        "perspective(5632px)": "perspective-12xl",
      })[v] || `transform-${v}`,

    //transform-origin
    "transform-origin": (v) =>
      ({
        center: "origin-center",
        top: "origin-top",
        "top-right": "origin-top-right",
        right: "origin-right",
        "bottom-right": "origin-bottom-right",
        bottom: "origin-bottom",
        "bottom-left": "origin-bottom-left",
        left: "origin-left",
        "top-left": "origin-top-left",
      })[v] || `origin-${v}`,

    // Layout
    display: (v) =>
      ({
        block: "block",
        "inline-block": "inline-block",
        inline: "inline",
        flex: "flex",
        "inline-flex": "inline-flex",
        grid: "grid",
        none: "hidden",
      })[v],
    position: (v) =>
      ({
        static: "static",
        fixed: "fixed",
        absolute: "absolute",
        relative: "relative",
        sticky: "sticky",
      })[v],

    // Flexbox & Grid
    "flex-direction": (v) =>
      ({
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
        column: "flex-col",
        "column-reverse": "flex-col-reverse",
      })[v],
    "justify-content": (v) =>
      ({
        "flex-start": "justify-start",
        "flex-end": "justify-end",
        center: "justify-center",
        "space-between": "justify-between",
        "space-around": "justify-around",
        "space-evenly": "justify-evenly",
      })[v],
    "align-items": (v) =>
      ({
        "flex-start": "items-start",
        "flex-end": "items-end",
        center: "items-center",
        baseline: "items-baseline",
        stretch: "items-stretch",
      })[v],
    "flex-wrap": (v) =>
      ({
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      })[v],
    "flex-grow": (v) => (v === "1" ? "flex-grow" : `flex-grow-[${v}]`),
    "flex-shrink": (v) => (v === "1" ? "flex-shrink" : `flex-shrink-[${v}]`),
    gap: (v) => `gap-${v}`,

    // Effects
    opacity: (v) => `opacity-${parseInt(parseFloat(v) * 100)}`,

    // Misc
    cursor: (v) =>
      ({
        pointer: "cursor-pointer",
        default: "cursor-default",
        "not-allowed": "cursor-not-allowed",
        wait: "cursor-wait",
        text: "cursor-text",
        move: "cursor-move",
        help: "cursor-help",
        grab: "cursor-grab",
        grabbing: "cursor-grabbing",
      })[v] || `cursor-${v}`,
    "user-select": (v) =>
      ({
        none: "select-none",
        text: "select-text",
        all: "select-all",
        auto: "select-auto",
      })[v],
    overflow: (v) =>
      ({
        auto: "overflow-auto",
        hidden: "overflow-hidden",
        visible: "overflow-visible",
        scroll: "overflow-scroll",
      })[v],
    "z-index": (v) => `z-${v}`,
  };
  const pseudoClassPrefix = pseudoClass ? `${pseudoClass}:` : "";
  const tailwindClass = tailwindMap[property]
    ? tailwindMap[property](twValue)
    : null;

  return tailwindClass ? `${pseudoClassPrefix}${tailwindClass}` : null;
};

const handleShorthand = (property, value) => {
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
  // return null"
  return null;
};

const parseCss = (css) => {
  const tailwindClasses = [];
  const unsupportedStyles = [];

  const cssRules =
    css.match(/([a-zA-Z\-]+(?::[a-z-]+)?)\s*:\s*([^;]+)\s*;/g) || [];

  cssRules.forEach((rule) => {
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
      const expandedProps = handleShorthand(property, value, pseudoClass);
      expandedProps.forEach((prop) => {
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
  const [unsupportedStyles, setUnsupportedStyles] = useState([]);
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

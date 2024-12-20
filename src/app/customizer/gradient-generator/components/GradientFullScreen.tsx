import { FaExpandArrowsAlt } from "react-icons/fa";

import { RefObject } from "react";

interface GradientFullScreenProps {
  colorsListRef: RefObject<{ length: number }>;
  gradientRef: RefObject<string | undefined>;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
}

const GradientFullScreen = ({
  colorsListRef,
  gradientRef,
  isFullScreen,
  setIsFullScreen,
}: GradientFullScreenProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50"
      style={{
        background:
          colorsListRef.current && colorsListRef.current.length > 0
            ? gradientRef.current || undefined
            : undefined,
        backgroundImage:
          colorsListRef.current && colorsListRef.current.length > 0
            ? gradientRef.current || undefined
            : undefined,
      }}
    >
      <button
        className="absolute right-4 top-4"
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        <FaExpandArrowsAlt className="text-white text-xl font-normal" />
      </button>
    </div>
  );
};

export default GradientFullScreen;

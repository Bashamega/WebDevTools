import { FaExpandArrowsAlt } from "react-icons/fa";

const GradientFullScreen = ({
  colorsListRef,
  gradientRef,
  isFullScreen,
  setIsFullScreen,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50"
      style={{
        background: colorsListRef.current.length > 0 && gradientRef.current,
        backgroundImage:
          colorsListRef.current.length > 0 && gradientRef.current,
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

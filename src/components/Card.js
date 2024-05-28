import React, { useState } from "react";

const Card = ({
  onHover,
  isHoverEnabled,
  isStart,
  onStartClick,
  isBomb,
  gameStarted,
  gameEnded,
  size,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPermanentlyHovered, setIsPermanentlyHovered] = useState(false);

  const handleMouseEnter = () => {
    if (isHoverEnabled && !isStart && !gameEnded) {
      setIsHovered(true);
      if (!isPermanentlyHovered) {
        setIsPermanentlyHovered(true);
        if (isBomb) {
          onHover(true); // Indicate it's a bomb
        } else {
          onHover(false); // Not a bomb
        }
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseClick = () => {
    setIsClicked(true);
    if (isStart) {
      onStartClick();
    }
  };

  const cardClasses = `w-40 h-16 m-1 cursor-pointer select-none transition-all duration-150 border-blue-300 border-b-[1px] rounded-lg`;

  const boxShadow = isPermanentlyHovered
    ? "translate-y-2 shadow-none border-b-0"
    : "[box-shadow:0_8px_0_0_#1b6ff8,0_12px_0_0_#1b70f841]";

  const bombBoxShadow =
    gameStarted && isBomb
      ? isPermanentlyHovered
        ? "translate-y-2 shadow-none border-b-0"
        : "[box-shadow:0_8px_0_0_#dc3545,0_12px_0_0_#dc354566] border-red-300"
      : "";

  if (isStart) {
    return (
      <button
        className={`${cardClasses} bg-green-500 text-white pixel-font ${
          isClicked
            ? "translate-y-2 shadow-none border-b-0"
            : "[box-shadow:0_8px_0_0_#28a745,0_12px_0_0_#28a74566]"
        } border-green-300`}
        onClick={handleMouseClick}
        style={{
          ...size,
        }}
      >
        Start
      </button>
    );
  }

  return (
    <div
      className={`${cardClasses} ${
        gameStarted
          ? isBomb
            ? isHovered || isPermanentlyHovered
              ? "bg-red-900"
              : "bg-red-400"
            : isHovered || isPermanentlyHovered
            ? "bg-blue-900"
            : "bg-blue-450"
          : "bg-blue-450"
      } ${boxShadow} ${bombBoxShadow}`}
      style={{
        ...size,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    ></div>
  );
};

export default Card;

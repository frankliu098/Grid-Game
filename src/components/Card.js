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
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = () => {
    if (isHoverEnabled && !isHovered && !isStart && !gameEnded) {
      setIsHovered(true);
      if (isBomb) {
        onHover(true); // Indicate it's a bomb
      } else {
        onHover(false); // Not a bomb
      }
    }
  };

  const handleStartClick = () => {
    onStartClick();
    setIsPressed(true);
  };

  return (
    <div
      className={`card border-2 border-brown-800 m-1 transition-colors duration-300 rounded-lg ${
        isHovered ? (isBomb ? "bg-red-500" : "bg-blue-500") : ""
      } ${gameStarted && isBomb ? "bg-red-500" : ""}`}
      style={size}
      onMouseEnter={handleMouseEnter}
      onClick={isStart ? handleStartClick : null}
    >
      {isStart && (
        <button
          className={`w-full h-full bg-green-500 text-white pixel-font rounded-lg border-2 border-brown-800 transition-transform duration-200  ${
            isPressed ? "transform scale-95" : ""
          }`}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Card;

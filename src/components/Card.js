// src/components/Card.js
import React, { useState } from "react";

const Card = ({
  onHover,
  isHoverEnabled,
  isStart,
  onStartClick,
  isBomb,
  gameStarted,
  gameEnded,
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
      className={`card w-24 h-24 border border-gray-300 m-1 transition-colors duration-300 ${
        isHovered ? (isBomb ? "bg-red-500" : "bg-blue-500") : ""
      } ${gameStarted && isBomb ? "bg-red-500" : ""}`}
      onMouseEnter={handleMouseEnter}
      onClick={isStart ? handleStartClick : null}
    >
      {isStart && (
        <button
          className={`w-full h-full bg-green-500 text-white p-1 rounded transition-transform duration-200 ${
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

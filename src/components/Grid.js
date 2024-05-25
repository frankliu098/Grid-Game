// src/components/Grid.js
import React from "react";
import Card from "./Card";

const Grid = ({
  totalSquares,
  handleHover,
  isHoverEnabled,
  startIndex,
  handleStartClick,
  resetKey,
  bombIndices,
  gameStarted,
  gameEnded,
}) => {
  const renderGrid = () => {
    let grid = [];
    for (let i = 0; i < totalSquares; i++) {
      grid.push(
        <Card
          key={`${resetKey}-${i}`}
          onHover={handleHover}
          isHoverEnabled={isHoverEnabled}
          isStart={i === startIndex}
          onStartClick={handleStartClick}
          isBomb={bombIndices.includes(i)}
          gameStarted={gameStarted}
          gameEnded={gameEnded}
        />
      );
    }
    return grid;
  };

  return (
    <div className="grid-container flex flex-wrap justify-center">
      {renderGrid()}
    </div>
  );
};

export default Grid;

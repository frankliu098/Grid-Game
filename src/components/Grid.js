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
  const getGridStyle = () => {
    if (totalSquares === 16) {
      return {
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
      };
    } else if (totalSquares === 50) {
      return {
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
      };
    } else if (totalSquares === 100) {
      return {
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "repeat(10, 1fr)",
      };
    }
  };

  const getCardSize = () => {
    if (totalSquares === 16) {
      return {
        width: "100px",
        height: "100px",
      };
    } else if (totalSquares === 50) {
      return {
        width: "60px",
        height: "60px",
      };
    } else if (totalSquares === 100) {
      return {
        width: "40px",
        height: "40px",
      };
    }
  };

  return (
    <div className="grid-container" style={getGridStyle()}>
      {Array.from({ length: totalSquares }).map((_, i) => (
        <Card
          key={`${resetKey}-${i}`}
          onHover={handleHover}
          isHoverEnabled={isHoverEnabled}
          isStart={i === startIndex}
          onStartClick={handleStartClick}
          isBomb={bombIndices.includes(i)}
          gameStarted={gameStarted}
          gameEnded={gameEnded}
          size={getCardSize()}
        />
      ))}
    </div>
  );
};

export default Grid;

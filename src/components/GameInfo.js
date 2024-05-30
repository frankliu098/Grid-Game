// src/components/GameInfo.js
import React from "react";

const GameInfo = () => {
  return (
    <div className="game-info pixel-font p-4 border-0 border-brown-800 rounded-lg shadow-lg bg-brown-200 mb-8">
      <h3 className="text-2xl mb-4 text-center text-brown-800">How to Play</h3>
      <p className="mb-4 text-brown-800">
        Welcome to the Retro Grid Game! Your objective is to hover over all the
        non-bomb squares to achieve victory. Here’s how you can play:
      </p>
      <ol className="list-decimal pl-6 text-brown-800">
        <li>Select a difficulty level from Easy, Medium, or Difficult.</li>
        <li>A grid will appear with a "Start" button on one of the squares.</li>
        <li>Click on the "Start" button to begin the game.</li>
        <li>
          Hover over the squares to turn them blue. Avoid the red bomb squares!
        </li>
        <li>If you successfully hover over all non-bomb squares, you win!</li>
      </ol>
    </div>
  );
};

export default GameInfo;

// src/components/Leaderboard.js
import React from "react";

const Leaderboard = ({ times }) => {
  return (
    <div className="leaderboard pixel-font">
      <h3 className="text-lg mb-2">Leaderboard</h3>
      <ul>
        {times.map((time, index) => (
          <li key={index} className="text-black">
            {index + 1}. {time.toFixed(2)} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

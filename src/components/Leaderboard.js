import React from "react";

const Leaderboard = ({ times }) => {
  return (
    <div className="leaderboard pixel-font p-4 border-4 border-brown-800 rounded-lg shadow-lg bg-brown-200 mr-8">
      <h3 className="text-2xl mb-4 text-center text-brown-800">Leaderboard</h3>
      <ul className="list-none p-0">
        {times.map((time, index) => (
          <li
            key={index}
            className="text-lg text-white bg-blue-500 px-4 py-2 mb-2 rounded-lg border-2 border-blue-700 shadow-md"
          >
            {index + 1}. {time.toFixed(2)} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

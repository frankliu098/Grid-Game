import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({ difficulty, leaderboard }) => {
  const [localLeaderboard, setLocalLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leaderboard/${difficulty}`
        );
        setLocalLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      }
    };
    if (difficulty) {
      fetchLeaderboard();
    }

    // Set up interval to auto-refresh leaderboard
    const intervalId = setInterval(fetchLeaderboard, 5000); // Refresh every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [difficulty]);

  useEffect(() => {
    setLocalLeaderboard(leaderboard[difficulty] || []);
  }, [difficulty, leaderboard]);

  return (
    <div className="leaderboard pixel-font p-4 border-4 border-brown-800 rounded-lg shadow-lg bg-brown-200 mr-8">
      <h3 className="text-2xl mb-4 text-center text-brown-800">Leaderboard</h3>
      <ul className="list-none p-0">
        {localLeaderboard.map((entry, index) => (
          <li
            key={index}
            className="text-lg text-white bg-blue-500 px-4 py-2 mb-2 rounded-lg border-2 border-blue-700 shadow-md"
          >
            {index + 1}. {entry.username} - {entry.score.toFixed(3)} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

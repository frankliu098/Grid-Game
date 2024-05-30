import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Leaderboard = ({ difficulty, leaderboard }) => {
  const [localLeaderboard, setLocalLeaderboard] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leaderboard/${difficulty}`
        );
        let leaderboardData = response.data;

        // Ensure the user's entry is part of the leaderboard
        if (
          user &&
          !leaderboardData.find((entry) => entry.username === user.username)
        ) {
          const userScoreResponse = await axios.get(
            `http://localhost:4000/api/userScore/${difficulty}`,
            { withCredentials: true }
          );
          const userScore = userScoreResponse.data;
          if (userScore) {
            leaderboardData.push(userScore);
          }
        }

        setLocalLeaderboard(
          leaderboardData.sort((a, b) => a.score - b.score).slice(0, 5) // Ensure to get top 5
        );
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
  }, [difficulty, user]);

  useEffect(() => {
    setLocalLeaderboard(leaderboard[difficulty] || []);
  }, [difficulty, leaderboard]);

  return (
    <div className="leaderboard pixel-font p-4 border-0 border-brown-800 rounded-lg shadow-lg bg-brown-200">
      <h3 className="text-2xl mb-4 text-center text-brown-800">Leaderboard</h3>
      <ul className="list-none p-0">
        {localLeaderboard.map((entry, index) => (
          <li
            key={index}
            className={`text-lg px-4 py-2 mb-2 rounded-lg border-2 shadow-md ${
              user && entry.username === user.username
                ? "bg-white text-blue-500 border-blue-700"
                : "bg-blue-500 text-white border-blue-700"
            }`}
          >
            {index + 1}. {entry.username} - {entry.score.toFixed(3)} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

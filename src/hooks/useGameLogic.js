// src/hooks/useGameLogic.js
import { useState, useEffect } from "react";

const difficulties = {
  Easy: 16,
  Medium: 50,
  Difficult: 100,
};

const bombCounts = {
  Easy: 2,
  Medium: 5,
  Difficult: 10,
};

const useGameLogic = () => {
  const [hoverCount, setHoverCount] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [totalSquares, setTotalSquares] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);
  const [startIndex, setStartIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [isDefeated, setIsDefeated] = useState(false);
  const [bombIndices, setBombIndices] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState({
    Easy: [],
    Medium: [],
    Difficult: [],
  });

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleHover = (isBomb) => {
    if (gameEnded) return;
    if (isBomb) {
      handleBombHover();
    } else {
      setHoverCount((prevCount) => prevCount + 1);
    }
  };

  const handleBombHover = () => {
    setIsDefeated(true);
    setIsHoverEnabled(false);
    setElapsedTime((Date.now() - startTime) / 1000);
    setGameEnded(true);
  };

  const generateBombIndices = (difficulty, startIndex) => {
    const bombCount = bombCounts[difficulty];
    const bombIndices = new Set();
    while (bombIndices.size < bombCount) {
      const randomIndex = Math.floor(Math.random() * difficulties[difficulty]);
      if (randomIndex !== startIndex) {
        bombIndices.add(randomIndex);
      }
    }
    return Array.from(bombIndices);
  };

  const handleDifficultyChange = (selectedDifficulty) => {
    const startIndex = Math.floor(
      Math.random() * difficulties[selectedDifficulty]
    );
    const bombIndices = generateBombIndices(selectedDifficulty, startIndex);

    setDifficulty(selectedDifficulty);
    setTotalSquares(difficulties[selectedDifficulty]);
    setHoverCount(0);
    setResetKey((prevKey) => prevKey + 1);
    setIsHoverEnabled(false);
    setStartIndex(startIndex);
    setStartTime(null);
    setElapsedTime(null);
    setIsDefeated(false);
    setBombIndices(bombIndices);
    setGameStarted(false);
    setGameEnded(false);
  };

  const handleStartClick = () => {
    setIsHoverEnabled(true);
    setStartTime(Date.now());
    setGameStarted(true);
  };

  const handleReset = () => {
    const startIndex = Math.floor(Math.random() * totalSquares);
    const bombIndices = generateBombIndices(difficulty, startIndex);

    setHoverCount(0);
    setResetKey((prevKey) => prevKey + 1);
    setIsHoverEnabled(false);
    setStartIndex(startIndex);
    setStartTime(null);
    setElapsedTime(null);
    setIsDefeated(false);
    setBombIndices(bombIndices);
    setGameStarted(false);
    setGameEnded(false);
  };

  useEffect(() => {
    if (hoverCount === totalSquares - bombCounts[difficulty] - 1) {
      const endTime = (Date.now() - startTime) / 1000;
      setElapsedTime(endTime);
      setGameEnded(true);
      updateLeaderboard(difficulty, endTime);
    }
  }, [hoverCount, totalSquares, bombCounts, difficulty, startTime]);

  const updateLeaderboard = (difficulty, time) => {
    setLeaderboard((prevLeaderboard) => {
      const updatedTimes = [...prevLeaderboard[difficulty], time]
        .sort((a, b) => a - b)
        .slice(0, 3);
      return { ...prevLeaderboard, [difficulty]: updatedTimes };
    });
  };

  return {
    hoverCount,
    difficulty,
    totalSquares,
    resetKey,
    isHoverEnabled,
    startIndex,
    elapsedTime,
    isDefeated,
    bombIndices,
    gameStarted,
    gameEnded,
    handleHover,
    handleBombHover,
    handleDifficultyChange,
    handleStartClick,
    handleReset,
    leaderboard,
    bombCounts, // Export bombCounts to be used in App.js
  };
};

export default useGameLogic;

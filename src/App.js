import "./css/App.css";
import "./css/custom.css";
import React, { useContext, useEffect, useState } from "react";
import Grid from "./components/Grid";
import Leaderboard from "./components/Leaderboard";
import useGameLogic from "./hooks/useGameLogic";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Auth from "./components/Auth";

function ProtectedRoute({ children }) {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center text-brown-800 pixel-font">Loading...</p>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-brown-800 pixel-font">Welcome, {user.username}!</p>
        <button
          onClick={logout}
          className="p-2 bg-red-700 text-white rounded-lg border-2 border-brown-800 hover:bg-red-900 transition-colors duration-200 pixel-font"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}

function App() {
  const {
    hoverCount,
    difficulty,
    totalSquares,
    resetKey,
    isHoverEnabled,
    startIndex,
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
    bombCounts,
  } = useGameLogic();

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (gameStarted && !gameEnded) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else if (gameEnded) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameEnded]);

  const handleStartClickWrapper = () => {
    setElapsedTime(0);
    handleStartClick();
  };

  const handleResetWrapper = () => {
    setElapsedTime(0);
    handleReset();
  };

  return (
    <AuthProvider>
      <div className="App bg-brown-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <header className="App-header p-8 border-4 border-brown-800 rounded-lg shadow-lg bg-brown-200">
            <ProtectedRoute>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="difficulty"
                  className="mb-2 text-lg pixel-font text-brown-800"
                >
                  Select Difficulty:
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                  className="mb-4 px-4 py-2 border-2 border-brown-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 pixel-font"
                >
                  <option value="">Select</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
                </select>
                {difficulty && (
                  <div className="flex flex-row items-start mt-4">
                    <Grid
                      totalSquares={totalSquares}
                      handleHover={handleHover}
                      isHoverEnabled={isHoverEnabled}
                      startIndex={startIndex}
                      handleStartClick={handleStartClickWrapper}
                      resetKey={resetKey}
                      bombIndices={bombIndices}
                      handleBombHover={handleBombHover}
                      gameStarted={gameStarted}
                      gameEnded={gameEnded}
                    />
                  </div>
                )}
                <div className="mt-4 text-center pixel-font">
                  <p className="text-2xl">
                    {gameEnded
                      ? hoverCount === totalSquares - bombCounts[difficulty] - 1
                        ? "Victory!"
                        : "Defeat!"
                      : "Game in Progress"}
                  </p>
                  <p className="text-lg">{elapsedTime.toFixed(1)} seconds</p>
                  {difficulty && (
                    <button
                      onClick={handleResetWrapper}
                      className="mt-4 px-6 py-3 bg-purple-700 text-white rounded-lg border-2 border-brown-800 hover:bg-purple-900 transition-colors duration-200 pixel-font"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </ProtectedRoute>
          </header>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

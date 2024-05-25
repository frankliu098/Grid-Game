import React from "react";
import Grid from "./components/Grid";
import useGameLogic from "./hooks/useGameLogic";

function App() {
  const {
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
    bombCounts, // Import bombCounts from useGameLogic
  } = useGameLogic();

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col items-center mt-4">
          <label htmlFor="difficulty" className="mb-2 text-lg">
            Select Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>
          {difficulty && (
            <Grid
              totalSquares={totalSquares}
              handleHover={handleHover}
              isHoverEnabled={isHoverEnabled}
              startIndex={startIndex}
              handleStartClick={handleStartClick}
              resetKey={resetKey}
              bombIndices={bombIndices}
              handleBombHover={handleBombHover}
              gameStarted={gameStarted}
              gameEnded={gameEnded}
            />
          )}
          {hoverCount === totalSquares - bombCounts[difficulty] - 1 &&
            !isDefeated && (
              <>
                <p className="text-2xl text-green-500 mt-4">Victory!</p>
                {elapsedTime && (
                  <p className="text-lg text-green-500">
                    Time: {elapsedTime.toFixed(2)} seconds
                  </p>
                )}
              </>
            )}
          {isDefeated && (
            <>
              <p className="text-2xl text-red-500 mt-4">Defeat!</p>
              {elapsedTime && (
                <p className="text-lg text-red-500">
                  Time: {elapsedTime.toFixed(2)} seconds
                </p>
              )}
            </>
          )}
          {difficulty && (
            <button
              onClick={handleReset}
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Reset
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

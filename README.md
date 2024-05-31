# React Hover Bomb Game

This is a React-based game where players hover over cards to change their color while avoiding bomb cards. The game includes different difficulty levels and tracks the time taken to complete the game.

## Features

- **Difficulty Levels**: Choose between Easy, Medium, and Difficult modes.
  - Easy: 16 cards, 2 bomb cards.
  - Medium: 50 cards, 5 bomb cards.
  - Difficult: 100 cards, 10 bomb cards.
- **Interactive Grid**: Hover over cards to turn them blue. Avoid bomb cards, which are red.
- **Timer**: Tracks the time taken to complete the game.
- **Victory and Defeat**: Displays "Victory" when all non-bomb cards are hovered over. Displays "Defeat" if a bomb card is hovered over.
- **Reset Functionality**: Allows players to reset the game and choose the difficulty level again.
- **Backend Integration**: Saves game scores and retrieves leaderboard data.

## How to Play

1. **Select Difficulty**: Choose the game mode (Easy, Medium, or Difficult) from the dropdown menu.
2. **Start the Game**: Click the "Start" button to begin the game. Bomb cards will be revealed in red.
3. **Hover over Cards**: Move your mouse over the cards to turn them blue.
   - **Avoid Bombs**: Bomb cards are red and will end the game if hovered over.
4. **Victory**: Hover over all non-bomb cards to win the game. The timer will stop, and "Victory" will be displayed along with the time taken.
5. **Defeat**: Hovering over a bomb card will end the game and display "Defeat" along with the time taken.
6. **Reset**: Click the "Reset" button to restart the game and choose a new difficulty.
7. **Leaderboard**: View the leaderboard to see the top scores.

## Project Structure

### Frontend

- `src/components/Card.js`: The Card component representing each card in the grid.
- `src/components/Grid.js`: The Grid component that renders the grid of cards.
- `src/components/Timer.js`: The Timer component that tracks and displays the time taken.
- `src/components/Leaderboard.js`: The Leaderboard component that displays top scores.
- `src/hooks/useGameLogic.js`: Custom hook managing the game logic and state.
- `src/App.js`: Main component rendering the game interface and managing interactions.

### Backend

- `server/server.js`: The main server file using Express to handle API requests.

## Installation

### Frontend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/frankliu098/Grid-Game.git
    cd react-hover-bomb-game
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

Open [http://localhost:3000](http://localhost:3000) to view the game in your browser.

### Backend

1. **Navigate to the `server` directory**:
    ```bash
    cd server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the backend server**:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

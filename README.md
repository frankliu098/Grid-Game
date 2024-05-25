# Grid-Game
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

## How to Play

1. **Select Difficulty**: Choose the game mode (Easy, Medium, or Difficult) from the dropdown menu.
2. **Start the Game**: Click the "Start" button to begin the game. Bomb cards will be revealed in red.
3. **Hover over Cards**: Move your mouse over the cards to turn them blue.
   - **Avoid Bombs**: Bomb cards are red and will end the game if hovered over.
4. **Victory**: Hover over all non-bomb cards to win the game. The timer will stop, and "Victory" will be displayed along with the time taken.
5. **Defeat**: Hovering over a bomb card will end the game and display "Defeat" along with the time taken.
6. **Reset**: Click the "Reset" button to restart the game and choose a new difficulty.

## License

This project is licensed under the MIT License.

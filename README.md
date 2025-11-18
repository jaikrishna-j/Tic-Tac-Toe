# Tic Tac Toe Game

A web-based Tic Tac Toe game built using HTML, CSS, and JavaScript. Challenge yourself against an AI opponent with three difficulty levels in a beautiful pixel-art styled interface.

## About This Project

I built this Tic Tac Toe game as a fun web project that combines classic gameplay with modern web technologies. The game features a retro pixel-art aesthetic with a beautiful night sky background, making it both visually appealing and engaging to play.

The game includes an intelligent AI opponent that adapts its strategy based on the selected difficulty level. Whether you're a beginner looking for a casual game or an advanced player seeking a real challenge, there's a difficulty setting for everyone.

## Features

- **Three Difficulty Levels**: Choose from Beginner, Medium, or Advanced AI opponents
- **Score Tracking**: Keep track of wins, losses, and draws across multiple games
- **Player Choice**: Play as either X or O
- **Beautiful UI**: Pixel-art styled interface with a night sky theme
- **Responsive Design**: Works smoothly on different screen sizes
- **Win Detection**: Visual highlighting of winning combinations
- **Intro Screen**: Elegant start screen before gameplay begins

## Screenshots

### Start Screen
<img src="outputs/start-screen.png" alt="Start Screen" width="400">

*The welcoming start screen with the game title and "Challenge the Computer" subtitle*

### Gameplay Screen
<img src="outputs/gameplay.png" alt="Gameplay Screen" width="400">

*The main game interface showing the board, difficulty selection, score tracking, and player options*

## Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features including custom properties and animations
- **JavaScript (ES6+)**: Game logic, AI implementation, and DOM manipulation
- **Modules**: ES6 modules for clean code organization

## How to Play

1. Open `index.html` in a modern web browser
2. Click "Start Game" on the intro screen
3. Choose your difficulty level (Beginner, Medium, or Advanced)
4. Select whether you want to play as X or O
5. Click on any empty cell to make your move
6. The computer will automatically make its move after yours
7. Try to get three in a row horizontally, vertically, or diagonally!
8. Use "Restart Match" to start a new game while keeping your score

## AI Difficulty Levels

- **Beginner**: Makes random moves - perfect for learning the game
- **Medium**: Tries to win when possible and blocks your winning moves
- **Advanced**: Uses minimax algorithm for optimal play - nearly unbeatable!

## Project Structure

```
Tic-Tac-Toe/
├── index.html      # Main HTML file
├── style.css       # All styling and animations
├── script.js       # Main game logic
├── bot.js          # AI opponent implementations
├── assets/         # Background images
└── outputs/        # Screenshots and project images
```

## Getting Started

Simply clone this repository and open `index.html` in your browser. No build process or dependencies required!

```bash
git clone https://github.com/jaikrishna-j/Tic-Tac-Toe.git
cd Tic-Tac-Toe
# Open index.html in your browser
```

---

Enjoy playing! Feel free to fork this project and customize it to your liking.


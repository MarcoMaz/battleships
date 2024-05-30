# Battleships

## Live version
https://luxury-entremet-370533.netlify.app/

## Description
This project is a simple version of the game Battleships, developed as a technical challenge. It allows a single human player to play a one-sided game of Battleships against ships placed randomly by the computer.

The game features a 10x10 grid with the following ships placed at random:
- 1x Battleship (5 squares)
- 2x Destroyers (4 squares each)

The player inputs coordinates in the form "A5" to target a square. The game provides feedback on hits, misses, and sinks, and ends when all ships are sunk.

The project is implemented using:
- Next.js
- Typescript
- CSS Modules
- Jest & React Testing Library

## Getting Started
1. Clone the repo: `git clone https://github.com/MarcoMaz/battleships.git`
2. Navigate to the project directory: `cd battleships`
3. Install the dependencies: `npm install`
4. Run the app: `npm run dev`
5. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

## Testing
To run the tests, follow these steps:
1. Open your terminal.
2. Use the following command: `npm test`.

## User Stories
The application covers the following user stories:
- As a player, I want to see a 10x10 grid.
- As a player, I want ships to be placed randomly on the grid.
- As a player, I want to enter coordinates to target a square.
- As a player, I want to see feedback on whether my shot was a hit, miss, or sink.
- As a player, I want the game to end when all ships are sunk.

## Additional Features
Responsive design
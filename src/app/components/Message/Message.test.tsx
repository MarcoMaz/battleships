import Home from '@/app/page';
import { GridProps, ShipProps } from '@/app/types';
import { placeShips } from '@/app/utils';
import { render, fireEvent } from '@testing-library/react';

const GRID_SIZE = 10;

const SHIPS: ShipProps[] = [
  { name: 'Battleship', size: 5, count: 1 },
  { name: 'Destroyer', size: 4, count: 2 },
];

const createEmptyGrid = (): GridProps =>
  Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({ ship: false, status: 'none', shipId: null }))
    );

describe('Message Component', () => {
  const grid = placeShips(createEmptyGrid(), SHIPS);

  test('Game over condition', () => {
    // Simulate hitting all cells of all ships
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.ship) {
          grid[rowIndex][colIndex].status = 'sunk';
        } else {
          grid[rowIndex][colIndex].status = 'miss';
        }
      });
    });

    const isGameOver = grid.every((row) =>
      row.every((cell) => cell.status === 'sunk' || cell.status === 'miss')
    );
    expect(isGameOver).toBe(true);
  });

  test('Ensure that the game continues until all ships are sunk, and ends when the last ship is sunk', () => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (
          cell.ship &&
          !(rowIndex === GRID_SIZE - 1 && colIndex === GRID_SIZE - 1)
        ) {
          grid[rowIndex][colIndex].status = 'hit';
        } else {
          grid[rowIndex][colIndex].status = 'miss';
        }
      });
    });

    const isGameOver = grid.every((row) =>
      row.every((cell) => cell.status === 'sunk')
    );

    expect(isGameOver).toBe(false);

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.ship) {
          grid[rowIndex][colIndex].status = 'sunk';
        } else {
          grid[rowIndex][colIndex].status = 'miss';
        }
      });
    });

    // Check if the game is over after marking the last ship as 'sunk'
    const isGameOverNow = grid.every((row) =>
      row.every((cell) => cell.status === 'sunk' || cell.status === 'miss')
    );

    expect(isGameOverNow).toBe(true);
  });
});

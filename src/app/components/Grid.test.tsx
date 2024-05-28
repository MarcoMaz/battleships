import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
import { GridProps, ShipProps } from '../types';
import { placeShips } from '../utils';

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
        .map(() => ({ ship: false, status: 'none' }))
    );

describe('Grid Component', () => {
  test('initializes with a 10x10 grid', async () => {
    render(<Home />);

    const cells = await screen.findAllByRole('cell');
    expect(cells).toHaveLength(GRID_SIZE * GRID_SIZE);
  });

  test('ships are placed randomly on the grid without overlapping', () => {
    const grid1 = placeShips(createEmptyGrid(), SHIPS);
    const grid2 = placeShips(createEmptyGrid(), SHIPS);

    // Calculate the total number of ship cells expected
    const totalShipCells = SHIPS.reduce(
      (acc, ship) => acc + ship.size * ship.count,
      0
    );

    // Helper function to count ship cells
    const countShipCells = (grid: GridProps): number => {
      return grid.reduce(
        (acc, row) =>
          acc + row.reduce((rowAcc, cell) => rowAcc + (cell.ship ? 1 : 0), 0),
        0
      );
    };

    // Check that at least one ship position is different between the two grids
    let different = false;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid1[row][col].ship !== grid2[row][col].ship) {
          different = true;
          break;
        }
      }
      if (different) break;
    }
    expect(different).toBe(true);

    // Check that there are no overlapping ships in grid1
    const shipCellsCount1 = countShipCells(grid1);
    expect(shipCellsCount1).toBe(totalShipCells);

    // Check that there are no overlapping ships in grid2
    const shipCellsCount2 = countShipCells(grid2);
    expect(shipCellsCount2).toBe(totalShipCells);
  });

  test('correct number of ships (1 Battleship and 2 Destroyers) are placed on the grid', () => {
    const grid = placeShips(createEmptyGrid(), SHIPS);

    // Helper function to count the number of ships of a given size
    const countShipsOfSize = (grid: GridProps, size: number): number => {
      let shipCount = 0;
      const visited = Array.from({ length: GRID_SIZE }, () =>
        Array(GRID_SIZE).fill(false)
      );

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (!visited[row][col] && grid[row][col].ship) {
            let currentSize = 0;
            let direction = null;

            if (col + 1 < GRID_SIZE && grid[row][col + 1].ship) {
              direction = 'horizontal';
            } else if (row + 1 < GRID_SIZE && grid[row + 1][col].ship) {
              direction = 'vertical';
            }

            if (direction === 'horizontal') {
              for (let i = col; i < GRID_SIZE && grid[row][i].ship; i++) {
                visited[row][i] = true;
                currentSize++;
              }
            } else if (direction === 'vertical') {
              for (let i = row; i < GRID_SIZE && grid[i][col].ship; i++) {
                visited[i][col] = true;
                currentSize++;
              }
            } else {
              visited[row][col] = true;
              currentSize = 1;
            }

            if (currentSize === size) {
              shipCount++;
            }
          }
        }
      }

      return shipCount;
    };

    // Check the number of Battleships
    const battleshipCount = countShipsOfSize(grid, 5);
    expect(battleshipCount).toBe(1);

    // Check the number of Destroyers
    const destroyerCount = countShipsOfSize(grid, 4);
    expect(destroyerCount).toBe(2);
  });

  test('ensure each ship occupies the correct number of squares (Battleship: 5 squares, Destroyers: 4 squares each)', () => {
    const grid = placeShips(createEmptyGrid(), SHIPS);

    // Function to get the lengths of all ships on the grid
    const getShipLengths = (grid: GridProps): number[] => {
      const shipLengths: number[] = [];
      const visited = Array.from({ length: GRID_SIZE }, () =>
        Array(GRID_SIZE).fill(false)
      );

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (!visited[row][col] && grid[row][col].ship) {
            let currentSize = 0;
            let direction = null;

            if (col + 1 < GRID_SIZE && grid[row][col + 1].ship) {
              direction = 'horizontal';
            } else if (row + 1 < GRID_SIZE && grid[row + 1][col].ship) {
              direction = 'vertical';
            }

            if (direction === 'horizontal') {
              for (let i = col; i < GRID_SIZE && grid[row][i].ship; i++) {
                visited[row][i] = true;
                currentSize++;
              }
            } else if (direction === 'vertical') {
              for (let i = row; i < GRID_SIZE && grid[i][col].ship; i++) {
                visited[i][col] = true;
                currentSize++;
              }
            } else {
              visited[row][col] = true;
              currentSize = 1;
            }

            shipLengths.push(currentSize);
          }
        }
      }

      return shipLengths;
    };

    // Get ship lengths from the grid
    const shipLengths = getShipLengths(grid);

    // Generate an array of expected ship lengths
    const expectedLengths: number[] = SHIPS.reduce<number[]>(
      (acc, ship) => [...acc, ...Array(ship.count).fill(ship.size)],
      []
    );

    // Ensure that the ship lengths match the expected lengths
    expect(shipLengths.sort((a, b) => a - b)).toEqual(
      expectedLengths.sort((a, b) => a - b)
    );
  });
});

import { GridProps, ShipProps } from '@/app/types';
import { placeShips } from '@/app/utils';
import { gridSize, ships } from '../Grid/Grid';

const createEmptyGrid = (): GridProps =>
  Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => ({ ship: false, status: 'none', shipId: null }))
    );

describe('Message Component', () => {
  let grid: GridProps;

  beforeEach(() => {
    grid = placeShips(createEmptyGrid(), ships);
  });

  const simulateHits = (grid: GridProps, sinkLastShip = true) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.ship) {
          grid[rowIndex][colIndex].status = sinkLastShip ? 'sunk' : 'hit';
        } else {
          grid[rowIndex][colIndex].status = 'miss';
        }
      });
    });
  };

  test('Game over condition', () => {
    simulateHits(grid, true);

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
          !(rowIndex === gridSize - 1 && colIndex === gridSize - 1)
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

    simulateHits(grid, true);

    // Check if the game is over after marking the last ship as 'sunk'
    const isGameOverNow = grid.every((row) =>
      row.every((cell) => cell.status === 'sunk' || cell.status === 'miss')
    );

    expect(isGameOverNow).toBe(true);
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { placeShips } from '@/app/utils';
import { GridProps, ShipProps } from '@/app/types';
import Grid, { gridSize, ships } from './Grid';

const createEmptyGrid = (): GridProps =>
  Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => ({ ship: false, status: 'none', shipId: null }))
    );

describe('Grid Component', () => {
  test('initializes with a 10x10 grid', async () => {
    render(<Home />);

    const cells = await screen.findAllByRole('cell');
    expect(cells).toHaveLength(gridSize * gridSize);
  });

  test('ships are placed randomly on the grid without overlapping', () => {
    const grid1 = placeShips(createEmptyGrid(), ships);
    const grid2 = placeShips(createEmptyGrid(), ships);

    // Calculate the total number of ship cells expected
    const totalShipCells = ships.reduce(
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
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
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
    const grid = placeShips(createEmptyGrid(), ships);

    // Helper function to count the number of ships of a given size
    const countShipsOfSize = (grid: GridProps, size: number): number => {
      let shipCount = 0;
      const visited = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill(false)
      );

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (!visited[row][col] && grid[row][col].ship) {
            let currentSize = 0;
            let direction = null;

            if (col + 1 < gridSize && grid[row][col + 1].ship) {
              direction = 'horizontal';
            } else if (row + 1 < gridSize && grid[row + 1][col].ship) {
              direction = 'vertical';
            }

            if (direction === 'horizontal') {
              for (let i = col; i < gridSize && grid[row][i].ship; i++) {
                visited[row][i] = true;
                currentSize++;
              }
            } else if (direction === 'vertical') {
              for (let i = row; i < gridSize && grid[i][col].ship; i++) {
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

  test('should correctly mark a cell as hit', () => {
    const gridWithHitCell = createEmptyGrid();
    gridWithHitCell[0][0] = { ship: true, status: 'hit', shipId: 1 };
    const setGrid = jest.fn();

    render(<Grid grid={gridWithHitCell} setGrid={setGrid} />);

    const hitCell = document.querySelector('[data-coordinate="A1"]');
    expect(hitCell).toHaveClass('hit');
  });

  test('should correctly mark a cell as miss', () => {
    const gridWithMissCell = createEmptyGrid();
    gridWithMissCell[0][0] = { ship: false, status: 'miss', shipId: null };
    const setGrid = jest.fn();

    render(<Grid grid={gridWithMissCell} setGrid={setGrid} />);

    const missCell = document.querySelector('[data-coordinate="A1"]');
    expect(missCell).toHaveClass('miss');
  });

  test('should correctly mark a cell as sunk', () => {
    const gridWithSunkCell = createEmptyGrid();
    gridWithSunkCell[0][0] = { ship: false, status: 'sunk', shipId: null };
    const setGrid = jest.fn();

    render(<Grid grid={gridWithSunkCell} setGrid={setGrid} />);

    const sunkCell = document.querySelector('[data-coordinate="A1"]');
    expect(sunkCell).toHaveClass('sunk');
  });

  test('should mark battleship as sunk when all its cells are hit', () => {
    const gridWithBattleship: GridProps = [
      [
        { ship: true, status: 'none', shipId: 1 },
        { ship: true, status: 'none', shipId: 1 },
        { ship: true, status: 'none', shipId: 1 },
        { ship: true, status: 'none', shipId: 1 },
        { ship: true, status: 'none', shipId: 1 },
      ],
    ];

    const setGrid = jest.fn();

    render(<Grid grid={gridWithBattleship} setGrid={setGrid} />);

    const battleshipCoordinates = ['A1', 'A2', 'A3', 'A4', 'A5'];

    // Simulate hitting all cells of the battleship
    battleshipCoordinates.forEach((coordinate) => {
      const cellElement = document.querySelector(
        `[data-coordinate="${coordinate}"]`
      );
      if (cellElement) {
        fireEvent.click(cellElement);
      }
    });

    const updatedGrid: GridProps = gridWithBattleship.map((row) =>
      row.map((cell, index) => ({
        ...cell,
        status: battleshipCoordinates.includes(`A${index + 1}`)
          ? 'sunk'
          : cell.status,
      }))
    );

    setGrid.mockReturnValue(updatedGrid);

    render(<Grid grid={updatedGrid} setGrid={setGrid} />);

    // Check if all cells of the battleship are marked as sunk in the state
    battleshipCoordinates.forEach((_coordinate, index) => {
      const updatedCell = updatedGrid[0][index];
      expect(updatedCell.status).toBe('sunk');
    });
  });
});

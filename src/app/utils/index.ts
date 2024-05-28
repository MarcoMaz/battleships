import { GridProps, ShipProps } from '../types';

export const placeShips = (grid: GridProps, ships: ShipProps[]): GridProps => {
  // Create a new grid initialized with no ships
  const newGrid: GridProps = grid.map((row) =>
    row.map(() => ({ ship: false }))
  );

  // Function to get a random integer between 0 and max - 1
  const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

  // Function to get a random position on the grid
  const getRandomPosition = (): [number, number] => [
    getRandomInt(grid.length),
    getRandomInt(grid[0].length),
  ];

  // Function to check if a ship can be placed at the specified position
  const canPlaceShip = (
    row: number,
    col: number,
    size: number,
    direction: 'horizontal' | 'vertical'
  ): boolean => {
    if (direction === 'horizontal') {
      if (col + size > grid[0].length) return false;
      for (let i = 0; i < size; i++) {
        if (newGrid[row][col + i].ship) return false;
      }
    } else {
      if (row + size > grid.length) return false;
      for (let i = 0; i < size; i++) {
        if (newGrid[row + i][col].ship) return false;
      }
    }
    return true;
  };

  // Function to place a ship at the specified position
  const placeShip = (
    row: number,
    col: number,
    size: number,
    direction: 'horizontal' | 'vertical'
  ): void => {
    for (let i = 0; i < size; i++) {
      if (direction === 'horizontal') {
        newGrid[row][col + i].ship = true;
      } else {
        newGrid[row + i][col].ship = true;
      }
    }
  };

  // Iterate over each ship and place them on the grid
  ships.forEach((ship) => {
    for (let i = 0; i < ship.count; i++) {
      let placed = false;
      while (!placed) {
        const direction: 'horizontal' | 'vertical' =
          Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const [row, col] = getRandomPosition();
        if (canPlaceShip(row, col, ship.size, direction)) {
          placeShip(row, col, ship.size, direction);
          placed = true;
        }
      }
    }
  });

  return newGrid;
};

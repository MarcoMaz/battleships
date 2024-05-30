'use client';

import { Dispatch, FunctionComponent, SetStateAction, useEffect } from 'react';

import { GridProps as GridDataProps, ShipProps } from '@/app/types/index';
import { placeShips } from '@/app/utils/index';

import styles from './Grid.module.css';

type GridComponentProps = {
  grid: GridDataProps;
  setGrid: Dispatch<SetStateAction<GridDataProps>>;
};

export const gridSize: number = 10;

export const ships: ShipProps[] = [
  { name: 'Battleship', size: 5, count: 1 },
  { name: 'Destroyer', size: 4, count: 2 },
];

const Grid: FunctionComponent<GridComponentProps> = ({ grid, setGrid }) => {
  useEffect(() => {
    const initialGrid: GridDataProps = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({ ship: false, status: 'none', shipId: null }))
      );

    const newGrid: GridDataProps = placeShips(initialGrid, ships);

    setGrid(newGrid);
  }, [setGrid]);

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className={styles.container}>
      <div className={styles['column-labels']}>
        <div className={styles['empty-cell']}></div>
        {Array.from({ length: gridSize }, (_, colIndex) => (
          <div key={colIndex} className={styles['column-label']}>
            {getColumnLabel(colIndex)}
          </div>
        ))}
      </div>

      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          <div className={styles['row-label']}>{rowIndex + 1}</div>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`${styles.cell} ${cell.ship ? styles.ship : ''} ${
                cell.status ? styles[cell.status] : ''
              }`}
              role='cell'
              data-coordinate={`${getColumnLabel(colIndex)}${rowIndex + 1}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

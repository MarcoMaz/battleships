'use client';

import { Dispatch, FunctionComponent, SetStateAction, useEffect } from 'react';
import { GridProps as GridDataProps, CellProps } from '../types';

import styles from './Grid.module.css';

type GridComponentProps = {
  grid: GridDataProps;
  setGrid: Dispatch<SetStateAction<GridDataProps>>;
};

const Grid: FunctionComponent<GridComponentProps> = ({ grid, setGrid }) => {
  const GRID_SIZE: number = 10;

  useEffect(() => {
    const initialGrid: GridDataProps = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null));

    setGrid(initialGrid);
  }, [setGrid]);

  return (
    <div className={styles.container}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={styles.cell} role='cell'></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

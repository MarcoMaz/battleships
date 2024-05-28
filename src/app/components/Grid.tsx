'use client';

import { Dispatch, FunctionComponent, SetStateAction, useEffect } from 'react';

import { GridProps as GridDataProps, ShipProps } from '../types';
import { placeShips } from '../utils';

import styles from './Grid.module.css';

type GridComponentProps = {
  grid: GridDataProps;
  setGrid: Dispatch<SetStateAction<GridDataProps>>;
};

const Grid: FunctionComponent<GridComponentProps> = ({ grid, setGrid }) => {
  const GRID_SIZE: number = 10;

  useEffect(() => {
    const ships: ShipProps[] = [
      { name: 'Battleship', size: 5, count: 1 },
      { name: 'Destroyer', size: 4, count: 2 },
    ];

    const initialGrid: GridDataProps = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({ ship: false }))
      );

    const newGrid: GridDataProps = placeShips(initialGrid, ships);

    setGrid(newGrid);
  }, [setGrid]);

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className={styles.container}>
      <div className={styles['column-labels']}>
        <div className={styles['empty-cell']}></div>
        {Array.from({ length: GRID_SIZE }, (_, colIndex) => (
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
              className={`${styles.cell} ${cell.ship ? styles.ship : ''}`}
              role='cell'
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

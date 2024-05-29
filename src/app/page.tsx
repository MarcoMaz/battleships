'use client';

import { useState } from 'react';
import { GridProps } from './types';

import Heading from './components/Heading/Heading';
import Grid from './components/Grid/Grid';
import Message from './components/Message/Message';
import InputCoordinate from './components/InputCoordinate/InputCoordinate';

export default function Home() {
  const [grid, setGrid] = useState<GridProps>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value.toUpperCase());
    setMessage('');
  };

  const checkIfSunk = (shipId: number, grid: GridProps): boolean => {
    for (let row of grid) {
      for (let cell of row) {
        if (cell.ship && cell.shipId === shipId && cell.status !== 'hit') {
          return false;
        }
      }
    }
    return true;
  };

  const updateSunkStatus = (shipId: number, grid: GridProps): GridProps => {
    return grid.map((row) =>
      row.map((cell) =>
        cell.ship && cell.shipId === shipId ? { ...cell, status: 'sunk' } : cell
      )
    );
  };

  const checkGameOver = (grid: GridProps): boolean => {
    return grid.every((row) =>
      row.every((cell) => !cell.ship || cell.status === 'sunk')
    );
  };


  const handleHitButtonClick = (): void => {
    const match = inputValue.match(/^([A-J])([1-9]|10)$/);
    if (match) {
      const col = match[1].charCodeAt(0) - 'A'.charCodeAt(0);
      const row = parseInt(match[2]) - 1;
      if (grid[row][col].ship) {
        if (grid[row][col].status === 'sunk') {
          setMessage(`Ship already sunk at position: ${match[0]}`);
        } else {
          grid[row][col].status = 'hit';
          const shipId = grid[row][col].shipId!;
          if (checkIfSunk(shipId, grid)) {
            const newGrid = updateSunkStatus(shipId, grid);
            setGrid(newGrid);
            if (checkGameOver(newGrid)) {
              setIsGameOver(true);
              setMessage('Game over! All ships are sunk.');
            } else {
              setMessage(`Ship sunk at position: ${match[0]}`);
            }
          } else {
            setGrid([...grid]);
            setMessage(`Ship hit at position: ${match[0]}`);
          }
        }
      } else {
        grid[row][col].status = 'miss';
        setGrid([...grid]);
        setMessage(`Miss at position: ${match[0]}`);
      }
    } else {
      setMessage(`Invalid input format`);
    }
    setInputValue('');
  };
  
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      handleHitButtonClick();
    }
  };

  return (
    <main>
      <Heading />
      <Grid grid={grid} setGrid={setGrid} />
      <InputCoordinate
        inputValue={inputValue}
        isGameOver={isGameOver}
        handleInputChange={handleInputChange}
        handleHitButtonClick={handleHitButtonClick}
        handleKeyDown={handleKeyDown}
      />
      <Message message={message} />
    </main>
  );
}

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value.toUpperCase());
    setMessage('');
  };

  const handleHitButtonClick = (): void => {
    const match = inputValue.match(/^([A-J])([1-9]|10)$/);

    if (match) {
      const col = match[1].charCodeAt(0) - 'A'.charCodeAt(0);
      const row = parseInt(match[2]) - 1;
      if (grid[row][col].ship) {
        grid[row][col].status = 'hit';
      } else {
        grid[row][col].status = 'miss';
        setGrid([...grid]);
        setMessage(`Miss at position: ${match[0]}`);
      }
    } else {
      setMessage('Invalid input format');
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
        handleInputChange={handleInputChange}
        handleHitButtonClick={handleHitButtonClick}
        handleKeyDown={handleKeyDown}
      />
      <Message message={message} />
    </main>
  );
}

'use client';

import { useState } from 'react';
import { GridProps } from './types';
import Grid from './components/Grid';

import styles from './page.module.css';

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

  const HEADING_LABEL: string = 'Battleships';
  const COORDINATES_INSTRUCTIONS_LABEL: string = `Enter coordinates in the format: Column, Row (e.g., A5) and hit the
  button.`;
  const COORDINATES_BUTTON_LABEL: string = `HIT`;

  return (
    <main>
      <h1 className={styles.heading}>{HEADING_LABEL}</h1>
      <Grid grid={grid} setGrid={setGrid} />
      <div className={styles.coordinates}>
        <p className={styles['coordinates-instructions']}>
          {COORDINATES_INSTRUCTIONS_LABEL}
        </p>
        <input
          className={styles['coordinates-input']}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Enter value'
        />
        <button
          className={styles['coordinates-button']}
          onClick={handleHitButtonClick}
        >
          {COORDINATES_BUTTON_LABEL}
        </button>
      </div>
      <div className={styles.message}>
        {message && (
          <p className={styles['message-error']}>{message}</p>
        )}
      </div>
    </main>
  );
}

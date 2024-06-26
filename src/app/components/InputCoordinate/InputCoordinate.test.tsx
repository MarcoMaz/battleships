import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { GridProps } from '@/app/types';
import Grid from '../Grid/Grid';

const GRID_SIZE = 10;

const createEmptyGrid = (): GridProps =>
  Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({ ship: false, status: 'none', shipId: null }))
    );

describe('Input Coordinate Component', () => {
  const testInvalidInput = (inputValue: string) => {
    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.click(button);

    expect(input).toHaveValue('');
    expect(screen.getByText('Invalid input format')).toBeInTheDocument();
  };

  test('input validation function properly validates user input for coordinates (e.g., A1 to J10)', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    const validInputs = ['A1', 'B10', 'J5', 'D3', 'H8'];
    const invalidInputs = ['K1', 'A0', 'J11', 'AA', '1A', '', 'Z5', 'A-1'];

    // Loop through each valid input to test
    validInputs.forEach((inputValue) => {
      fireEvent.change(input, { target: { value: inputValue } });
      fireEvent.click(button);

      expect(input).toHaveValue('');
      expect(
        screen.queryByText('Invalid input format')
      ).not.toBeInTheDocument();
    });

    // Loop through each invalid input to test
    invalidInputs.forEach(testInvalidInput);
  });

  test('Verify that invalid inputs are rejected with appropriate error messages', () => {
    render(<Home />);

    const invalidInputs = ['K1', 'A0', 'J11', 'AA', '1A', '', 'Z5', 'A-1'];

    // Loop through each invalid input to test
    invalidInputs.forEach(testInvalidInput);
  });

  test('function responsible for updating the game state based on player inputs', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    fireEvent.change(input, { target: { value: 'A1' } });
    fireEvent.click(button);

    expect(screen.getByText(/miss at position/i)).toBeInTheDocument();
  });

  test('re-typing coordinate of a sunk ship does not change its status', () => {
    const gridWithHitCell = createEmptyGrid();
    gridWithHitCell[0][0] = { ship: true, status: 'sunk', shipId: 1 };
    const setGrid = jest.fn();

    render(<Grid grid={gridWithHitCell} setGrid={setGrid} />);
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    fireEvent.change(input, { target: { value: 'A1' } });
    fireEvent.click(button);
    
    const hitCell = document.querySelector('[data-coordinate="A1"]');
    expect(hitCell).toHaveClass('sunk');
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Home Component', () => {
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
    invalidInputs.forEach((inputValue) => {
      fireEvent.change(input, { target: { value: inputValue } });
      fireEvent.click(button);

      expect(input).toHaveValue('');
      expect(screen.getByText('Invalid input format')).toBeInTheDocument();
    });
  });

  test('Verify that invalid inputs are rejected with appropriate error messages', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    const invalidInputs = ['K1', 'A0', 'J11', 'AA', '1A', '', 'Z5', 'A-1'];

    // Loop through each invalid input to test
    invalidInputs.forEach((inputValue) => {
      fireEvent.change(input, { target: { value: inputValue } });
      fireEvent.click(button);

      expect(input).toHaveValue('');
      expect(screen.getByText('Invalid input format')).toBeInTheDocument();
    });
  });

  test('function responsible for updating the game state based on player inputs', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter value');
    const button = screen.getByText('HIT');

    fireEvent.change(input, { target: { value: 'A1' } });
    fireEvent.click(button);

    expect(screen.getByText(/miss at position/i)).toBeInTheDocument();
  });
});

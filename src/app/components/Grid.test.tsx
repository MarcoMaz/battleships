import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

describe('Grid Component', () => {
  test('initializes with a 10x10 grid', async () => {
    render(<Home />);

    const size = 10;
    const gridSize = size * size;
    const cells = await screen.findAllByRole('cell');

    expect(cells).toHaveLength(gridSize);
  });
});

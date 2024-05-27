'use client';

import { useState } from 'react';
import { GridProps } from './types';
import Grid from './components/Grid';

export default function Home() {
  const [grid, setGrid] = useState<GridProps>([]);

  return (
    <main>
      <Grid grid={grid} setGrid={setGrid} />
    </main>
  );
}

export type CellProps = {
  ship: boolean;
  status: 'none' | 'hit' | 'miss';
};

export type GridProps = CellProps[][];

export type ShipProps = {
  name: string;
  size: number;
  count: number;
};

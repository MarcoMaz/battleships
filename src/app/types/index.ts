export type CellProps = {
  ship: boolean;
  status: 'none' | 'hit' | 'miss' | 'sunk';
  shipId: number | null;
};

export type GridProps = CellProps[][];

export type ShipProps = {
  name: string;
  size: number;
  count: number;
};

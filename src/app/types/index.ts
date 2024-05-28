export type CellProps = {
  ship: boolean;
};

export type GridProps = CellProps[][];

export type ShipProps = {
  name: string;
  size: number;
  count: number;
};

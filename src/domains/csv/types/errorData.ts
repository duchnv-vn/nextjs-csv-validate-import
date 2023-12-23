export interface ErrorTarget {
  columnName: string;
  value: string | number;
  rowNumber: number;
  messages: string[];
}

import { IColumn } from "./column.interface";

export interface IBoard {
  _id: string;
  title: string;
  user: string;
  columns: Array<IColumn>;
}

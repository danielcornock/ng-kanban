import { IColumn } from "./column.interface";
import { IBoardConfig } from "./board-config.interface";

export interface IBoard {
  _id: string;
  title: string;
  user: string;
  columns: Array<IColumn>;
  config: IBoardConfig;
}

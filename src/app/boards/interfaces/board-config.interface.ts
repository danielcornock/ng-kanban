export interface IBoardConfig {
  _id: string;
  tags: Array<ITag>;
}

export interface ITag {
  color: string;
  label: string;
}

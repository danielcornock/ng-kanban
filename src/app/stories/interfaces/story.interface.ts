import { ITag } from "../../../app/boards/interfaces/board-config.interface";

export interface IStory {
  _id: string;
  title: string;
  storyNumber: number;
  description?: string;
  tags: Array<ITag>;
}

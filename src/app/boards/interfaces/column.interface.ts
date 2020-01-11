import { IStory } from "src/app/stories/interfaces/story.interface";

export interface IColumn {
  _id?: string;
  title: string;
  stories?: Array<IStory | string>;
}

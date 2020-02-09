import { IGithubRepo } from "../components/github-repo-list/interfaces/github-repo.interface";

export interface IBoardConfig {
  _id: string;
  tags: Array<ITag>;
  repos: Array<IGithubRepo>;
}

export interface ITag {
  color: string;
  label: string;
}

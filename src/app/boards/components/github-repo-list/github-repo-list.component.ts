import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IGithubRepo } from "./interfaces/github-repo.interface";

export interface IGithubRepoListOnSelectOutput {
  repo: IGithubRepo;
  index: number;
}
@Component({
  selector: "app-github-repo-list",
  templateUrl: "./github-repo-list.component.html",
  styleUrls: ["./github-repo-list.component.scss"]
})
export class GithubRepoListComponent {
  @Input() appGithubRepoListRepos: Array<IGithubRepo>;
  @Input() appGithubRepoListIsSelected: boolean;
  @Output() appGithubRepoListOnSelect: EventEmitter<
    IGithubRepoListOnSelectOutput
  > = new EventEmitter<IGithubRepoListOnSelectOutput>();

  constructor() {}

  public onRepoSelect(repo: IGithubRepo, index: number): void {
    this.appGithubRepoListOnSelect.emit({ repo, index });
  }
}

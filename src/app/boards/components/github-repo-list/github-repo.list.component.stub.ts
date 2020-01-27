import { Input, Output, EventEmitter, Component } from "@angular/core";
import { IGithubRepo } from "./interfaces/github-repo.interface";
import { IGithubRepoListOnSelectOutput } from "./github-repo-list.component";

@Component({
  selector: "app-github-repo-list",
  templateUrl: "./github-repo-list.component.html",
  styleUrls: ["./github-repo-list.component.scss"]
})
export class GithubRepoListComponentStub {
  @Input() appGithubRepoListRepos: Array<IGithubRepo>;
  @Input() appGithubRepoListIsSelected: boolean;
  @Output() appGithubRepoListOnSelect: EventEmitter<
    IGithubRepoListOnSelectOutput
  > = new EventEmitter<IGithubRepoListOnSelectOutput>();
}

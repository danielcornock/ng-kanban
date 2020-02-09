import { Input, Output, EventEmitter, Component } from "@angular/core";

@Component({
  selector: "app-github-commits",
  template: ""
})
export class GithubCommitsComponentStub {
  @Input() appGithubCommitsCommit: any;
  @Output() appGithubCommitsSelect: EventEmitter<any> = new EventEmitter<any>();
}

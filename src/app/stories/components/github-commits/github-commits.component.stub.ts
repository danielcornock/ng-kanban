import { Input, Output, EventEmitter } from "@angular/core";

export class GithubCommitsComponentStub {
  @Input() appGithubCommitsCommit: any;
  @Output() appGithubCommitsSelect: EventEmitter<any> = new EventEmitter<any>();
}

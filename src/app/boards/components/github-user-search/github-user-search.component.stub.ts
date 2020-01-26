import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-github-user-search",
  template: ""
})
export class GithubUserSearchComponentStub {
  @Output() appGithubUserSearchOnSearch: EventEmitter<
    string
  > = new EventEmitter<string>();
}

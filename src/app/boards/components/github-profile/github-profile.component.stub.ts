import { Component, Input } from "@angular/core";
import { IGithubProfile } from "./interfaces/github-profile.interface";

@Component({
  selector: "app-github-profile",
  template: ""
})
export class GithubProfileComponentStub {
  @Input() githubProfile: IGithubProfile;
}

import { Component, Input } from "@angular/core";
import { IGithubProfile } from "./interfaces/github-profile.interface";

@Component({
  selector: "app-github-profile",
  templateUrl: "./github-profile.component.html",
  styleUrls: ["./github-profile.component.scss"]
})
export class GithubProfileComponent {
  @Input() githubProfile: IGithubProfile;

  constructor() {}
}

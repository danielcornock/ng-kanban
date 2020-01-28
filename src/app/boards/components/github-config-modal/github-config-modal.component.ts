import { Component, OnInit, Inject } from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GithubService } from "../../services/github/github.service";
import { IGithubRepoListOnSelectOutput } from "../github-repo-list/github-repo-list.component";

@Component({
  selector: "app-github-config-modal",
  templateUrl: "./github-config-modal.component.html",
  styleUrls: ["./github-config-modal.component.scss"]
})
export class GithubConfigModalComponent
  extends ModalDialog<GithubConfigModalComponent>
  implements OnInit {
  public userDetails;
  public filteredRepos: Array<any>;
  public selectedRepos: Array<any> = [];

  private _username: string;
  private _allRepos: Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<GithubConfigModalComponent>,
    private readonly _githubService: GithubService
  ) {
    super(matDialogRef, data);
  }

  ngOnInit() {}

  public async searchUsername(username: string): Promise<void> {
    const rawUserDetails = await this._githubService
      .searchUsers(username)
      .catch();
    this._username = rawUserDetails.login;

    this.userDetails = {
      name: rawUserDetails.login,
      imageUrl: rawUserDetails.avatar_url,
      bio: rawUserDetails.bio
    };
  }

  public async selectProfile(): Promise<void> {
    this._allRepos = await this._githubService.fetchRepos(this._username);
    this.filteredRepos = this._allRepos;
  }

  public filterRepos(event: KeyboardEvent): void {
    const val = (event.target as HTMLInputElement).value;
    this.filteredRepos = this._allRepos.filter(repo => {
      return repo.name.includes(val);
    });
  }

  public addToSelectedRepos(event: IGithubRepoListOnSelectOutput) {
    this.selectedRepos.push(event.repo);
    this.filteredRepos.splice(event.index, 1);
  }

  public removeFromSelectedRepos({ index }) {
    this.selectedRepos.splice(index, 1);
  }

  public saveRepos(): void {
    this.closeModal();
  }
}

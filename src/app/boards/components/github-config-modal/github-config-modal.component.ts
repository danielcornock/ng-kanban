import { Component, OnInit, Inject } from '@angular/core';
import { ModalDialog } from 'src/app/shared/modal/modal-dialog/modal-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GithubService } from '../../services/github/github.service';
import { IGithubRepoListOnSelectOutput } from '../github-repo-list/github-repo-list.component';
import { IGithubUserDetails } from './interfaces/github-user-details.interface';
import { IGithubRepo } from '../github-repo-list/interfaces/github-repo.interface';

@Component({
  selector: 'app-github-config-modal',
  templateUrl: './github-config-modal.component.html',
  styleUrls: ['./github-config-modal.component.scss']
})
export class GithubConfigModalComponent
  extends ModalDialog<GithubConfigModalComponent>
  implements OnInit {
  public userDetails: IGithubUserDetails;
  public filteredRepos: Array<IGithubRepo>;
  public selectedRepos: Array<IGithubRepo>;

  private _username: string;
  private _allRepos: Array<IGithubRepo>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<GithubConfigModalComponent>,
    private readonly _githubService: GithubService
  ) {
    super(matDialogRef, data);
  }

  ngOnInit() {
    this.selectedRepos = this.dialogData.repos ? this.dialogData.repos : [];
  }

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
    const res = await this._githubService.fetchRepos(this._username);
    this._allRepos = res.map((repo: IGithubRepo) => {
      return {
        name: repo.name,
        url: repo.url
      };
    });
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
    this.closeModal({
      selectedRepos: this.selectedRepos
    });
  }
}

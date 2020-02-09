import { Component, OnInit, Inject } from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GithubService } from "src/app/boards/services/github/github.service";
import { IGithubRepo } from "src/app/boards/components/github-repo-list/interfaces/github-repo.interface";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";

@Component({
  selector: "app-github-commits-modal",
  templateUrl: "./github-commits-modal.component.html",
  styleUrls: ["./github-commits-modal.component.scss"]
})
export class GithubCommitsModalComponent
  extends ModalDialog<GithubCommitsModalComponent>
  implements OnInit {
  public repos: Array<IGithubRepo>;
  public commits: Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<GithubCommitsModalComponent>,
    private readonly _boardConfigStoreService: BoardConfigStoreService,
    private readonly _githubService: GithubService
  ) {
    super(matDialogRef, data);
  }

  async ngOnInit() {
    const config = await this._boardConfigStoreService
      .getConfig()
      .subscribe(data => {
        this.repos = data.repos;
      });
  }

  public async searchCommits(url: string): Promise<void> {
    const commits = await this._githubService.fetchCommits(url);
    this.commits = commits;
    console.log(this.commits);
  }

  public selectCommit(commit: any) {
    this.closeModal(commit);
  }
}

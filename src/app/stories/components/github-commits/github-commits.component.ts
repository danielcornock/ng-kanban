import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { IGithubRepo } from "src/app/boards/components/github-repo-list/interfaces/github-repo.interface";
import { GithubCommitsModalComponent } from "../github-commits-modal/github-commits-modal.component";

@Component({
  selector: "app-github-commits",
  templateUrl: "./github-commits.component.html",
  styleUrls: ["./github-commits.component.scss"]
})
export class GithubCommitsComponent implements OnInit {
  @Input() appGithubCommitsCommit: any;
  @Output() appGithubCommitsSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly _modalService: ModalService) {}

  ngOnInit() {}

  public openCommitsModal(): void {
    this._modalService
      .openModal(GithubCommitsModalComponent, {})
      .afterClosed()
      .subscribe(data => {
        this.appGithubCommitsSelect.emit(data);
      });
  }

  public removeCommit(): void {
    this.appGithubCommitsSelect.emit(null);
  }
}

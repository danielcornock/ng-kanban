import { Component, OnInit, Input } from "@angular/core";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { TagsModalComponent } from "../../../stories/components/tags-modal/tags-modal.component";
import { GithubConfigModalComponent } from "../github-config-modal/github-config-modal.component";
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";
import { IGithubConfig } from "./interfaces/github-config.interface";
import { BoardConfigStoreService } from "../../services/board-config-store/board-config-store.service";

@Component({
  selector: "app-board-header",
  templateUrl: "./board-header.component.html",
  styleUrls: ["./board-header.component.scss"]
})
export class BoardHeaderComponent implements OnInit {
  @Input() appBoardHeaderTitle: string;
  @Input() appBoardHeaderBoardModel: IHttpModel;

  constructor(
    private readonly _modalService: ModalService,
    private readonly _boardConfigStoreService: BoardConfigStoreService
  ) {}

  ngOnInit() {}

  public openTagsModal(): void {
    this._modalService.openModal(TagsModalComponent, {});
  }

  public openGithubModal(): void {
    const modalClose = this._modalService.openModal(
      GithubConfigModalComponent,
      {
        repos: this.appBoardHeaderBoardModel.data.config.repos
      }
    );

    modalClose.afterClosed().subscribe(data => {
      this._saveConfigToBoard(data);
    });
  }

  private _saveConfigToBoard(data: IGithubConfig): void {
    this.appBoardHeaderBoardModel.data.config.repos = data.selectedRepos;

    this._boardConfigStoreService.saveConfig(
      this.appBoardHeaderBoardModel.data.config
    );
  }
}

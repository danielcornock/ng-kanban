import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";
import {
  StoryApiService,
  IBoardUpdate
} from "src/app/stories/services/story-api.service";
import { BoardApiService } from "../../services/board-api/board-api.service";
import { BoardRefreshService } from "../../services/board-refresh/board-refresh.service";
import { IStory } from "src/app/stories/interfaces/story.interface";
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";
import { BoardConfigStoreService } from "../../services/board-config-store/board-config-store.service";
import { filter } from "rxjs/operators";
import { ModelStatus } from "src/app/shared/api/http-model/constants/model-status";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  private _boardId: string;
  public boardModel: IHttpModel;

  constructor(
    private readonly _routerService: RouterService,
    private readonly _storyApiService: StoryApiService,
    private readonly _boardApiService: BoardApiService,
    private readonly _boardRefreshService: BoardRefreshService,
    private readonly _boardConfigStoreService: BoardConfigStoreService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this._fetchBoard();
    this._watchBoardChanges();
    this._subscribeToNewStories();
    this._subscribeToDeletedStories();
    this._onBoardRefresh();
  }

  public addColumn(title: string) {
    this.boardModel.data.columns.push({ title });
    this.boardModel.update();
  }

  private _watchBoardChanges(): void {
    this.boardModel
      .onStatusChanges()
      .pipe(
        filter(
          (status: ModelStatus) =>
            status === ModelStatus.RELOADED || status === ModelStatus.UPDATED
        )
      )
      .subscribe(() => {
        this._boardConfigStoreService.setConfig(this.boardModel.data.config);
      });
  }

  private _onBoardRefresh(): void {
    this._boardRefreshService.boardListRefresh.subscribe(() => {
      this.boardModel.reload();
    });
  }

  private async _fetchBoard(boardId?: string) {
    this._boardId = this._routerService.getUrlParams("boardId");
    this.boardModel = await this._boardApiService.fetchBoard(this._boardId);
  }

  private _subscribeToNewStories(): void {
    this._storyApiService.updateBoardSubject.subscribe(() => {
      this.boardModel.reload();
    });
  }

  private _subscribeToDeletedStories(): void {
    this._storyApiService.deleteStorySubject.subscribe((val: IBoardUpdate) => {
      const col = this.boardModel.data.columns.find(
        col => col._id === val.columnId
      );

      col.stories = col.stories.filter((story: IStory) => {
        return story._id !== val.storyId;
      });

      this.boardModel.update();
    });
  }
}

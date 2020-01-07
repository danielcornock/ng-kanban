import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { StoryApiService } from "src/app/stories/services/story-api.service";
import { BoardApiService } from "../../services/board-api/board-api.service";
import { IBoard } from "../../interfaces/board.interface";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  public board;
  private _boardId: string;

  constructor(
    private readonly _routerService: RouterService,
    private readonly _httpService: HttpService,
    private readonly _storyApiService: StoryApiService,
    private readonly _boardApiService: BoardApiService
  ) {}

  ngOnInit() {
    this._fetchBoard();
    this._subscribeToNewStories();
  }

  public addColumn(title: string) {
    this.board.columns.push({ title });
    this._saveBoard();
  }

  private async _saveBoard() {
    await this._httpService.put(`boards/${this._boardId}`, this.board);
    this._fetchBoard(this._boardId);
  }

  private async _fetchBoard(boardId?: string) {
    if (!boardId) {
      this._boardId = this._routerService.getUrlParams("boardId");
    }
    this.board = await this._boardApiService.fetchBoard(this._boardId);
  }

  private _subscribeToNewStories(): void {
    this._storyApiService.updateBoardSubject.subscribe((val: any) => {
      const col = this.board.columns.find(col => col._id === val.columnId);
      col.stories.push(val.storyId);
      this._saveBoard();
    });
  }
}

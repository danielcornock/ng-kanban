import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { StoryApiService } from "src/app/stories/services/story-api.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  public board;
  private _boardId: string;

  private readonly _routerService: RouterService;
  private readonly _httpService: HttpService;
  private readonly _storyApiService: StoryApiService;

  constructor(
    routerService: RouterService,
    httpService: HttpService,
    storyApiService: StoryApiService
  ) {
    this._routerService = routerService;
    this._httpService = httpService;
    this._storyApiService = storyApiService;
  }

  ngOnInit() {
    this._fetchBoard();
    this._subscribeToNewStories();
  }

  public addColumn(title: string) {
    this.board.columns.push({ title });
    this._saveBoard();
  }

  private _saveBoard() {
    this._httpService.put(`boards/${this._boardId}`, this.board).then(data => {
      this.board = data.board;
    });
  }

  private async _fetchBoard() {
    this._boardId = this._routerService.getUrlParams("boardId");
    this._httpService.get(`boards/${this._boardId}`).then(data => {
      this.board = data.board;
    });
  }

  private _subscribeToNewStories(): void {
    this._storyApiService.updateBoardSubject.subscribe((val: any) => {
      const col = this.board.columns.find(col => col._id === val.columnId);
      col.stories.push(val.storyId);
      this._saveBoard();
    });
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { BoardRefreshService } from "../../services/board-refresh/board-refresh.service";
import { IBoardListItem } from "../../interfaces/board-list-item.interface";

@Component({
  selector: "app-boards-list",
  templateUrl: "./boards-list.component.html",
  styleUrls: ["./boards-list.component.scss"]
})
export class BoardsListComponent implements OnInit, OnDestroy {
  public boardList: Array<IBoardListItem>;

  private readonly _router: RouterService;
  private readonly _httpService: HttpService;
  private readonly _boardRefreshService: BoardRefreshService;

  constructor(
    router: RouterService,
    httpService: HttpService,
    boardRefreshService: BoardRefreshService
  ) {
    this._router = router;
    this._httpService = httpService;
    this._boardRefreshService = boardRefreshService;
  }

  public ngOnInit(): void {
    this._fetchBoards();
    this._subscribeToNewBoards();
  }

  private async _fetchBoards(): Promise<void> {
    this._httpService.get("boards/list").then(data => {
      console.log(data);
      this.boardList = data.boards;
      console.log(this.boardList);
    });
  }

  private _subscribeToNewBoards(): void {
    this._boardRefreshService.boardListRefresh.subscribe(() => {
      this._fetchBoards();
    });
  }

  public navigateTo(boardId: string): void {
    this._router.navigate(`boards/${boardId}`);
  }

  public ngOnDestroy(): void {}
}

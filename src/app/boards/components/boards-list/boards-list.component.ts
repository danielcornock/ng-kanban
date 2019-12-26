import { Component, OnInit } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";

@Component({
  selector: "app-boards-list",
  templateUrl: "./boards-list.component.html",
  styleUrls: ["./boards-list.component.scss"]
})
export class BoardsListComponent implements OnInit {
  public boardList;

  private readonly _router: RouterService;
  private readonly _httpService: HttpService;

  constructor(router: RouterService, httpService: HttpService) {
    this._router = router;
    this._httpService = httpService;
  }

  ngOnInit() {
    this._fetchBoards();
  }

  private async _fetchBoards(): Promise<void> {
    this._httpService.get("boards/list").then(data => {
      this.boardList = data.boards;
    });
  }

  public navigateTo(boardId: string): void {
    this._router.navigate(`boards/${boardId}`);
  }
}

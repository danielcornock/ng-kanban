import { Component, OnInit } from "@angular/core";
import { BoardApiService } from "src/app/boards/services/board-api/board-api.service";
import { RouterService } from "../../router/router.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(private readonly _routerService: RouterService) {}

  public navigateToHome(): void {
    this._routerService.navigate("home");
  }

  public isOnBoard(): boolean {
    return !!this._routerService.getUrlParams("boardId");
  }
}

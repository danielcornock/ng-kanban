import { Component, OnInit } from "@angular/core";
import { BoardApiService } from "src/app/boards/services/board-api/board-api.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public boardTitle: string;

  constructor(private readonly _boardApiService: BoardApiService) {}

  ngOnInit() {
    this._fetchBoard();
  }

  private _fetchBoard(): void {
    this._boardApiService.boardTitle.subscribe((title: string) => {
      this.boardTitle = title;
    });
  }
}

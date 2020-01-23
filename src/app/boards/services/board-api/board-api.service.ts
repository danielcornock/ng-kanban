import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { IBoard } from "../../interfaces/board.interface";
import { Subject } from "rxjs";
import { BoardConfigStoreService } from "../board-config-store/board-config-store.service";

@Injectable({
  providedIn: "root"
})
export class BoardApiService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _boardConfigStoreService: BoardConfigStoreService
  ) {}

  public async fetchBoard(boardId: string): Promise<IBoard> {
    const { board } = await this._httpService.get(`boards/${boardId}`);
    this._boardConfigStoreService.setConfig(board.config);
    return board;
  }
}

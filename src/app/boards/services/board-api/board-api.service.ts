import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { IBoard } from "../../interfaces/board.interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoardApiService {
  public boardTitle: Subject<string> = new Subject<string>();

  constructor(private readonly _httpService: HttpService) {}

  public async fetchBoard(boardId: string): Promise<IBoard> {
    const { board } = await this._httpService.get(`boards/${boardId}`);
    this.boardTitle.next(board.title);
    return board;
  }
}

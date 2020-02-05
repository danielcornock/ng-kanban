import { Injectable } from "@angular/core";
import { BoardConfigStoreService } from "../board-config-store/board-config-store.service";
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";
import { ModelService } from "src/app/shared/api/model-service/model.service";

@Injectable({
  providedIn: "root"
})
export class BoardApiService {
  constructor(private readonly _modelService: ModelService) {}

  public async fetchBoard(boardId: string): Promise<IHttpModel> {
    return await this._modelService.get(`boards/${boardId}`);
  }
}

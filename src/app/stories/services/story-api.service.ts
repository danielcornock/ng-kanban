import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoryApiService {
  public updateBoardSubject: Subject<IBoardUpdate> = new Subject<
    IBoardUpdate
  >();

  private readonly _httpService: HttpService;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  public addNewStory(title: string, columnId: string, boardId: string) {
    this._httpService
      .post(`boards/${boardId}/stories`, { title })
      .then(({ story }) => {
        this.updateBoardSubject.next({
          storyId: story._id,
          columnId: columnId
        });
      })
      .catch(() => null);
  }
}

export interface IBoardUpdate {
  storyId: string;
  columnId: string;
}

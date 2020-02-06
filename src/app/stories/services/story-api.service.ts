import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { Subject } from "rxjs";
import { IStory } from "../interfaces/story.interface";

@Injectable({
  providedIn: "root"
})
export class StoryApiService {
  public updateBoardSubject: Subject<void> = new Subject<void>();

  public deleteStorySubject: Subject<IBoardUpdate> = new Subject<
    IBoardUpdate
  >();

  private readonly _httpService: HttpService;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  public addNewStory(title: string, columnId: string, boardId: string): void {
    this._httpService
      .post(`boards/${boardId}/columns/${columnId}/stories`, { title })
      .then(() => {
        this.updateBoardSubject.next();
      });
  }
}

export interface IBoardUpdate {
  storyId: string;
  columnId: string;
}

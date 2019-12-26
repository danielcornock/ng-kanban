import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoryApiService {
  public updateBoardSubject: Subject<{
    storyId: string;
    columnId: string;
  }> = new Subject<{ storyId: string; columnId: string }>();

  private readonly _httpService: HttpService;
  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  public async addNewStory(title: string, columnId: string) {
    const { story } = await this._httpService
      .post("stories", { title })
      .catch(() => {});
    this.updateBoardSubject.next({ storyId: story._id, columnId: columnId });
  }
}

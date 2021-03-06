import { TestBed } from "@angular/core/testing";

import { StoryApiService, IBoardUpdate } from "./story-api.service";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";

describe("StoryApiService", () => {
  let service: StoryApiService,
    dependencies: {
      httpService: HttpServiceStub;
    };

  beforeEach(() => {
    dependencies = {
      httpService: new HttpServiceStub()
    };

    TestBed.configureTestingModule({
      providers: [{ provide: HttpService, useValue: dependencies.httpService }]
    });

    service = TestBed.get(StoryApiService);
  });

  describe("when adding a new story", () => {
    let observableData: boolean;
    beforeEach(() => {
      (dependencies.httpService.post as jasmine.Spy).and.returnValue(
        Promise.resolve()
      );

      service.updateBoardSubject.subscribe(() => {
        observableData = true;
      });

      service.addNewStory("storyTitle", "columnId", "boardId");
    });

    it("should post the story to the API", () => {
      expect(dependencies.httpService.post).toHaveBeenCalledWith(
        "boards/boardId/columns/columnId/stories",
        {
          title: "storyTitle"
        }
      );
    });

    it("should next the story title and column id", () => {
      expect(observableData).toBe(true);
    });
  });
});

import { TestBed, async } from "@angular/core/testing";

import { StoryApiService, IBoardUpdate } from "./story-api.service";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { TestPromise } from "src/app/testing/test-promise/test-promise";

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
    let observableData: IBoardUpdate;
    beforeEach(() => {
      (dependencies.httpService.post as jasmine.Spy).and.returnValue(
        Promise.resolve({ story: { _id: "testId" } })
      );

      service.updateBoardSubject.subscribe(data => {
        observableData = data;
      });

      service.addNewStory("storyTitle", "columnId", "boardId");
    });

    it("should post the story to the API", () => {
      expect(dependencies.httpService.post).toHaveBeenCalledWith(
        "boards/boardId/stories",
        {
          title: "storyTitle"
        }
      );
    });

    it("should next the story title and column id", () => {
      expect(observableData).toEqual({
        storyId: "testId",
        columnId: "columnId"
      });
    });
  });

  describe("when deleting a story", () => {
    let deletePromise: TestPromise<void>;

    beforeEach(() => {
      deletePromise = new TestPromise<void>();
      (dependencies.httpService.delete as jasmine.Spy).and.returnValue(
        deletePromise.promise
      );

      service.deleteStory("story-id", "column-id");
    });

    it("should delete the story", () => {
      expect(dependencies.httpService.delete).toHaveBeenCalledWith(
        "stories/story-id"
      );
    });

    describe("when the story has been successfully deleted", () => {
      let deleteSpy: jasmine.Spy;

      beforeEach(async(() => {
        deleteSpy = spyOn(service.deleteStorySubject, "next");
        deletePromise.resolve();
      }));

      it("should emit the story id and column id to be deleted by the board", () => {
        expect(deleteSpy).toHaveBeenCalledWith({
          storyId: "story-id",
          columnId: "column-id"
        });
      });
    });
  });
});

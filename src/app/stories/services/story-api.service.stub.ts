import { Subject } from "rxjs";
import { IBoardUpdate } from "./story-api.service";

export class StoryApiServiceStub {
  public updateBoardSubject: Subject<IBoardUpdate> = new Subject<
    IBoardUpdate
  >();

  public deleteStorySubject: Subject<IBoardUpdate> = new Subject<
    IBoardUpdate
  >();

  public addNewStory = jasmine.createSpy("StoryApiServiceStub.addNewStory");
}

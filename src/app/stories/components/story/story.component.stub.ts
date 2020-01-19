import { Component, Input } from "@angular/core";
import { IStory } from "../../interfaces/story.interface";

@Component({
  selector: "app-story",
  template: ""
})
export class StoryComponentStub {
  @Input() appStory: IStory;
  @Input() appStoryColumnId: string;
}

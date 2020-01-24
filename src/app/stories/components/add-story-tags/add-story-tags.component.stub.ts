import { Input, Output, EventEmitter, Component } from "@angular/core";
import { ITag } from "src/app/boards/interfaces/board-config.interface";

@Component({
  selector: "app-add-story-tags",
  template: ""
})
export class AddStoryTagsComponentStub {
  @Input() appAddStoryTagsExistingTags: Array<ITag>;
  @Output() appAddStoryTagsSelectedTag: EventEmitter<ITag> = new EventEmitter<
    ITag
  >();
}

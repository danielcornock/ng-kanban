import { Input, Output, EventEmitter, Component } from "@angular/core";
import { ITag } from "src/app/boards/interfaces/board-config.interface";

@Component({
  selector: "app-tags",
  template: ""
})
export class TagsComponentStub {
  @Input() appTags: Array<ITag>;
  @Output() appTagsSelectedTag: EventEmitter<ITag> = new EventEmitter<ITag>();
  @Output() appTagsDeletedTag: EventEmitter<number> = new EventEmitter<
    number
  >();
}

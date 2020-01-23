import { Input, Output, EventEmitter } from '@angular/core';
import { ITag } from 'src/app/boards/interfaces/board-config.interface';

@Component({
  selector: "app-add-story-tags",
  template: ""
})
export class AddStoryTagsComponent implements OnInit {
  @Input() appAddStoryTagsExistingTags: Array<ITag>;
  @Output() appAddStoryTagsSelectedTag: EventEmitter<ITag> = new EventEmitter<
    ITag
  >();
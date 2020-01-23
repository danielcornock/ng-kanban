import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";
import {
  ITag,
  IBoardConfig
} from "src/app/boards/interfaces/board-config.interface";

@Component({
  selector: "app-add-story-tags",
  templateUrl: "./add-story-tags.component.html",
  styleUrls: ["./add-story-tags.component.scss"]
})
export class AddStoryTagsComponent implements OnInit {
  @Input() appAddStoryTagsExistingTags: Array<ITag>;
  @Output() appAddStoryTagsSelectedTag: EventEmitter<ITag> = new EventEmitter<
    ITag
  >();

  public allTags: Array<ITag>;
  public notSelectedTags: Array<ITag>;

  constructor(
    private readonly _boardConfigStoreService: BoardConfigStoreService
  ) {}

  ngOnInit() {
    this._boardConfigStoreService
      .getConfig()
      .subscribe((config: IBoardConfig) => {
        this.allTags = config.tags;
        this.notSelectedTags = this.allTags.filter(tag => {
          return !this.appAddStoryTagsExistingTags.find(existingTag => {
            return existingTag.color === tag.color;
          });
        });
      });
  }

  public addTagToStory(tag: ITag): void {
    this.appAddStoryTagsSelectedTag.emit(tag);
  }
}

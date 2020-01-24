import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ITag } from "src/app/boards/interfaces/board-config.interface";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"]
})
export class TagsComponent implements OnInit {
  @Input() appTags: Array<ITag>;
  @Output() appTagsSelectedTag: EventEmitter<ITag> = new EventEmitter<ITag>();
  @Output() appTagsDeletedTag: EventEmitter<number> = new EventEmitter<
    number
  >();

  public showTagsChoice: boolean;

  constructor() {}

  ngOnInit() {
    this.showTagsChoice = false;
  }

  public addNewTag() {
    this.showTagsChoice = !this.showTagsChoice;
  }

  public addTagToStory(tag: ITag) {
    this.appTagsSelectedTag.emit(tag);
  }

  public removeTag(index: number): void {
    this.appTagsDeletedTag.emit(index);
  }
}

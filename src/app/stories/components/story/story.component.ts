import { Component, OnInit, Input } from "@angular/core";
import { IStory } from "../../interfaces/story.interface";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { EditStoryModalComponent } from "../edit-story-modal/edit-story-modal.component";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"]
})
export class StoryComponent implements OnInit {
  @Input() appStory: IStory;
  @Input() appStoryColumnId: string;

  constructor(private readonly _modalService: ModalService) {}

  ngOnInit() {}

  public openStoryModal(): void {
    this._modalService.openModal(EditStoryModalComponent, {
      storyId: this.appStory._id,
      columnId: this.appStoryColumnId
    });
  }
}

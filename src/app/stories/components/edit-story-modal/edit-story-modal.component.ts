import { Component, OnInit, Inject } from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { IStory } from "../../interfaces/story.interface";

@Component({
  selector: "app-edit-story-modal",
  templateUrl: "./edit-story-modal.component.html",
  styleUrls: ["./edit-story-modal.component.scss"]
})
export class EditStoryModalComponent
  extends ModalDialog<EditStoryModalComponent>
  implements OnInit {
  public story: IStory;
  private readonly _httpService: HttpService;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<EditStoryModalComponent>,
    httpService: HttpService
  ) {
    super(matDialogRef);
    this._httpService = httpService;
    this._formatData(data);
  }

  ngOnInit() {
    this._fetchStory();
  }

  private async _fetchStory(): Promise<void> {
    const httpRes: any = await this._httpService.get(
      `stories/${this.dialogData.storyId}`
    );

    this.story = httpRes.story;
  }
}

import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { IStory } from "../../interfaces/story.interface";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BoardRefreshService } from "src/app/boards/services/board-refresh/board-refresh.service";
import { IControlExport } from "src/app/shared/forms/interfaces/control-export.interface";
import { StoryApiService } from "../../services/story-api.service";
import { ITag } from "src/app/boards/interfaces/board-config.interface";

@Component({
  selector: "app-edit-story-modal",
  templateUrl: "./edit-story-modal.component.html",
  styleUrls: ["./edit-story-modal.component.scss"]
})
export class EditStoryModalComponent
  extends ModalDialog<EditStoryModalComponent>
  implements OnInit {
  public story: IStory;
  public storyForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<EditStoryModalComponent>,
    private readonly _httpService: HttpService,
    private readonly _formBuilder: FormBuilder,
    private readonly _boardRefreshService: BoardRefreshService,
    private readonly _storyApiService: StoryApiService
  ) {
    super(matDialogRef, data);
  }

  async ngOnInit() {
    await this._fetchStory();
    this._buildform();
  }

  public onInputChange(event: IControlExport) {
    if (this.story[event.name] === event.value) return;
    this.story[event.name] = event.value;
    this._updateStory();
  }

  public addTagToStory(tag: ITag) {
    this.story.tags.push(tag);
    this._updateStory();
  }

  public removeTag(index: number) {
    this.story.tags.splice(index, 1);
    this._updateStory();
  }

  public async deleteStory(): Promise<void> {
    await this._storyApiService.deleteStory(
      this.story._id,
      this.dialogData.columnId
    );
    this.closeModal();
  }

  private async _updateStory(): Promise<void> {
    await this._httpService.put(`stories/${this.story._id}`, this.story);
    this._boardRefreshService.boardListRefresh.next();
  }

  private async _fetchStory(): Promise<void> {
    const httpRes: any = await this._httpService.get(
      `stories/${this.dialogData.storyId}`
    );

    this.story = httpRes.story;
  }

  private _buildform(): void {
    this.storyForm = this._formBuilder.group({
      title: [this.story.title, Validators.required],
      description: [this.story.description]
    });
  }
}

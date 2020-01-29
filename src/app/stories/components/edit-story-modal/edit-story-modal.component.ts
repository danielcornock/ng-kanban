import { Component, OnInit, Inject } from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { IStory } from "../../interfaces/story.interface";
import { Validators, FormGroup } from "@angular/forms";
import { BoardRefreshService } from "src/app/boards/services/board-refresh/board-refresh.service";
import { IControlExport } from "src/app/shared/forms/interfaces/control-export.interface";
import { StoryApiService } from "../../services/story-api.service";
import { ITag } from "src/app/boards/interfaces/board-config.interface";
import { FormFactory } from "src/app/shared/forms/form-factory/form-factory.service";
import { FormContainer } from "src/app/shared/forms/form-container/form-container";
import { IFormInputConfig } from "src/app/shared/forms/interfaces/form-input-config.interface";
import { IFormInputFieldConfig } from "src/app/shared/forms/interfaces/form-input-field-config.interface";

@Component({
  selector: "app-edit-story-modal",
  templateUrl: "./edit-story-modal.component.html",
  styleUrls: ["./edit-story-modal.component.scss"]
})
export class EditStoryModalComponent
  extends ModalDialog<EditStoryModalComponent>
  implements OnInit {
  public story: IStory;
  public storyFormContainer: FormContainer;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<EditStoryModalComponent>,
    private readonly _httpService: HttpService,
    private readonly _formFactory: FormFactory,
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
    this.storyFormContainer = this._formFactory.createModelForm<IStory>(
      this.story,
      {
        fields: [
          this._createTitleFieldConfig(),
          this._createDescriptionFieldConfig()
        ]
      }
    );
  }

  private _createTitleFieldConfig(): IFormInputFieldConfig {
    return {
      name: "title",
      config: {
        required: true,
        setValue: (value: IControlExport) => {
          this.onInputChange(value);
        }
      }
    };
  }

  private _createDescriptionFieldConfig(): IFormInputFieldConfig {
    return {
      name: "description",
      config: {
        setValue: (value: IControlExport) => {
          this.onInputChange(value);
        }
      }
    };
  }
}

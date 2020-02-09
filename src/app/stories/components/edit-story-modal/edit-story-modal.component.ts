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
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";
import { ModelService } from "src/app/shared/api/model-service/model.service";

@Component({
  selector: "app-edit-story-modal",
  templateUrl: "./edit-story-modal.component.html",
  styleUrls: ["./edit-story-modal.component.scss"]
})
export class EditStoryModalComponent
  extends ModalDialog<EditStoryModalComponent>
  implements OnInit {
  public storyFormContainer: FormContainer;
  public storyModel: IHttpModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<EditStoryModalComponent>,
    private readonly _formFactory: FormFactory,
    private readonly _boardRefreshService: BoardRefreshService,
    private readonly _storyApiService: StoryApiService,
    private readonly _modelService: ModelService
  ) {
    super(matDialogRef, data);
  }

  async ngOnInit() {
    await this._fetchStory();
    this._buildform();
  }

  public onInputChange(event: IControlExport) {
    if (this.storyModel.data[event.name] === event.value) return;
    this.storyModel.data[event.name] = event.value;
    this._updateStory();
  }

  public addTagToStory(tag: ITag) {
    this.storyModel.data.tags.push(tag);
    this._updateStory();
  }

  public removeTag(index: number) {
    this.storyModel.data.tags.splice(index, 1);
    this._updateStory();
  }

  public async deleteStory(): Promise<void> {
    await this.storyModel.delete();
    this._storyApiService.deleteStorySubject.next({
      storyId: this.storyModel.data._id,
      columnId: this.dialogData.columnId
    });
    this.closeModal();
  }

  public async addCommitToStory(commit: any) {
    if (!commit) {
      this.storyModel.data.commit = null;
    } else {
      this.storyModel.data.commit = {
        id: commit.sha.slice(0, 7),
        message: commit.commit.message,
        author: commit.commit.author.name,
        url: commit.html_url
      };
    }

    await this.storyModel.update();
    this._boardRefreshService.boardListRefresh.next();
  }

  private async _updateStory(): Promise<void> {
    await this.storyModel.update();
    this._boardRefreshService.boardListRefresh.next();
  }

  private async _fetchStory(): Promise<void> {
    const model: IHttpModel = await this._modelService.get(
      `stories/${this.dialogData.storyId}`
    );

    this.storyModel = model;
  }

  private _buildform(): void {
    this.storyFormContainer = this._formFactory.createModelForm(
      this.storyModel,
      {
        fields: [
          this._createTitleFieldConfig(),
          this._createDescriptionFieldConfig()
        ]
      }
    );
  }

  private _createTitleFieldConfig(): IFormInputConfig {
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

  private _createDescriptionFieldConfig(): IFormInputConfig {
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

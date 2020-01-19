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

  private readonly _httpService: HttpService;
  private readonly _formBuilder: FormBuilder;
  private readonly _boardRefreshService: BoardRefreshService;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<EditStoryModalComponent>,
    httpService: HttpService,
    formBuilder: FormBuilder,
    boardRefreshService: BoardRefreshService
  ) {
    super(matDialogRef);
    this._httpService = httpService;
    this._formBuilder = formBuilder;
    this._boardRefreshService = boardRefreshService;
    this._formatData(data);
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
      title: [this.story.title, Validators.required]
    });
  }
}

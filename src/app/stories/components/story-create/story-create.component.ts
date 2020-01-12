import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { StoryApiService } from "../../services/story-api.service";

@Component({
  selector: "app-story-create",
  templateUrl: "./story-create.component.html",
  styleUrls: ["./story-create.component.scss"]
})
export class StoryCreateComponent implements OnInit {
  @Input() appStoryCreateColumnId: string;
  @Input() appStoryCreateBoardId: string;

  public storyForm: FormGroup;

  private readonly _formBuilder: FormBuilder;
  private readonly _storyApiService: StoryApiService;

  constructor(formBuilder: FormBuilder, storyApiService: StoryApiService) {
    this._formBuilder = formBuilder;
    this._storyApiService = storyApiService;
  }

  ngOnInit() {
    this._initialiseForm();
  }

  public async createStory(): Promise<void> {
    this._storyApiService.addNewStory(
      this.storyForm.value.title,
      this.appStoryCreateColumnId,
      this.appStoryCreateBoardId
    );
  }

  private _initialiseForm(): void {
    this.storyForm = this._formBuilder.group({
      title: ["", Validators.required]
    });
  }
}

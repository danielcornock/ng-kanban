import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StoryCreateComponent } from "./story-create.component";
import { FormBuilder } from "@angular/forms";
import { StoryApiServiceStub } from "../../services/story-api.service.stub";
import { StoryApiService } from "../../services/story-api.service";
import { SharedModule } from "src/app/shared/shared.module";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("StoryCreateComponent", () => {
  let component: StoryCreateComponent;
  let fixture: ComponentFixture<StoryCreateComponent>;
  let dependencies: {
    formBuilder: FormBuilder;
    storyApiService: StoryApiServiceStub;
  };

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css(".storyCreate-submit"));
  }

  beforeEach(async(() => {
    dependencies = {
      formBuilder: new FormBuilder(),
      storyApiService: new StoryApiServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [StoryCreateComponent],
      providers: [
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        { provide: StoryApiService, useValue: dependencies.storyApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const storyForm = dependencies.formBuilder.group({
      title: ""
    });
    spyOn(dependencies.formBuilder, "group").and.returnValue(storyForm);

    fixture = TestBed.createComponent(StoryCreateComponent);
    component = fixture.componentInstance;
    component.appStoryCreateColumnId = "columnId";
    component.appStoryCreateBoardId = "boardId";
    fixture.detectChanges();
  });

  describe("on initialisation", () => {
    it("should initialise the form", () => {
      expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
        title: ["", jasmine.any(Function)]
      });
    });
  });

  describe("when submitting the form", () => {
    beforeEach(() => {
      component.storyForm.value.title = "test-title";
      getSubmitButton().nativeElement.click();
    });

    it("should send the story to the API", () => {
      expect(dependencies.storyApiService.addNewStory).toHaveBeenCalledWith(
        "test-title",
        "columnId",
        "boardId"
      );
    });
  });
});

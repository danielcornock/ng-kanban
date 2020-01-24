import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { EditStoryModalComponent } from "./edit-story-modal.component";
import { MatDialogRefStub } from "src/app/shared/modal/modal-dialog/mat-dialog-ref.stub";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { FormInputTextareaComponentStub } from "src/app/shared/forms/form-input-textarea/form-input-textarea.component.stub";
import { FormBuilder, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { BoardRefreshServiceStub } from "src/app/boards/services/board-refresh/board-refresh.service.stub";
import { BoardRefreshService } from "src/app/boards/services/board-refresh/board-refresh.service";
import { IStory } from "../../interfaces/story.interface";
import { StoryApiServiceStub } from "../../services/story-api.service.stub";
import { StoryApiService } from "../../services/story-api.service";
import { TagsComponentStub } from "../tags/tags.component.stub";
import { SharedModule } from "src/app/shared/shared.module";

describe("EditStoryModalComponent", () => {
  let component: EditStoryModalComponent,
    fixture: ComponentFixture<EditStoryModalComponent>,
    mockForm: FormGroup,
    getStoryPromise: TestPromise<any>,
    dependencies: {
      dialogData: any;
      matDialogRef: MatDialogRefStub;
      httpService: HttpServiceStub;
      formBuilder: FormBuilder;
      boardRefreshService: BoardRefreshServiceStub;
      storyApiService: StoryApiServiceStub;
    };

  function getTags(): DebugElement {
    return fixture.debugElement.query(By.directive(TagsComponentStub));
  }

  function getStoryTitle(): DebugElement {
    return fixture.debugElement.query(
      By.directive(FormInputTextareaComponentStub)
    );
  }

  function getDeleteButton(): DebugElement {
    return fixture.debugElement.query(By.css(".editStoryModal-delete"));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          storyId: "test",
          columnId: "column-id"
        }
      },
      matDialogRef: new MatDialogRefStub(),
      httpService: new HttpServiceStub(),
      formBuilder: new FormBuilder(),
      boardRefreshService: new BoardRefreshServiceStub(),
      storyApiService: new StoryApiServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        EditStoryModalComponent,
        FormInputTextareaComponentStub,
        TagsComponentStub
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        { provide: HttpService, useValue: dependencies.httpService },
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        },
        {
          provide: StoryApiService,
          useValue: dependencies.storyApiService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockForm = dependencies.formBuilder.group({
      title: "",
      description: ""
    });
    spyOn(dependencies.formBuilder, "group").and.returnValue(mockForm);

    getStoryPromise = new TestPromise<any>();
    (dependencies.httpService.get as jasmine.Spy).and.returnValue(
      getStoryPromise.promise
    );

    fixture = TestBed.createComponent(EditStoryModalComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should request the story from the API", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith("stories/test");
    });

    describe("when the story is successfully fetched", () => {
      let mockStory: IStory;

      beforeEach(fakeAsync(() => {
        mockStory = {
          _id: "story-id",
          title: "story-title",
          storyNumber: 12,
          tags: [{ color: "#1", label: "#1" }]
        } as IStory;

        getStoryPromise.resolve({
          story: mockStory
        });

        tick();

        fixture.detectChanges();
      }));

      it("should build the form", () => {
        expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
          title: ["story-title", jasmine.any(Function)],
          description: [undefined]
        });
      });

      it("should pass the form config to the form input", () => {
        expect(getStoryTitle().componentInstance.parentForm).toBe(mockForm);
      });

      it("it should pass the tags to the tags component", () => {
        expect(getTags().componentInstance.appTags).toEqual([
          {
            color: "#1",
            label: "#1"
          }
        ]);
      });

      describe("when a new tag is selected", () => {
        beforeEach(() => {
          getTags().componentInstance.appTagsSelectedTag.emit({
            label: "#2",
            color: "#2"
          });
        });

        it("should update the story with the new tags", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "stories/story-id",
            {
              _id: "story-id",
              title: "story-title",
              storyNumber: 12,
              tags: [
                { color: "#1", label: "#1" },
                { color: "#2", label: "#2" }
              ]
            }
          );
        });
      });

      describe("when a tag is removed", () => {
        beforeEach(() => {
          getTags().componentInstance.appTagsDeletedTag.emit(0);
        });

        it("should update the story with the specified tag removed", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "stories/story-id",
            {
              _id: "story-id",
              title: "story-title",
              storyNumber: 12,
              tags: []
            }
          );
        });
      });

      describe("when the delete button is clicked", () => {
        let deleteStoryPromise: TestPromise<void>;

        beforeEach(() => {
          deleteStoryPromise = new TestPromise<void>();
          (dependencies.storyApiService
            .deleteStory as jasmine.Spy).and.returnValue(
            deleteStoryPromise.promise
          );

          getDeleteButton().nativeElement.click();
        });

        it("should delete the story", () => {
          expect(dependencies.storyApiService.deleteStory).toHaveBeenCalledWith(
            "story-id",
            "column-id"
          );
        });

        describe("when the story has been successfully deleted", () => {
          beforeEach(async(() => {
            deleteStoryPromise.resolve();
          }));

          it("should close the modal", () => {
            expect(dependencies.matDialogRef.close).toHaveBeenCalledWith(
              undefined
            );
          });
        });
      });

      describe("when the input for the title changes", () => {
        let putPromise: TestPromise<void>;

        beforeEach(() => {
          putPromise = new TestPromise<void>();

          (dependencies.httpService.put as jasmine.Spy).and.returnValue(
            putPromise.promise
          );

          getStoryTitle().componentInstance.setValue.emit({
            value: "new-story",
            name: "title"
          });
        });

        it("should update the story with the updated information", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "stories/story-id",
            {
              title: "new-story",
              storyNumber: 12,
              _id: "story-id",
              tags: [{ color: "#1", label: "#1" }]
            }
          );
        });

        describe("when the board has been successfully updated", () => {
          let boardRefreshSpy: jasmine.Spy;

          beforeEach(fakeAsync(() => {
            boardRefreshSpy = spyOn(
              dependencies.boardRefreshService.boardListRefresh,
              "next"
            );
            putPromise.resolve();
            tick();
            fixture.detectChanges();
          }));

          it("should refresh the board", () => {
            expect(boardRefreshSpy).toHaveBeenCalledWith();
          });
        });
      });
    });
  });
});

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
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { BoardRefreshServiceStub } from "src/app/boards/services/board-refresh/board-refresh.service.stub";
import { BoardRefreshService } from "src/app/boards/services/board-refresh/board-refresh.service";
import { IStory } from "../../interfaces/story.interface";
import { StoryApiServiceStub } from "../../services/story-api.service.stub";
import { StoryApiService } from "../../services/story-api.service";
import { TagsComponentStub } from "../tags/tags.component.stub";
import { FormFactoryStub } from "src/app/shared/forms/form-factory/form-factory.service.stub";
import { FormFactory } from "src/app/shared/forms/form-factory/form-factory.service";
import { IFormInputConfig } from "src/app/shared/forms/interfaces/form-input-config.interface";
import { FormContainerStub } from "src/app/shared/forms/form-container/form-container.stub";
import { FormInputField } from "src/app/shared/forms/form-input-field/form-input-field";

describe("EditStoryModalComponent", () => {
  let component: EditStoryModalComponent,
    fixture: ComponentFixture<EditStoryModalComponent>,
    formContainerStub: FormContainerStub,
    getStoryPromise: TestPromise<any>,
    dependencies: {
      dialogData: any;
      matDialogRef: MatDialogRefStub;
      httpService: HttpServiceStub;
      formFactory: FormFactoryStub;
      boardRefreshService: BoardRefreshServiceStub;
      storyApiService: StoryApiServiceStub;
    };

  function getTags(): DebugElement {
    return fixture.debugElement.query(By.css(".editStoryModal-tags"));
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
      formFactory: new FormFactoryStub(),
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
        { provide: FormFactory, useValue: dependencies.formFactory },
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
    getStoryPromise = new TestPromise<any>();
    (dependencies.httpService.get as jasmine.Spy).and.returnValue(
      getStoryPromise.promise
    );

    fixture = TestBed.createComponent(EditStoryModalComponent);
    component = fixture.componentInstance;

    formContainerStub = new FormContainerStub();
    formContainerStub.fields.title = ("title" as unknown) as FormInputField;
    formContainerStub.fields.description = ("description" as unknown) as FormInputField;
    (dependencies.formFactory.createModelForm as jasmine.Spy).and.returnValue(
      formContainerStub
    );
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

      it("it should pass the tags to the tags component", () => {
        expect(getTags().componentInstance.appTags).toEqual([
          {
            color: "#1",
            label: "#1"
          }
        ]);
      });

      describe("when building the form", () => {
        it("should create the form", () => {
          expect(dependencies.formFactory.createModelForm).toHaveBeenCalledWith(
            mockStory,
            {
              fields: [
                {
                  name: "title",
                  config: {
                    setValue: jasmine.any(Function),
                    required: true
                  }
                },
                {
                  name: "description",
                  config: {
                    setValue: jasmine.any(Function)
                  }
                }
              ]
            }
          );
        });
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
        });

        describe("when it is the same as the stored value", () => {
          beforeEach(() => {
            console.log(
              (dependencies.formFactory
                .createModelForm as jasmine.Spy).calls.argsFor(0)[1][0]
            );
            (dependencies.formFactory.createModelForm as jasmine.Spy).calls
              .argsFor(0)[1]
              .fields[0].config.setValue({
                value: "story-title",
                name: "title"
              });
          });

          it("should not update the story", () => {
            expect(dependencies.httpService.put).not.toHaveBeenCalled();
          });
        });

        describe("when it is different from the stored value", () => {
          beforeEach(() => {
            (dependencies.formFactory.createModelForm as jasmine.Spy).calls
              .argsFor(0)[1]
              .fields[0].config.setValue({
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

      describe("when the input for the description changes", () => {
        let putPromise: TestPromise<void>;
        beforeEach(() => {
          putPromise = new TestPromise<void>();
          (dependencies.httpService.put as jasmine.Spy).and.returnValue(
            putPromise.promise
          );

          (dependencies.formFactory.createModelForm as jasmine.Spy).calls
            .argsFor(0)[1]
            .fields[1].config.setValue({
              value: "new-description",
              name: "description"
            });
        });

        it("should update the story", () => {
          expect(dependencies.httpService.put).toHaveBeenCalled();
        });
      });
    });
  });
});

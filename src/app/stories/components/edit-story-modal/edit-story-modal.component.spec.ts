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
    };

  function getStoryTitle(): DebugElement {
    return fixture.debugElement.query(
      By.directive(FormInputTextareaComponentStub)
    );
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          storyId: "test"
        }
      },
      matDialogRef: new MatDialogRefStub(),
      httpService: new HttpServiceStub(),
      formBuilder: new FormBuilder(),
      boardRefreshService: new BoardRefreshServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EditStoryModalComponent, FormInputTextareaComponentStub],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        { provide: HttpService, useValue: dependencies.httpService },
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockForm = dependencies.formBuilder.group({
      title: ""
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
          storyNumber: 12
        };
        getStoryPromise.resolve({
          story: mockStory
        });

        tick();

        fixture.detectChanges();
      }));

      it("should build the form", () => {
        expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
          title: ["story-title", jasmine.any(Function)]
        });
      });

      it("should pass the form config to the form input", () => {
        expect(getStoryTitle().componentInstance.parentForm).toBe(mockForm);
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
              _id: "story-id"
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

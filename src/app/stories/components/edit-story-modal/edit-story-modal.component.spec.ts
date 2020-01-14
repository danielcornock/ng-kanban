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

describe("EditStoryModalComponent", () => {
  let component: EditStoryModalComponent;
  let fixture: ComponentFixture<EditStoryModalComponent>;
  let dependencies: {
    dialogData: any;
    matDialogRef: MatDialogRefStub;
    httpService: HttpServiceStub;
  };

  function getStoryTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".editStoryModal-title"));
  }

  function getStoryNumber(): DebugElement {
    return fixture.debugElement.query(By.css(".editStoryModal-storyNumber"));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          storyId: "test"
        }
      },
      matDialogRef: new MatDialogRefStub(),
      httpService: new HttpServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [EditStoryModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        { provide: HttpService, useValue: dependencies.httpService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoryModalComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    let getStoryPromise: TestPromise<any>;

    beforeEach(() => {
      getStoryPromise = new TestPromise<any>();
      (dependencies.httpService.get as jasmine.Spy).and.returnValue(
        getStoryPromise.promise
      );
      fixture.detectChanges();
    });

    it("should request the story from the API", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith("stories/test");
    });

    describe("when the story is successfully fetched", () => {
      beforeEach(fakeAsync(() => {
        getStoryPromise.resolve({
          story: {
            title: "story-title",
            storyNumber: 12
          }
        });

        tick();

        fixture.detectChanges();
      }));

      it("should display the story in the template", () => {
        expect(getStoryTitle().nativeElement.innerText).toBe("story-title");
        expect(getStoryNumber().nativeElement.innerText).toBe("#12");
      });
    });
  });
});

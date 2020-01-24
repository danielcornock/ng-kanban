import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { TagsModalComponent } from "./tags-modal.component";
import { MatDialogRefStub } from "src/app/shared/modal/modal-dialog/mat-dialog-ref.stub";
import { BoardConfigStoreServiceStub } from "src/app/boards/services/board-config-store/board-config-store.service.stub";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";
import { BehaviorSubject } from "rxjs";
import {
  IBoardConfig,
  ITag
} from "src/app/boards/interfaces/board-config.interface";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("TagsModalComponent", () => {
  let component: TagsModalComponent;
  let fixture: ComponentFixture<TagsModalComponent>;
  let dependencies: {
    dialogData: any;
    matDialogRef: MatDialogRefStub;
    boardConfigStoreService: BoardConfigStoreServiceStub;
  };

  const allTags: Array<ITag> = [
    {
      color: "#1",
      label: "#1"
    },
    {
      color: "#2",
      label: undefined
    }
  ];

  function getTags(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".tagsModal-tag"));
  }

  function getTagsColor(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".tagsModal-color"));
  }

  function getTagsText(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".tagsModal-colorText"));
  }

  function getTagsInput(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".tagsModal-input"));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {}
      },
      matDialogRef: new MatDialogRefStub(),
      boardConfigStoreService: new BoardConfigStoreServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [TagsModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        {
          provide: BoardConfigStoreService,
          useValue: dependencies.boardConfigStoreService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsModalComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    const getConfigSubject: BehaviorSubject<Partial<
      IBoardConfig
    >> = new BehaviorSubject({ tags: allTags });

    beforeEach(async () => {
      (dependencies.boardConfigStoreService
        .getConfig as jasmine.Spy).and.returnValue(
        getConfigSubject.asObservable()
      );

      await fixture.whenStable();
      fixture.detectChanges();
    });

    it("should subscribe to global config changes", () => {
      expect(
        dependencies.boardConfigStoreService.getConfig
      ).toHaveBeenCalledWith();
    });

    it("should display the tags", () => {
      expect(getTagsText()[0].nativeElement.innerText).toBe("#1");
      expect(getTagsInput()[0].nativeElement.value).toBe("#1");
      expect(getTagsText()[1].nativeElement.innerText).toBe("");
    });

    describe("when a tag is clicked", () => {
      beforeEach(() => {
        getTagsColor()[0].nativeElement.click();
        fixture.detectChanges();
      });

      it("should remove the label from the specified tag", () => {
        expect(component.tags[0].label).toBe("");
      });
    });

    describe("when the input is blurred", () => {
      beforeEach(() => {
        getTagsInput()[0].triggerEventHandler("keyup", {
          target: { value: "new-label" }
        });
      });

      fit("should update the label for that tag", () => {
        expect(component.tags[0].label).toBe("new-label");
      });
    });
  });
});

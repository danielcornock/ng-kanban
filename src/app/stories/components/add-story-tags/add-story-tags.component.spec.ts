import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddStoryTagsComponent } from "./add-story-tags.component";
import { BoardConfigStoreServiceStub } from "src/app/boards/services/board-config-store/board-config-store.service.stub";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";
import { IBoardConfig } from "src/app/boards/interfaces/board-config.interface";
import { BehaviorSubject } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("AddStoryTagsComponent", () => {
  let component: AddStoryTagsComponent,
    fixture: ComponentFixture<AddStoryTagsComponent>,
    dependencies: {
      boardConfigStoreService: BoardConfigStoreServiceStub;
    };

  function getTags(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".addStoryTags-tag"));
  }

  beforeEach(async(() => {
    dependencies = {
      boardConfigStoreService: new BoardConfigStoreServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [AddStoryTagsComponent],
      providers: [
        {
          provide: BoardConfigStoreService,
          useValue: dependencies.boardConfigStoreService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryTagsComponent);
    component = fixture.componentInstance;

    const getConfigSubject: BehaviorSubject<Partial<
      IBoardConfig
    >> = new BehaviorSubject({
      tags: [
        { color: "#1", label: "#1" },
        { color: "#2", label: "#2" }
      ]
    });

    (dependencies.boardConfigStoreService
      .getConfig as jasmine.Spy).and.returnValue(
      getConfigSubject.asObservable()
    );
  });

  describe("on initialisation", () => {
    let tags: Array<DebugElement>;

    beforeEach(() => {
      component.appAddStoryTagsExistingTags = [{ color: "#1", label: "#1" }];

      fixture.detectChanges();

      tags = getTags();
    });

    it("should get the config", () => {
      expect(
        dependencies.boardConfigStoreService.getConfig
      ).toHaveBeenCalledWith();
    });

    it("should display the filtered tags", () => {
      expect(tags.length).toBe(1);
      expect(tags[0].nativeElement.innerText).toBe("#2");
    });

    describe("when a tag is clicked", () => {
      beforeEach(() => {
        spyOn(component.appAddStoryTagsSelectedTag, "emit");
        tags[0].nativeElement.click();
      });

      it("should emit the selected tag", () => {
        expect(component.appAddStoryTagsSelectedTag.emit).toHaveBeenCalledWith({
          color: "#2",
          label: "#2"
        });
      });
    });
  });
});

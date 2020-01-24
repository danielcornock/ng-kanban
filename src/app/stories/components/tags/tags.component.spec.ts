import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TagsComponent } from "./tags.component";
import { AddStoryTagsComponentStub } from "../add-story-tags/add-story-tags.component.stub";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("TagsComponent", () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  function getAddTagsComponent(): DebugElement {
    return fixture.debugElement.query(By.directive(AddStoryTagsComponentStub));
  }

  function getAddNewButton(): DebugElement {
    return fixture.debugElement.query(By.css(".tags-addNew"));
  }

  function getActiveTags(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".tags-tag"));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagsComponent, AddStoryTagsComponentStub]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      component.appTags = [{ label: "#1", color: "#1" }];
      fixture.detectChanges();
    });

    it("should display the active tags", () => {
      expect(getActiveTags()[0].nativeElement.innerText).toBe("#1");
    });

    it("should display the add new button", () => {
      expect(getAddNewButton().nativeElement.innerText).toBe("+ Add new tag");
    });

    describe("when an active tag is clicked", () => {
      beforeEach(() => {
        spyOn(component.appTagsDeletedTag, "emit");
        getActiveTags()[0].nativeElement.click();
      });

      it("should emit the index of the removed tag", () => {
        expect(component.appTagsDeletedTag.emit).toHaveBeenCalledWith(0);
      });
    });

    describe("when the add new button is clicked", () => {
      beforeEach(() => {
        getAddNewButton().nativeElement.click();
        fixture.detectChanges();
      });

      it("should change the button text", () => {
        expect(getAddNewButton().nativeElement.innerText).toBe("Done");
      });

      it("should display the add tags component", () => {
        expect(
          getAddTagsComponent().componentInstance.appAddStoryTagsExistingTags
        ).toEqual([{ label: "#1", color: "#1" }]);
      });

      describe("when a new tag is selected", () => {
        beforeEach(() => {
          spyOn(component.appTagsSelectedTag, "emit");
          getAddTagsComponent().componentInstance.appAddStoryTagsSelectedTag.emit(
            { label: "#2", color: "#2" }
          );
        });

        it("should emit the new tag", () => {
          expect(component.appTagsSelectedTag.emit).toHaveBeenCalledWith({
            label: "#2",
            color: "#2"
          });
        });
      });
    });
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StoryComponent } from "./story.component";
import { IStory } from "../../interfaces/story.interface";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("StoryComponent", () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".story-title"));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      component.appStory = {
        title: "story-title"
      } as IStory;

      fixture.detectChanges();
    });

    it("should render the title", () => {
      expect(getTitle().nativeElement.innerText).toBe("story-title");
    });
  });
});

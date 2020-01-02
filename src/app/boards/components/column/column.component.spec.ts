import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnComponent } from "./column.component";
import { StoryComponentStub } from "../../../stories/components/story/story.component.stub";
import { StoryCreateComponentStub } from "src/app/stories/components/story-create/story-create.component.stub";
import { StoriesModule } from "src/app/stories/stories.module";
import { IStory } from "src/app/stories/interfaces/story.interface";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ColumnComponent", () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let testStory: Partial<IStory>;

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".column-title"));
  }

  function getStories(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(StoryComponentStub));
  }

  function getStoriesCreate(): DebugElement {
    return fixture.debugElement.query(By.directive(StoryCreateComponentStub));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColumnComponent,
        StoryCreateComponentStub,
        StoryComponentStub
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    testStory = {
      title: "test-story"
    };

    component.appColumn = {
      title: "column-title",
      _id: "column-id",
      stories: [testStory as IStory]
    };
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should display the column title", () => {
      expect(getTitle().nativeElement.innerText).toBe("column-title");
    });

    it("should display the stories", () => {
      expect(getStories()[0].componentInstance.appStory).toBe(testStory);
    });

    it("should pass the column id to the story create component", () => {
      expect(getStoriesCreate().componentInstance.appStoryCreateColumnId).toBe(
        "column-id"
      );
    });
  });

  describe("when there are no stories to display", () => {
    beforeEach(() => {
      component.appColumn.stories = [];
      fixture.detectChanges();
    });

    it("should not show any stories", () => {
      expect(getStories().length).toBe(0);
    });
  });
});

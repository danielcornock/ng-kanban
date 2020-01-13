import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StoryComponent } from "./story.component";
import { IStory } from "../../interfaces/story.interface";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ModalServiceStub } from "src/app/shared/modal/modal-service/modal.service.stub";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { EditStoryModalComponent } from "../edit-story-modal/edit-story-modal.component";

describe("StoryComponent", () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let dependencies: {
    modalService: ModalServiceStub;
  };

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".story-title"));
  }

  function getOpenModalButton(): DebugElement {
    return fixture.debugElement.query(By.css(".story-container"));
  }

  beforeEach(async(() => {
    dependencies = {
      modalService: new ModalServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [StoryComponent],
      providers: [
        { provide: ModalService, useValue: dependencies.modalService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      component.appStory = {
        title: "story-title",
        _id: "story-id",
        storyNumber: 5
      } as IStory;

      fixture.detectChanges();
    });

    it("should render the title", () => {
      expect(getTitle().nativeElement.innerText).toBe("story-title");
    });

    it("should render the story number", () => {
      const storyNumber = fixture.debugElement.query(
        By.css(".story-storyNumber")
      );

      expect(storyNumber.nativeElement.innerText).toBe("#5");
    });

    describe("when the story is clicked on", () => {
      beforeEach(() => {
        getOpenModalButton().nativeElement.click();
      });

      it("should call the service to open the edit story modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          EditStoryModalComponent,
          {
            storyId: "story-id"
          }
        );
      });
    });
  });
});

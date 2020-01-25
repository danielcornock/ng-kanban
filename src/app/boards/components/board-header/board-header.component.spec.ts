import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardHeaderComponent } from "./board-header.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TagsModalComponent } from "src/app/stories/components/tags-modal/tags-modal.component";
import { ModalServiceStub } from "src/app/shared/modal/modal-service/modal.service.stub";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { IconComponentStub } from "../../../icons/icon/icon.component.stub";

describe("BoardHeaderComponent", () => {
  let component: BoardHeaderComponent;
  let fixture: ComponentFixture<BoardHeaderComponent>;
  let dependencies: {
    modalService: ModalServiceStub;
  };

  function getTagsButton(): DebugElement {
    return fixture.debugElement.query(By.css(".boardHeader-tags"));
  }

  function getBoardTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".boardHeader-title"));
  }

  beforeEach(async(() => {
    dependencies = {
      modalService: new ModalServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [BoardHeaderComponent, IconComponentStub],
      providers: [
        { provide: ModalService, useValue: dependencies.modalService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    component.appBoardHeaderTitle = "Test board";
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should display the board title", () => {
      expect(getBoardTitle().nativeElement.innerText).toBe("Test board");
    });

    describe("when the open tags button is clicked", () => {
      beforeEach(() => {
        getTagsButton().nativeElement.click();
      });

      it("should open the tags modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          TagsModalComponent,
          {}
        );
      });
    });
  });
});

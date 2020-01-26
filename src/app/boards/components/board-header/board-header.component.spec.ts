import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardHeaderComponent } from "./board-header.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TagsModalComponent } from "src/app/stories/components/tags-modal/tags-modal.component";
import { ModalServiceStub } from "src/app/shared/modal/modal-service/modal.service.stub";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { IconComponentStub } from "../../../icons/icon/icon.component.stub";
import { GetElement } from "src/app/testing/get-element/get-element";
import { GithubConfigModalComponent } from "../github-config-modal/github-config-modal.component";

describe("BoardHeaderComponent", () => {
  let component: BoardHeaderComponent,
    fixture: ComponentFixture<BoardHeaderComponent>,
    getElement: GetElement<BoardHeaderComponent>,
    dependencies: {
      modalService: ModalServiceStub;
    };

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
    getElement = new GetElement(fixture, "boardHeader");
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should display the board title", () => {
      expect(getElement.byCss("title").nativeElement.innerText).toBe(
        "Test board"
      );
    });

    describe("when the open tags button is clicked", () => {
      beforeEach(() => {
        getElement.byCss("tags").nativeElement.click();
      });

      it("should open the tags modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          TagsModalComponent,
          {}
        );
      });
    });

    describe("when the github button is clicked", () => {
      beforeEach(() => {
        getElement.byCss("github").nativeElement.click();
      });

      it("should open the github modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          GithubConfigModalComponent,
          {}
        );
      });
    });
  });
});

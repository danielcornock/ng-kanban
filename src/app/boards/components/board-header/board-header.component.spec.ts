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
import { BoardConfigStoreServiceStub } from "../../services/board-config-store/board-config-store.service.stub";
import { BoardConfigStoreService } from "../../services/board-config-store/board-config-store.service";
import { Subject } from "rxjs";
import { HttpModelStub } from "src/app/shared/api/http-model/http-model.stub";

describe("BoardHeaderComponent", () => {
  let component: BoardHeaderComponent,
    fixture: ComponentFixture<BoardHeaderComponent>,
    getElement: GetElement<BoardHeaderComponent>,
    dependencies: {
      modalService: ModalServiceStub;
      boardConfigStoreService: BoardConfigStoreServiceStub;
    };

  beforeEach(async(() => {
    dependencies = {
      modalService: new ModalServiceStub(),
      boardConfigStoreService: new BoardConfigStoreServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [BoardHeaderComponent, IconComponentStub],
      providers: [
        { provide: ModalService, useValue: dependencies.modalService },
        {
          provide: BoardConfigStoreService,
          useValue: dependencies.boardConfigStoreService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    component.appBoardHeaderTitle = "Test board";

    const boardModel = new HttpModelStub();
    boardModel.data.config = {
      repos: "hi"
    };

    component.appBoardHeaderBoardModel = boardModel;
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
      let onCloseSubject: Subject<any>;

      beforeEach(() => {
        onCloseSubject = new Subject();
        (dependencies.modalService.openModal as jasmine.Spy).and.returnValue({
          afterClosed: jasmine
            .createSpy()
            .and.returnValue(onCloseSubject.asObservable())
        });
        getElement.byCss("github").nativeElement.click();
      });

      it("should open the github modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          GithubConfigModalComponent,
          {
            repos: component.appBoardHeaderBoardModel.data.config.repos
          }
        );
      });

      describe("when the modal is closed", () => {
        beforeEach(() => {
          onCloseSubject.next({ selectedRepos: "newRepos" });
        });

        it("should save the config to the board", () => {
          expect(
            dependencies.boardConfigStoreService.saveConfig
          ).toHaveBeenCalledWith({ repos: "newRepos" });
        });
      });
    });
  });
});

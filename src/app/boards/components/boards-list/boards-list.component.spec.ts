import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardsListComponent } from "./boards-list.component";
import { BoardCreateComponentStub } from "../board-create/board-create.component.stub";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { BoardRefreshServiceStub } from "../../services/board-refresh/board-refresh.service.stub";
import { RouterService } from "src/app/shared/router/router.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { BoardRefreshService } from "../../services/board-refresh/board-refresh.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("BoardsListComponent", () => {
  let component: BoardsListComponent;
  let fixture: ComponentFixture<BoardsListComponent>;
  let dependencies: {
    routerService: RouterServiceStub;
    httpService: HttpServiceStub;
    boardRefreshService: BoardRefreshServiceStub;
  };

  function getBoardButtons(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".boardsList-board"));
  }

  beforeEach(async(() => {
    dependencies = {
      routerService: new RouterServiceStub(),
      httpService: new HttpServiceStub(),
      boardRefreshService: new BoardRefreshServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [BoardsListComponent, BoardCreateComponentStub],
      providers: [
        { provide: RouterService, useValue: dependencies.routerService },
        {
          provide: HttpService,
          useValue: dependencies.httpService
        },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    (dependencies.httpService.get as jasmine.Spy).and.returnValue(
      Promise.resolve({
        boards: [{ title: "test-board" }]
      })
    );

    fixture = TestBed.createComponent(BoardsListComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should fetch the board list", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith("boards/list");
    });

    describe("when the boards have been fetched successfully", () => {
      beforeEach(() => {
        component.boardList = [{ _id: "board-id", title: "test-board" }];
        fixture.detectChanges();
      });

      it("should display the boards that were fetched", () => {
        //TODO - make this test responsive to the promise
        expect(getBoardButtons()[0].nativeElement.innerText).toBe("test-board");
      });

      describe("when selecting a board", () => {
        beforeEach(() => {
          getBoardButtons()[0].nativeElement.click();
        });

        it("should navigate to that boards page", () => {
          expect(dependencies.routerService.navigate).toHaveBeenCalledWith(
            "boards/board-id"
          );
        });
      });
    });

    describe("when subscribing to a new board", () => {
      beforeEach(() => {
        (dependencies.httpService.get as jasmine.Spy).and.returnValue(
          Promise.resolve({
            boards: [{ title: "updated-board" }]
          })
        );
        dependencies.boardRefreshService.boardListRefresh.next();
      });

      it("should fetch the new board list", () => {
        expect(dependencies.httpService.get).toHaveBeenCalledWith(
          "boards/list"
        );
      });

      it("should update the list", () => {
        //TODO - make this test work
      });
    });
  });
});

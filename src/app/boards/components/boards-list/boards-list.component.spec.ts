import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

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
import { TestPromise } from "src/app/testing/test-promise/test-promise";

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
    fixture = TestBed.createComponent(BoardsListComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    let getPromise: TestPromise<any>;
    beforeEach(() => {
      getPromise = new TestPromise<any>();
      (dependencies.httpService.get as jasmine.Spy).and.returnValue(
        getPromise.promise
      );
      fixture.detectChanges();
    });

    it("should fetch the board list", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith("boards/list");
    });

    describe("when the boards have been fetched successfully", () => {
      beforeEach(fakeAsync(() => {
        getPromise.resolve({
          boards: [{ _id: "board-id", title: "test-board" }]
        });

        tick();
        fixture.detectChanges();
      }));

      it("should display the boards that were fetched", () => {
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
      let refreshPromise: TestPromise<any>;

      beforeEach(() => {
        refreshPromise = new TestPromise<any>();
        (dependencies.httpService.get as jasmine.Spy).and.returnValue(
          refreshPromise.promise
        );
        dependencies.boardRefreshService.boardListRefresh.next();
      });

      it("should fetch the new board list", () => {
        expect(dependencies.httpService.get).toHaveBeenCalledWith(
          "boards/list"
        );
      });

      describe("when the new board list has been fetched", () => {
        beforeEach(fakeAsync(() => {
          refreshPromise.resolve({
            boards: [{ title: "updated-board" }]
          });

          tick();

          fixture.detectChanges();
        }));

        it("should update the list", () => {
          expect(getBoardButtons()[0].nativeElement.innerText).toBe(
            "updated-board"
          );
        });
      });
    });
  });
});

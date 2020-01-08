import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { BoardComponent } from "./board.component";
import { ColumnComponentStub } from "../../components/column/column.component.stub";
import { ColumnCreateComponentStub } from "../../components/column-create/column-create.component.stub";
import { RouterService } from "src/app/shared/router/router.service";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { StoryApiServiceStub } from "src/app/stories/services/story-api.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { StoryApiService } from "src/app/stories/services/story-api.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { BoardApiServiceStub } from "../../services/board-api/board-api.service.stub";
import { BoardApiService } from "../../services/board-api/board-api.service";

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let dependencies: {
    routerService: RouterServiceStub;
    httpService: HttpServiceStub;
    storyApiService: StoryApiServiceStub;
    boardApiService: BoardApiServiceStub;
  };

  function getColumnCreate(): DebugElement {
    return fixture.debugElement.query(By.directive(ColumnCreateComponentStub));
  }

  function getColumns(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(ColumnComponentStub));
  }

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".board-title"));
  }

  beforeEach(async(() => {
    dependencies = {
      routerService: new RouterServiceStub(),
      httpService: new HttpServiceStub(),
      storyApiService: new StoryApiServiceStub(),
      boardApiService: new BoardApiServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        ColumnComponentStub,
        ColumnCreateComponentStub
      ],
      providers: [
        { provide: RouterService, useValue: dependencies.routerService },
        { provide: HttpService, useValue: dependencies.httpService },
        { provide: StoryApiService, useValue: dependencies.storyApiService },
        { provide: BoardApiService, useValue: dependencies.boardApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    let getBoardPromise: TestPromise<any>;

    beforeEach(async(() => {
      getBoardPromise = new TestPromise<any>();

      (dependencies.routerService.getUrlParams as jasmine.Spy).and.returnValue(
        "testBoardId"
      );

      (dependencies.boardApiService.fetchBoard as jasmine.Spy).and.returnValue(
        getBoardPromise.promise
      );
    }));

    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should get the board id from the url", () => {
      expect(dependencies.routerService.getUrlParams).toHaveBeenCalledWith(
        "boardId"
      );
    });

    it("should fetch the board from the API", () => {
      expect(dependencies.boardApiService.fetchBoard).toHaveBeenCalledWith(
        "testBoardId"
      );
    });

    describe("when the data has been fetched", () => {
      beforeEach(fakeAsync(() => {
        getBoardPromise.resolve({
          title: "testBoard",
          columns: [
            {
              _id: "col1-id",
              title: "column1",
              stories: []
            },
            {
              _id: "col2-id",
              title: "column2"
            }
          ]
        });

        tick();

        fixture.detectChanges();
      }));

      it("should display the columns", () => {
        expect(getColumns().length).toBe(2);
        expect(getColumns()[0].componentInstance.appColumn).toEqual({
          _id: "col1-id",
          title: "column1",
          stories: []
        });
        expect(getColumns()[1].componentInstance.appColumn).toEqual({
          _id: "col2-id",
          title: "column2"
        });
      });

      describe("when a new column is added", () => {
        let putBoardPromise: TestPromise<any>;

        beforeEach(() => {
          putBoardPromise = new TestPromise<any>();

          (dependencies.httpService.put as jasmine.Spy).and.returnValue(
            putBoardPromise.promise
          );

          getColumnCreate().componentInstance.appColumnCreateOnCreate.emit(
            "new-column"
          );
        });

        it("should update the board in the API", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "boards/testBoardId",
            {
              title: "testBoard",
              columns: [
                {
                  _id: "col1-id",
                  title: "column1",
                  stories: []
                },
                {
                  _id: "col2-id",
                  title: "column2"
                },
                {
                  title: "new-column"
                }
              ]
            }
          );
        });

        describe("when the board has been successfully updated", () => {
          let refreshBoardPromise: TestPromise<any>;

          beforeEach(() => {
            refreshBoardPromise = new TestPromise<any>();

            (dependencies.boardApiService
              .fetchBoard as jasmine.Spy).and.returnValue(
              refreshBoardPromise.promise
            );

            putBoardPromise.resolve();
          });

          it("should refresh the board", () => {
            expect(
              dependencies.boardApiService.fetchBoard
            ).toHaveBeenCalledWith("testBoardId");
          });

          describe("when the board has successfully refreshed", () => {
            beforeEach(fakeAsync(() => {
              refreshBoardPromise.resolve({
                title: "testBoard",
                columns: [
                  {
                    _id: "col1-id",
                    title: "column1"
                  },
                  {
                    _id: "col2-id",
                    title: "column2"
                  },
                  {
                    _id: "col3-id",
                    title: "new-column"
                  }
                ]
              });

              tick();

              fixture.detectChanges();
            }));

            it("should render the new columns", () => {
              expect(getColumns()[2].componentInstance.appColumn).toEqual({
                title: "new-column"
              });
            });
          });
        });
      });

      describe("when a new story is added", () => {
        beforeEach(() => {
          dependencies.storyApiService.updateBoardSubject.next({
            columnId: "col1-id",
            storyId: "storyId"
          });
        });

        it("should save the board", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "boards/testBoardId",
            {
              title: "testBoard",
              columns: [
                {
                  _id: "col1-id",
                  title: "column1",
                  stories: ["storyId"]
                },
                {
                  _id: "col2-id",
                  title: "column2"
                }
              ]
            }
          );
        });
      });
    });
  });
});

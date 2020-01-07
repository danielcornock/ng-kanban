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

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let dependencies: {
    routerService: RouterServiceStub;
    httpService: HttpServiceStub;
    storyApiService: StoryApiServiceStub;
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
      storyApiService: new StoryApiServiceStub()
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
        { provide: StoryApiService, useValue: dependencies.storyApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(async(() => {
      (dependencies.routerService.getUrlParams as jasmine.Spy).and.returnValue(
        "testBoardId"
      );

      (dependencies.httpService.get as jasmine.Spy).and.returnValue(
        Promise.resolve({
          board: {
            title: "testBoard",
            columns: [
              {
                title: "column1"
              },
              {
                title: "column2"
              }
            ]
          }
        })
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
      expect(dependencies.httpService.get).toHaveBeenCalledWith(
        "boards/testBoardId"
      );
    });

    describe("when the data has been fetched", () => {
      beforeEach(() => {
        component.board = {
          title: "testBoard",
          columns: [
            {
              title: "column1"
            }
          ]
        };

        fixture.detectChanges();
      });

      it("should display the title", () => {
        expect(getTitle() === null).toBe(false);
      });

      it("should display the columns", () => {
        expect(getColumns().length).toBe(1);
        expect(getColumns()[0].componentInstance.appColumn).toEqual({
          title: "column1"
        });
      });

      describe("when a new column is added", () => {
        beforeEach(() => {
          (dependencies.httpService.put as jasmine.Spy).and.returnValue(
            Promise.resolve({
              title: "testBoard",
              columns: [
                {
                  title: "column1"
                },
                {
                  title: "column2"
                }
              ]
            })
          );

          getColumnCreate().componentInstance.appColumnCreateOnCreate.emit(
            "newColumn"
          );
        });

        it("should update the board in the API", () => {
          expect(dependencies.httpService.put).toHaveBeenCalledWith(
            "boards/testBoardId",
            {
              title: "testBoard",
              columns: [
                {
                  title: "column1"
                },
                {
                  title: "newColumn"
                }
              ]
            }
          );
        });
      });
    });
  });
});

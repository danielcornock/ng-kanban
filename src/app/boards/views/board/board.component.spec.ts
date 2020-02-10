import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { ColumnComponentStub } from '../../components/column/column.component.stub';
import { ColumnCreateComponentStub } from '../../components/column-create/column-create.component.stub';
import { RouterService } from 'src/app/shared/router/router.service';
import { RouterServiceStub } from 'src/app/shared/router/router.service.stub';
import { StoryApiServiceStub } from 'src/app/stories/services/story-api.service.stub';
import { StoryApiService } from 'src/app/stories/services/story-api.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestPromise } from 'src/app/testing/test-promise/test-promise';
import { BoardApiServiceStub } from '../../services/board-api/board-api.service.stub';
import { BoardApiService } from '../../services/board-api/board-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IBoard } from '../../interfaces/board.interface';
import { BoardRefreshServiceStub } from '../../services/board-refresh/board-refresh.service.stub';
import { BoardRefreshService } from '../../services/board-refresh/board-refresh.service';
import { IStory } from 'src/app/stories/interfaces/story.interface';
import { BoardHeaderComponentStub } from '../../components/board-header/board-header.component.stub';
import { BoardConfigStoreServiceStub } from '../../services/board-config-store/board-config-store.service.stub';
import { BoardConfigStoreService } from '../../services/board-config-store/board-config-store.service';
import { IHttpModel } from 'src/app/shared/api/http-model/http-model.interface';
import { HttpModelStub } from 'src/app/shared/api/http-model/http-model.stub';
import { Subject } from 'rxjs';
import { ModelStatus } from 'src/app/shared/api/http-model/constants/model-status';

describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let dependencies: {
    routerService: RouterServiceStub;
    storyApiService: StoryApiServiceStub;
    boardApiService: BoardApiServiceStub;
    boardRefreshService: BoardRefreshServiceStub;
    boardConfigStoreService: BoardConfigStoreServiceStub;
  };

  function getColumnCreate(): DebugElement {
    return fixture.debugElement.query(By.directive(ColumnCreateComponentStub));
  }

  function getColumns(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(ColumnComponentStub));
  }

  function getHeader(): DebugElement {
    return fixture.debugElement.query(By.directive(BoardHeaderComponentStub));
  }

  beforeEach(async(() => {
    dependencies = {
      routerService: new RouterServiceStub(),
      storyApiService: new StoryApiServiceStub(),
      boardApiService: new BoardApiServiceStub(),
      boardRefreshService: new BoardRefreshServiceStub(),
      boardConfigStoreService: new BoardConfigStoreServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        BoardComponent,
        ColumnComponentStub,
        ColumnCreateComponentStub,
        BoardHeaderComponentStub
      ],
      providers: [
        { provide: RouterService, useValue: dependencies.routerService },
        {
          provide: BoardConfigStoreService,
          useValue: dependencies.boardConfigStoreService
        },
        { provide: StoryApiService, useValue: dependencies.storyApiService },
        { provide: BoardApiService, useValue: dependencies.boardApiService },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
  });

  describe('on initialisation', () => {
    let getBoardPromise: TestPromise<any>;

    beforeEach(() => {
      getBoardPromise = new TestPromise<any>();

      (dependencies.routerService.getUrlParams as jasmine.Spy).and.returnValue(
        'testBoardId'
      );

      (dependencies.boardApiService.fetchBoard as jasmine.Spy).and.returnValue(
        getBoardPromise.promise
      );

      fixture.detectChanges();
    });

    it('should get the board id from the url', () => {
      expect(dependencies.routerService.getUrlParams).toHaveBeenCalledWith(
        'boardId'
      );
    });

    it('should fetch the board from the API', () => {
      expect(dependencies.boardApiService.fetchBoard).toHaveBeenCalledWith(
        'testBoardId'
      );
    });

    describe('when the data has been fetched', () => {
      let mockBoard: IHttpModel, statusChangeSubject: Subject<ModelStatus>;

      beforeEach(fakeAsync(() => {
        mockBoard = new HttpModelStub();
        let mockBoardData = {
          title: 'testBoard',
          _id: 'testBoardId',
          columns: [
            {
              _id: 'col1-id',
              title: 'column1',
              stories: []
            },
            {
              _id: 'col2-id',
              title: 'column2'
            }
          ]
        } as IBoard;

        mockBoard.data = mockBoardData;

        statusChangeSubject = new Subject();

        (mockBoard.onStatusChanges as jasmine.Spy).and.returnValue(
          statusChangeSubject.asObservable()
        );

        getBoardPromise.resolve(mockBoard);

        tick();

        fixture.detectChanges();
      }));

      it('should display the board title', () => {
        expect(getHeader().componentInstance.appBoardHeaderTitle).toBe(
          'testBoard'
        );
      });

      it('should pass the config to the board header', () => {
        expect(getHeader().componentInstance.appBoardHeaderBoardModel).toBe(
          mockBoard
        );
      });

      it('should display the columns', () => {
        expect(getColumns().length).toBe(2);
        expect(getColumns()[0].componentInstance.appColumn).toEqual({
          _id: 'col1-id',
          title: 'column1',
          stories: []
        });
        expect(getColumns()[1].componentInstance.appColumn).toEqual({
          _id: 'col2-id',
          title: 'column2'
        });
        expect(getColumns()[0].componentInstance.appColumnBoardId).toBe(
          'testBoardId'
        );
      });

      describe('when the board is reloaded or updated', () => {
        beforeEach(() => {
          statusChangeSubject.next(ModelStatus.RELOADED);
        });

        it('should set the config', () => {
          expect(
            dependencies.boardConfigStoreService.setConfig
          ).toHaveBeenCalledWith(undefined);
        });
      });

      describe('when the board is refreshed', () => {
        beforeEach(() => {
          dependencies.boardRefreshService.boardListRefresh.next();
        });

        it('should fetch the updated board', () => {
          expect(mockBoard.reload).toHaveBeenCalledWith();
        });
      });

      describe('when a story is deleted', () => {
        beforeEach(() => {
          mockBoard.data.columns[0].stories.push({ _id: 'story-id' } as IStory);

          fixture.detectChanges();

          dependencies.storyApiService.deleteStorySubject.next({
            storyId: 'story-id',
            columnId: 'col1-id'
          });
        });

        it('should save the updated board', () => {
          expect(mockBoard.update).toHaveBeenCalledWith();
        });
      });

      describe('when a story is moved', () => {
        beforeEach(() => {
          getColumns()[0].componentInstance.appColumnOnDrop.emit();
        });

        it('should save the board to the API', () => {
          expect(mockBoard.update).toHaveBeenCalledWith();
        });

        describe('when a new column is added', () => {
          let putBoardPromise: TestPromise<any>;

          beforeEach(() => {
            putBoardPromise = new TestPromise<any>();

            (mockBoard.update as jasmine.Spy).and.returnValue(
              putBoardPromise.promise
            );

            getColumnCreate().componentInstance.appColumnCreateOnCreate.emit(
              'new-column'
            );
          });

          it('should update the board in the API', () => {
            expect(mockBoard.update).toHaveBeenCalledWith();
          });

          describe('when the board has been successfully updated', () => {
            let refreshBoardPromise: TestPromise<any>;

            beforeEach(() => {
              refreshBoardPromise = new TestPromise<any>();

              (dependencies.boardApiService
                .fetchBoard as jasmine.Spy).and.returnValue(
                refreshBoardPromise.promise
              );

              putBoardPromise.resolve();
            });

            it('should refresh the board', () => {
              expect(
                dependencies.boardApiService.fetchBoard
              ).toHaveBeenCalledWith('testBoardId');
            });

            describe('when the board has successfully refreshed', () => {
              beforeEach(fakeAsync(() => {
                refreshBoardPromise.resolve({
                  title: 'testBoard',
                  _id: 'testBoardId',
                  columns: [
                    {
                      _id: 'col1-id',
                      title: 'column1'
                    },
                    {
                      _id: 'col2-id',
                      title: 'column2'
                    },
                    {
                      _id: 'col3-id',
                      title: 'new-column'
                    }
                  ]
                });

                tick();

                fixture.detectChanges();
              }));

              it('should render the new columns', () => {
                expect(getColumns()[2].componentInstance.appColumn).toEqual({
                  title: 'new-column'
                });
              });
            });
          });
        });

        describe('when a new story is added', () => {
          beforeEach(() => {
            dependencies.storyApiService.updateBoardSubject.next({
              columnId: 'col1-id',
              storyId: 'storyId'
            });
          });

          it('should save the board', () => {
            expect(mockBoard.update).toHaveBeenCalledWith();
          });
        });
      });
    });
  });
});

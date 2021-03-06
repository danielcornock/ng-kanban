import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnComponent } from './column.component';
import { StoryComponentStub } from '../../../stories/components/story/story.component.stub';
import { StoryCreateComponentStub } from 'src/app/stories/components/story-create/story-create.component.stub';
import { IStory } from 'src/app/stories/interfaces/story.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import * as ngDragDrop from '@angular/cdk/drag-drop';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let testStory: Partial<IStory>;

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css('.column-title'));
  }

  function getStories(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(StoryComponentStub));
  }

  function getStoriesCreate(): DebugElement {
    return fixture.debugElement.query(By.directive(StoryCreateComponentStub));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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
      title: 'test-story'
    };

    component.appColumn = {
      title: 'column-title',
      _id: 'column-id',
      stories: [testStory as IStory]
    };

    component.columnContainer = {
      nativeElement: {
        clientHeight: 400,
        scrollHeight: 500,
        style: {}
      }
    };
  });

  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display the column title', () => {
      expect(getTitle().nativeElement.innerText).toBe('column-title');
    });

    it('should add padding for a scroll bar', () => {
      expect(component.columnContainer.nativeElement.style.paddingRight).toBe(
        '1rem'
      );
    });

    it('should display the stories', () => {
      expect(getStories()[0].componentInstance.appStory).toBe(testStory);
      expect(getStories()[0].componentInstance.appStoryColumnId).toBe(
        'column-id'
      );
    });

    it('should pass the column id to the story create component', () => {
      expect(getStoriesCreate().componentInstance.appStoryCreateColumnId).toBe(
        'column-id'
      );
    });

    describe('when a story is dragged and dropped', () => {
      let mockEvent: any = {};

      beforeEach(() => {
        mockEvent.previousContainer = { id: 123, data: 'oldData' };
        mockEvent.previousIndex = 1;
      });

      describe('when it is dropped in the same container', () => {
        let moveItemSpy: jasmine.Spy;

        beforeEach(() => {
          mockEvent.container = { id: 123 };

          moveItemSpy = jasmine
            .createSpy('moveItem')
            .and.returnValue('mockReturn');

          spyOnProperty(ngDragDrop, 'moveItemInArray', 'get').and.returnValue(
            moveItemSpy
          );
        });

        describe('when the story has moved index', () => {
          beforeEach(() => {
            mockEvent.currentIndex = 2;
            component.drop(mockEvent);
          });

          it('should move the item in the array', () => {
            expect(moveItemSpy).toHaveBeenCalledWith(
              component.appColumn.stories,
              mockEvent.previousIndex,
              mockEvent.currentIndex
            );
          });
        });

        describe('when the story has not moved index', () => {
          beforeEach(() => {
            mockEvent.currentIndex = 1;
            component.drop(mockEvent);
          });

          it('should not move the item', () => {
            expect(moveItemSpy).not.toHaveBeenCalled();
          });
        });
      });

      describe('when it is dropped in to a different container', () => {
        let moveItemSpy: jasmine.Spy;

        beforeEach(() => {
          moveItemSpy = jasmine
            .createSpy('transferArray')
            .and.returnValue('mockReturn');

          spyOnProperty(ngDragDrop, 'transferArrayItem', 'get').and.returnValue(
            moveItemSpy
          );
          mockEvent.currentIndex = 2;
          mockEvent.container = { id: 456, data: 'data' };

          component.drop(mockEvent);
        });

        it('should transfer the story to another column', () => {
          expect(ngDragDrop.transferArrayItem).toHaveBeenCalledWith(
            mockEvent.previousContainer.data,
            mockEvent.container.data,
            mockEvent.previousIndex,
            mockEvent.currentIndex
          );
        });
      });
    });
  });

  describe('when there are no stories to display', () => {
    beforeEach(() => {
      component.appColumn.stories = [];
      fixture.detectChanges();
    });

    it('should not show any stories', () => {
      expect(getStories().length).toBe(0);
    });
  });
});

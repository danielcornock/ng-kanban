import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { EditStoryModalComponent } from './edit-story-modal.component';
import { MatDialogRefStub } from 'src/app/shared/modal/modal-dialog/mat-dialog-ref.stub';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestPromise } from 'src/app/testing/test-promise/test-promise';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormInputTextareaComponentStub } from 'src/app/shared/forms/form-input-textarea/form-input-textarea.component.stub';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BoardRefreshServiceStub } from 'src/app/boards/services/board-refresh/board-refresh.service.stub';
import { BoardRefreshService } from 'src/app/boards/services/board-refresh/board-refresh.service';
import { StoryApiServiceStub } from '../../services/story-api.service.stub';
import { StoryApiService } from '../../services/story-api.service';
import { TagsComponentStub } from '../tags/tags.component.stub';
import { FormFactoryStub } from 'src/app/shared/forms/services/form-factory/form-factory.service.stub';
import { FormFactory } from 'src/app/shared/forms/services/form-factory/form-factory.service';
import { FormContainerStub } from 'src/app/shared/forms/form-container/form-container.stub';
import { FormInputField } from 'src/app/shared/forms/form-input-field/form-input-field';
import { ModelServiceStub } from 'src/app/shared/api/model-service/model.service.stub';
import { IHttpModel } from 'src/app/shared/api/http-model/http-model.interface';
import { HttpModelStub } from 'src/app/shared/api/http-model/http-model.stub';
import { ModelService } from 'src/app/shared/api/model-service/model.service';
import { GithubCommitsComponentStub } from '../github-commits/github-commits.component.stub';

describe('EditStoryModalComponent', () => {
  let component: EditStoryModalComponent,
    fixture: ComponentFixture<EditStoryModalComponent>,
    formContainerStub: FormContainerStub,
    getStoryPromise: TestPromise<any>,
    boardRefreshSpy: jasmine.Spy,
    dependencies: {
      dialogData: any;
      matDialogRef: MatDialogRefStub;
      modelService: ModelServiceStub;
      formFactory: FormFactoryStub;
      boardRefreshService: BoardRefreshServiceStub;
      storyApiService: StoryApiServiceStub;
    };

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.editStoryModal-${element}`));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          storyId: 'story-id',
          columnId: 'column-id'
        }
      },
      matDialogRef: new MatDialogRefStub(),
      modelService: new ModelServiceStub(),
      formFactory: new FormFactoryStub(),
      boardRefreshService: new BoardRefreshServiceStub(),
      storyApiService: new StoryApiServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        EditStoryModalComponent,
        FormInputTextareaComponentStub,
        TagsComponentStub,
        GithubCommitsComponentStub
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        { provide: ModelService, useValue: dependencies.modelService },
        { provide: FormFactory, useValue: dependencies.formFactory },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        },
        {
          provide: StoryApiService,
          useValue: dependencies.storyApiService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    getStoryPromise = new TestPromise<any>();
    (dependencies.modelService.get as jasmine.Spy).and.returnValue(
      getStoryPromise.promise
    );

    fixture = TestBed.createComponent(EditStoryModalComponent);
    component = fixture.componentInstance;

    formContainerStub = new FormContainerStub();
    formContainerStub.fields.title = ('title' as unknown) as FormInputField;
    formContainerStub.fields.description = ('description' as unknown) as FormInputField;
    (dependencies.formFactory.createModelForm as jasmine.Spy).and.returnValue(
      formContainerStub
    );

    boardRefreshSpy = spyOn(
      dependencies.boardRefreshService.boardListRefresh,
      'next'
    );
  });

  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should request the story', () => {
      expect(dependencies.modelService.get).toHaveBeenCalledWith(
        'stories/story-id'
      );
    });

    describe('when the story has been fetched', () => {
      let storyModel: IHttpModel;

      beforeEach(fakeAsync(() => {
        storyModel = new HttpModelStub();
        storyModel.data = {
          _id: 'story-id',
          title: 'story-title',
          storyNumber: 12,
          tags: [{ color: '#1', label: '#1' }]
        };

        getStoryPromise.resolve(storyModel);

        tick();

        fixture.detectChanges();
      }));

      it('should create the form', () => {
        expect(dependencies.formFactory.createModelForm).toHaveBeenCalledWith(
          storyModel,
          {
            fields: [
              {
                name: 'title',
                config: {
                  setValue: jasmine.any(Function),
                  required: true
                }
              },
              {
                name: 'description',
                config: {
                  setValue: jasmine.any(Function)
                }
              }
            ]
          }
        );
      });

      it('should display the tags', () => {
        expect(getByCss('tags').componentInstance.appTags).toBe(
          storyModel.data.tags
        );
      });

      it('should display the story number', () => {
        expect(getByCss('storyNumber').nativeElement.innerText).toBe('#12');
      });

      it('should display the story title', () => {
        expect(getByCss('titleField').componentInstance.fieldConfig).toBe(
          'title'
        );
      });

      it('should display the story description', () => {
        expect(getByCss('descriptionField').componentInstance.fieldConfig).toBe(
          'description'
        );
      });

      describe('when a commit is added to a story', () => {
        beforeEach(async(() => {
          (storyModel.update as jasmine.Spy).and.returnValue(Promise.resolve());

          getByCss('commits').componentInstance.appGithubCommitsSelect.emit({
            sha: '123456789',
            html_url: 'html_url',
            commit: {
              message: 'Commit message',
              author: {
                name: 'Test Author'
              }
            }
          });

          fixture.detectChanges();
        }));

        it('should display the commit', () => {
          expect(
            getByCss('commits').componentInstance.appGithubCommitsCommit
          ).toEqual({
            id: '1234567',
            message: 'Commit message',
            url: 'html_url',
            author: 'Test Author'
          });
        });

        it('should save the model', () => {
          expect(storyModel.update).toHaveBeenCalledWith();
        });

        it('should refresh the board', () => {
          expect(boardRefreshSpy).toHaveBeenCalledWith();
        });

        describe('when a commit is removed from a story', () => {
          beforeEach(() => {
            (storyModel.update as jasmine.Spy).and.returnValue(
              Promise.resolve()
            );
            getByCss('commits').componentInstance.appGithubCommitsSelect.emit(
              null
            );

            fixture.detectChanges();
          });

          it('should remove the commit from the story', () => {
            expect(
              getByCss('commits').componentInstance.appGithubCommitsCommit
            ).toBe(null);
          });
        });
      });

      describe('when a new tag is selected', () => {
        beforeEach(() => {
          getByCss('tags').componentInstance.appTagsSelectedTag.emit({
            label: '#2',
            color: '#2'
          });
        });

        it('should add the new tag to the story model', () => {
          expect(getByCss('tags').componentInstance.appTags.length).toBe(2);
        });

        it('should update the story model in the api', () => {
          expect(storyModel.update).toHaveBeenCalledWith();
        });
      });

      describe('when a tag is removed', () => {
        beforeEach(() => {
          getByCss('tags').componentInstance.appTagsDeletedTag.emit(0);
        });

        it('should remove the tag from the story model', () => {
          expect(getByCss('tags').componentInstance.appTags.length).toBe(0);
        });

        it('should update the story model in the api', () => {
          expect(storyModel.update).toHaveBeenCalledWith();
        });
      });

      describe('when values in the form change', () => {
        let updatePromise: TestPromise<void>;

        beforeEach(() => {
          updatePromise = new TestPromise<void>();
          (storyModel.update as jasmine.Spy).and.returnValue(
            updatePromise.promise
          );
        });

        describe('when the input for the title changes', () => {
          describe('when it is the same as the stored value', () => {
            beforeEach(() => {
              (dependencies.formFactory.createModelForm as jasmine.Spy).calls
                .argsFor(0)[1]
                .fields[0].config.setValue({
                  value: 'story-title',
                  name: 'title'
                });
            });

            it('should not update the story', () => {
              expect(storyModel.update).not.toHaveBeenCalled();
            });
          });

          describe('when it is different from the stored value', () => {
            beforeEach(() => {
              (dependencies.formFactory.createModelForm as jasmine.Spy).calls
                .argsFor(0)[1]
                .fields[0].config.setValue({
                  value: 'new-story',
                  name: 'title'
                });
            });

            it('should modify the title of the story', () => {
              expect(storyModel.data.title).toBe('new-story');
            });

            it('should update the story with the updated information', () => {
              expect(storyModel.update).toHaveBeenCalledWith();
            });

            describe('when the story has been successfully updated', () => {
              beforeEach(async(() => {
                updatePromise.resolve();
              }));

              it('should refresh the board', () => {
                expect(boardRefreshSpy).toHaveBeenCalledWith();
              });
            });
          });
        });

        describe('when the input for the description changes', () => {
          beforeEach(() => {
            (dependencies.formFactory.createModelForm as jasmine.Spy).calls
              .argsFor(0)[1]
              .fields[1].config.setValue({
                value: 'new-description',
                name: 'description'
              });
          });

          it('should update the story', () => {
            expect(storyModel.update).toHaveBeenCalledWith();
          });
        });
      });

      describe('when the delete button is clicked', () => {
        let deleteStoryPromise: TestPromise<void>;

        beforeEach(() => {
          deleteStoryPromise = new TestPromise<void>();
          (storyModel.delete as jasmine.Spy).and.returnValue(
            deleteStoryPromise.promise
          );

          getByCss('delete').nativeElement.click();
        });

        it('should delete the story', () => {
          expect(storyModel.delete).toHaveBeenCalledWith();
        });

        describe('when the story has been successfully deleted', () => {
          beforeEach(async(() => {
            deleteStoryPromise.resolve();
          }));

          it('should close the modal', () => {
            expect(dependencies.matDialogRef.close).toHaveBeenCalledWith(
              undefined
            );
          });
        });
      });
    });
  });
});

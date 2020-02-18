import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { GithubConfigModalComponent } from './github-config-modal.component';
import { GithubUserSearchComponentStub } from '../github-user-search/github-user-search.component.stub';
import { GithubProfileComponentStub } from '../github-profile/github-profile.component.stub';
import { GithubRepoListComponentStub } from '../github-repo-list/github-repo.list.component.stub';
import { MatDialogRefStub } from 'src/app/shared/modal/modal-dialog/mat-dialog-ref.stub';
import { GithubServiceStub } from '../../services/github/github.service.stub';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GithubService } from '../../services/github/github.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestPromise } from 'src/app/testing/test-promise/test-promise';
import { IGithubRepo } from '../github-repo-list/interfaces/github-repo.interface';

describe('GithubConfigModalComponent', () => {
  let component: GithubConfigModalComponent,
    fixture: ComponentFixture<GithubConfigModalComponent>,
    dependencies: {
      dialogData: any;
      matDialogRef: MatDialogRefStub;
      githubService: GithubServiceStub;
    };

  function getDirective(directive: any): DebugElement {
    return fixture.debugElement.query(By.directive(directive));
  }

  function getCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.githubConfigModal-${element}`));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          repos: []
        }
      },
      matDialogRef: new MatDialogRefStub(),
      githubService: new GithubServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [
        GithubConfigModalComponent,
        GithubUserSearchComponentStub,
        GithubProfileComponentStub,
        GithubRepoListComponentStub
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        { provide: GithubService, useValue: dependencies.githubService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubConfigModalComponent);
    component = fixture.componentInstance;
  });

  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('when the user searches for a username', () => {
      let searchUserPromise: TestPromise<any>;

      beforeEach(() => {
        searchUserPromise = new TestPromise<any>();
        (dependencies.githubService.searchUsers as jasmine.Spy).and.returnValue(
          searchUserPromise.promise
        );
        getDirective(
          GithubUserSearchComponentStub
        ).componentInstance.appGithubUserSearchOnSearch.emit('github-username');
      });

      it('should search for the user', () => {
        expect(dependencies.githubService.searchUsers).toHaveBeenCalledWith(
          'github-username'
        );
      });

      describe('when the user profile has been fetched', () => {
        beforeEach(async(() => {
          searchUserPromise.resolve({
            login: 'github-username',
            imageUrl: 'github-url',
            bio: 'github-bio'
          });
        }));

        describe('when the profile is selected', () => {
          let fetchReposPromise: TestPromise<any>;

          beforeEach(() => {
            fetchReposPromise = new TestPromise<any>();
            (dependencies.githubService
              .fetchRepos as jasmine.Spy).and.returnValue(
              fetchReposPromise.promise
            );
            getCss('profileButton').nativeElement.click();
          });

          it('should fetch the users repos', () => {
            expect(dependencies.githubService.fetchRepos).toHaveBeenCalledWith(
              'github-username'
            );
          });

          describe('when the users repos have been fetched', () => {
            let allRepos: Array<any>;

            beforeEach(fakeAsync(() => {
              allRepos = [
                { name: 'repo1', url: 'repo1/url' },
                { name: 'repo2', url: 'repo2/url' }
              ];
              fetchReposPromise.resolve(allRepos);

              tick();

              fixture.detectChanges();
            }));

            it('should display the repos', () => {
              expect(
                getCss('repos').componentInstance.appGithubRepoListRepos
              ).toEqual(allRepos);
            });

            describe('when selecting a repo', () => {
              beforeEach(() => {
                getCss(
                  'repos'
                ).componentInstance.appGithubRepoListOnSelect.emit({
                  repo: { name: 'repo1' },
                  index: 0
                });

                fixture.detectChanges();
              });

              it('should add the selected repo to the selected repos list', () => {
                expect(
                  getCss('selectedRepos').componentInstance
                    .appGithubRepoListRepos
                ).toEqual([{ name: 'repo1' }]);
              });

              it('should remove the selected repo from the list of all repos', () => {
                expect(
                  getCss('repos').componentInstance.appGithubRepoListRepos
                ).toEqual([{ name: 'repo2', url: 'repo2/url' }]);
              });

              describe('when removing a repo from the selected list', () => {
                beforeEach(() => {
                  getCss(
                    'selectedRepos'
                  ).componentInstance.appGithubRepoListOnSelect.emit({
                    repo: {},
                    index: 0
                  });

                  fixture.detectChanges();
                });

                it('should remove the repo from the selected list', () => {
                  expect(getCss('selectedRepos') === null).toBe(true);
                });
              });
            });

            describe('when searching the repos', () => {
              beforeEach(() => {
                component.filterRepos({
                  target: { value: '1' }
                } as any);

                fixture.detectChanges();
              });

              it('should filter the repos', () => {
                expect(
                  getCss('repos').componentInstance.appGithubRepoListRepos
                    .length
                ).toBe(1);
              });
            });

            describe('when the user saves the configuration', () => {
              beforeEach(() => {
                getCss('save').nativeElement.click();
              });

              it('should close the instance', () => {
                expect(dependencies.matDialogRef.close).toHaveBeenCalledWith({
                  selectedRepos: []
                });
              });
            });
          });
        });
      });
    });
  });

  describe('when no repos are passed in', () => {
    beforeEach(() => {
      dependencies.dialogData.data.repos = null;
      fixture.detectChanges();
    });

    it('should set the repos to an empty array', () => {
      expect(component.selectedRepos).toEqual([]);
    });
  });
});

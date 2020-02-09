import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { GithubCommitsModalComponent } from "./github-commits-modal.component";
import { MatDialogRefStub } from "src/app/shared/modal/modal-dialog/mat-dialog-ref.stub";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { BoardConfigStoreServiceStub } from "src/app/boards/services/board-config-store/board-config-store.service.stub";
import { GithubServiceStub } from "src/app/boards/services/github/github.service.stub";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";
import { GithubService } from "src/app/boards/services/github/github.service";
import { Subject } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TestPromise } from "src/app/testing/test-promise/test-promise";

describe("GithubCommitsModalComponent", () => {
  let fixture: ComponentFixture<GithubCommitsModalComponent>,
    getConfigSubject: Subject<any>,
    dependencies: {
      dialogData: any;
      matDialogRef: MatDialogRefStub;
      boardConfigStoreService: BoardConfigStoreServiceStub;
      githubService: GithubServiceStub;
    };

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.githubCommitsModal-${element}`));
  }

  beforeEach(async(() => {
    dependencies = {
      dialogData: {
        data: {
          storyId: "story-id",
          columnId: "column-id"
        }
      },
      matDialogRef: new MatDialogRefStub(),
      boardConfigStoreService: new BoardConfigStoreServiceStub(),
      githubService: new GithubServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [GithubCommitsModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dependencies.dialogData },
        { provide: MatDialogRef, useValue: dependencies.matDialogRef },
        {
          provide: BoardConfigStoreService,
          useValue: dependencies.boardConfigStoreService
        },
        { provide: GithubService, useValue: dependencies.githubService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubCommitsModalComponent);

    getConfigSubject = new Subject<any>();
    (dependencies.boardConfigStoreService
      .getConfig as jasmine.Spy).and.returnValue(
      getConfigSubject.asObservable()
    );
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();

      getConfigSubject.next({
        repos: [
          {
            name: "repo1",
            url: "url/repo1"
          }
        ]
      });

      fixture.detectChanges();
    });

    it("should fetch the board config", () => {
      expect(
        dependencies.boardConfigStoreService.getConfig
      ).toHaveBeenCalledWith();
    });

    it("should display the repos", () => {
      expect(getByCss("selectedRepo").nativeElement.innerText).toBe("repo1");
    });

    describe("when a repo is selected", () => {
      let fetchCommitsPromise: TestPromise<any>;

      beforeEach(() => {
        fetchCommitsPromise = new TestPromise<any>();
        (dependencies.githubService
          .fetchCommits as jasmine.Spy).and.returnValue(
          fetchCommitsPromise.promise
        );
        getByCss("selectedRepo").nativeElement.click();

        fixture.detectChanges();
      });

      it("should search for commits", () => {
        expect(dependencies.githubService.fetchCommits).toHaveBeenCalledWith(
          "url/repo1"
        );
      });

      describe("when the commits have been fetched", () => {
        beforeEach(fakeAsync(() => {
          fetchCommitsPromise.resolve([
            {
              commit: {
                message: "commit 1"
              }
            }
          ]);

          tick();

          fixture.detectChanges();
        }));

        it("should display the commits", () => {
          expect(getByCss("commit").nativeElement.innerText).toBe("commit 1");
        });

        describe("when a commit is selected", () => {
          beforeEach(() => {
            getByCss("commit").nativeElement.click();
          });

          it("should close the modal with the commit data", () => {
            expect(dependencies.matDialogRef.close).toHaveBeenCalledWith({
              commit: { message: "commit 1" }
            });
          });
        });
      });
    });
  });
});

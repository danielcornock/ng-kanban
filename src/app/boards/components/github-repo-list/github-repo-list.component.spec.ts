import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GithubRepoListComponent } from "./github-repo-list.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("GithubRepoListComponent", () => {
  let component: GithubRepoListComponent,
    fixture: ComponentFixture<GithubRepoListComponent>,
    onSelectSpy: jasmine.Spy;

  function getRepos(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css(".githubRepoList-repo"));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GithubRepoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoListComponent);
    component = fixture.componentInstance;

    component.appGithubRepoListRepos = [{ name: "repo1", url: "url" }];
    onSelectSpy = spyOn(component.appGithubRepoListOnSelect, "emit");
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should display the repos", () => {
      expect(getRepos()[0].nativeElement.innerText).toBe("repo1");
    });

    it("should notadd the selected class to the repos", () => {
      expect(getRepos()[0].nativeElement.classList).not.toContain(
        "githubRepoList-repo--selected"
      );
    });

    describe("when a repo is selected", () => {
      beforeEach(() => {
        getRepos()[0].nativeElement.click();
      });

      it("should emit the selected repo with its index", () => {
        expect(onSelectSpy).toHaveBeenCalledWith({
          repo: { name: "repo1", url: "url" },
          index: 0
        });
      });
    });
  });

  describe("when the repo list is active", () => {
    beforeEach(() => {
      component.appGithubRepoListIsSelected = true;
      fixture.detectChanges();
    });

    it("should add the selected class to the repos", () => {
      expect(getRepos()[0].nativeElement.classList).toContain(
        "githubRepoList-repo--selected"
      );
    });
  });
});

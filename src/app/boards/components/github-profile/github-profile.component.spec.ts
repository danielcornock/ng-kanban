import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GithubProfileComponent } from "./github-profile.component";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("GithubProfileComponent", () => {
  let component: GithubProfileComponent;
  let fixture: ComponentFixture<GithubProfileComponent>;

  function getByCSS(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.githubProfile-${element}`));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GithubProfileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProfileComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      component.appGithubProfile = {
        imageUrl: "url/image",
        name: "githubName",
        bio: "githubBio"
      };

      fixture.detectChanges();
    });

    it("should render the image", () => {
      expect(getByCSS("image").nativeElement.src).toContain("url/image");
    });

    it("should render the users name", () => {
      expect(getByCSS("name").nativeElement.innerText).toBe("githubName");
    });

    it("should render the users bio", () => {
      expect(getByCSS("bio").nativeElement.innerText).toBe("githubBio");
    });
  });
});

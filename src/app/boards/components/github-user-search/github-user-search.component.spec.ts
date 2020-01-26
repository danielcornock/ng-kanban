import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GithubUserSearchComponent } from "./github-user-search.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { GetElement } from "src/app/testing/get-element/get-element";

describe("GithubUserSearchComponent", () => {
  let component: GithubUserSearchComponent,
    fixture: ComponentFixture<GithubUserSearchComponent>,
    searchForm: FormGroup,
    getElement: GetElement<GithubUserSearchComponent>,
    dependencies: {
      formBuilder: FormBuilder;
    };

  beforeEach(async(() => {
    dependencies = {
      formBuilder: new FormBuilder()
    };

    searchForm = dependencies.formBuilder.group({
      username: [""]
    });

    spyOn(dependencies.formBuilder, "group").and.returnValue(searchForm);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GithubUserSearchComponent],
      providers: [{ provide: FormBuilder, useValue: dependencies.formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubUserSearchComponent);
    component = fixture.componentInstance;
    getElement = new GetElement(fixture, "githubUserSearch");
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should create the form", () => {
      expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
        username: [""]
      });
    });

    describe("when the user searches", () => {
      beforeEach(() => {
        spyOn(component.appGithubUserSearchOnSearch, "emit");
        searchForm.value.username = "username";
        getElement.byCss("submitName").nativeElement.click();
      });

      it("should emit the searched username", () => {
        expect(component.appGithubUserSearchOnSearch.emit).toHaveBeenCalledWith(
          "username"
        );
      });
    });
  });
});

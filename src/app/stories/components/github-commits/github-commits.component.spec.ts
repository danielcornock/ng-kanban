import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GithubCommitsComponent } from "./github-commits.component";
import {
  ModalServiceStub,
  modalServiceReturn
} from "src/app/shared/modal/modal-service/modal.service.stub";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { IconComponentStub } from "src/app/icons/icon/icon.component.stub";
import { GithubCommitsModalComponent } from "../github-commits-modal/github-commits-modal.component";
import { Subject } from "rxjs";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("GithubCommitsComponent", () => {
  let component: GithubCommitsComponent;
  let fixture: ComponentFixture<GithubCommitsComponent>;
  let dependencies: {
    modalService: ModalServiceStub;
  };

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.githubCommits-${element}`));
  }

  beforeEach(async(() => {
    dependencies = {
      modalService: new ModalServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [GithubCommitsComponent, IconComponentStub],
      providers: [
        { provide: ModalService, useValue: dependencies.modalService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubCommitsComponent);
    component = fixture.componentInstance;

    spyOn(component.appGithubCommitsSelect, "emit");
  });

  describe("when there is no selected repo", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe("when the add commit button is pressed", () => {
      let modalSubject: Subject<any>;
      beforeEach(() => {
        modalSubject = new Subject();
        (dependencies.modalService.openModal as jasmine.Spy).and.returnValue(
          modalServiceReturn(modalSubject)
        );
        getByCss("addCommit").nativeElement.click();
      });

      it("should open the commit modal", () => {
        expect(dependencies.modalService.openModal).toHaveBeenCalledWith(
          GithubCommitsModalComponent,
          {}
        );
      });

      describe("when the modal is closed", () => {
        beforeEach(() => {
          modalSubject.next("data");
        });

        it("should emit the values", () => {
          expect(component.appGithubCommitsSelect.emit).toHaveBeenCalledWith(
            "data"
          );
        });
      });
    });
  });
});

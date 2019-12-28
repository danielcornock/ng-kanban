import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardCreateComponent } from "./board-create.component";
import { FormBuilder } from "@angular/forms";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { BoardRefreshServiceStub } from "../../services/board-refresh/board-refresh.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { BoardRefreshService } from "../../services/board-refresh/board-refresh.service";
import { SharedModule } from "src/app/shared/shared.module";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("BoardCreateComponent", () => {
  let component: BoardCreateComponent;
  let fixture: ComponentFixture<BoardCreateComponent>;
  let dependencies: {
    formBuilder: FormBuilder;
    httpService: HttpServiceStub;
    boardRefreshService: BoardRefreshServiceStub;
  };

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css(".boardCreate-submit"));
  }

  beforeEach(async(() => {
    dependencies = {
      formBuilder: new FormBuilder(),
      httpService: new HttpServiceStub(),
      boardRefreshService: new BoardRefreshServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BoardCreateComponent],
      providers: [
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        { provide: HttpService, useValue: dependencies.httpService },
        {
          provide: BoardRefreshService,
          useValue: dependencies.boardRefreshService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const boardForm = dependencies.formBuilder.group({
      title: null
    });
    spyOn(dependencies.formBuilder, "group").and.returnValue(boardForm);

    fixture = TestBed.createComponent(BoardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("on initialisation", () => {
    it("should initialise the form", () => {
      expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
        title: [null, jasmine.any(Function)]
      });
    });
  });

  describe("when the form is submitted", () => {
    beforeEach(() => {
      component.createBoardForm.value.title = "board-title";
      getSubmitButton().nativeElement.click();
    });

    describe("when the data has been successfully posted", () => {
      let refreshed: boolean;
      beforeEach(() => {
        dependencies.boardRefreshService.boardListRefresh.subscribe(() => {
          refreshed = true;
        });

        (dependencies.httpService.post as jasmine.Spy).and.returnValue(
          Promise.resolve()
        );
      });

      it("should post the data to the API", () => {
        expect(dependencies.httpService.post).toHaveBeenCalledWith("boards", {
          title: "board-title"
        });
      });

      it("should refresh the boards list", () => {
        expect(refreshed).toBe(true);
      });
    });
  });
});

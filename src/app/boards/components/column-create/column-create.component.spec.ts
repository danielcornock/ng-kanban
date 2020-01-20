import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnCreateComponent } from "./column-create.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormBuilder } from "@angular/forms";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ColumnCreateComponent", () => {
  let component: ColumnCreateComponent;
  let fixture: ComponentFixture<ColumnCreateComponent>;
  let dependencies: {
    formBuilder: FormBuilder;
    httpService: HttpServiceStub;
  };

  function getTextInput(): DebugElement {
    return fixture.debugElement.query(By.css(".columnCreate-title"));
  }

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css(".columnCreate-submit"));
  }

  function getActivateButton(): DebugElement {
    return fixture.debugElement.query(
      By.css(".columnCreate-inactiveContainer")
    );
  }

  beforeEach(async(() => {
    dependencies = {
      formBuilder: new FormBuilder(),
      httpService: new HttpServiceStub()
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        { provide: HttpService, useValue: dependencies.httpService }
      ],
      declarations: [ColumnCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    const storyForm = dependencies.formBuilder.group({
      title: ""
    });
    spyOn(dependencies.formBuilder, "group").and.returnValue(storyForm);

    fixture = TestBed.createComponent(ColumnCreateComponent);
    component = fixture.componentInstance;
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should not display the form", () => {
      expect(getTextInput() === null).toBe(true);
    });

    it("should initialise the form", () => {
      expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
        title: ["", jasmine.any(Function)]
      });
    });

    describe("when the form is activated", () => {
      beforeEach(() => {
        getActivateButton().nativeElement.click();
        fixture.detectChanges();
      });

      it("should display the form", () => {
        expect(getTextInput() === null).toBe(false);
      });

      describe("when the form is submitted", () => {
        beforeEach(() => {
          component.columnForm.value.title = "test-title";
          spyOn(component.appColumnCreateOnCreate, "emit");
          spyOn(component.columnForm, "reset");
          getSubmitButton().nativeElement.click();
        });

        it("should emit the form value title", () => {
          expect(component.appColumnCreateOnCreate.emit).toHaveBeenCalledWith(
            "test-title"
          );
        });

        it("should reset the form values", () => {
          expect(component.columnForm.reset).toHaveBeenCalledWith();
        });
      });
    });
  });
});

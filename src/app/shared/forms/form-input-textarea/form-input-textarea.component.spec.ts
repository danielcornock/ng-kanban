import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormInputTextareaComponent } from "./form-input-textarea.component";
import { FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { SharedModule } from "../../shared.module";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("FormInputTextareaComponent", () => {
  let component: FormInputTextareaComponent;
  let fixture: ComponentFixture<FormInputTextareaComponent>;

  function getTextArea(): DebugElement {
    return fixture.debugElement.query(By.css(".formInputTextarea-textarea"));
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormInputTextareaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTextareaComponent);
    component = fixture.componentInstance;

    const formBuilder = new FormBuilder();
    const stubFormGroup = formBuilder.group({ title: "" });

    component.parentForm = stubFormGroup;
    component.controlName = "title";
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe("when the textarea is blurred", () => {
      let blurSpy: jasmine.Spy;

      beforeEach(() => {
        spyOn(component.setValue, "emit");
        blurSpy = spyOn(getTextArea().nativeElement, "blur");
        component.onTitleEnter(({
          type: "blur",
          target: { value: "newText" }
        } as unknown) as KeyboardEvent);
      });

      it("should emit the changed values", () => {
        expect(component.setValue.emit).toHaveBeenCalledWith({
          value: "newText",
          name: "title"
        });
      });

      it("should blur the text area", () => {
        expect(blurSpy).toHaveBeenCalledWith();
      });
    });
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormInputComponent } from "./form-input.component";
import { Component } from "@angular/core";
import { FormInputField } from "../form-input-field/form-input-field";

@Component({
  template: ""
})
class FormInputExtension extends FormInputComponent {
  constructor() {
    super();
  }
}

describe("FormInputComponent", () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputExtension>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormInputExtension]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputExtension);
    component = fixture.componentInstance;
    component.fieldConfig = ({
      config: {
        setValue: jasmine.createSpy("setValue")
      },
      control: {},
      name: "field",
      formGroup: {}
    } as unknown) as FormInputField;
    fixture.detectChanges();
  });

  describe("when an input is entered", () => {
    let keyboardEvent: Partial<KeyboardEvent>;

    beforeEach(() => {
      keyboardEvent = {
        keyCode: 13,
        target: ({
          value: "hey",
          blur: jasmine.createSpy("blur")
        } as Partial<HTMLInputElement>) as HTMLInputElement
      };

      component.onInputEnter(keyboardEvent as KeyboardEvent);
    });

    it("should set the value of the form control", () => {
      expect(component.fieldConfig.config.setValue).toHaveBeenCalledWith({
        value: "hey",
        name: "field"
      });
    });

    it("should blur the html element", () => {
      expect(
        (keyboardEvent.target as HTMLInputElement).blur
      ).toHaveBeenCalledWith();
    });
  });
});

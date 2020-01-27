import { TestBed } from "@angular/core/testing";

import { FormFactory } from "./form-factory.service";
import { IFormConfig } from "../interfaces/form-config.interface";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-control/form-input-control";
import { FormContainer } from "../form-container/form-container";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";
import { IFormInputField } from "../interfaces/form-input-field.interface";

describe("FormFactory", () => {
  let service: FormFactory;

  beforeEach(() => {
    service = new FormFactory();
  });

  describe("when creating a form", () => {
    let formConfig: IFormConfig,
      formControl1: AbstractControl,
      result: any,
      mockFormGroup: FormGroup,
      createFormGroupSpy: jasmine.Spy;

    beforeEach(() => {
      formControl1 = new FormControl("");
      formConfig = {
        fields: [
          {
            control: formControl1,
            name: "formControl1",
            config: {}
          } as FormInputField
        ]
      };

      mockFormGroup = new FormGroup({});
      createFormGroupSpy = spyOn(ReactiveFormFactory, "createFormGroup");
      createFormGroupSpy.and.returnValue(mockFormGroup);
      result = service.createForm(formConfig);
    });

    describe("when returning the form", () => {
      it("should create the form group", () => {
        expect(createFormGroupSpy).toHaveBeenCalledWith({
          formControl1: formConfig.fields[0].control
        });
      });
      it("should be a form container instance", () => {
        expect(result instanceof FormContainer).toBe(true);
      });

      it("should contain a form group", () => {
        expect(result.form).toBe(mockFormGroup);
      });

      it("should contain the control fields", () => {
        expect(result.fields).toBe(formConfig.fields);
      });

      it("should attach the form group to each form control", () => {
        expect(result.fields[0].formGroup).toBe(mockFormGroup);
      });
    });
  });

  describe("when creating an input", () => {
    let inputConfig: IFormInputField,
      result: any,
      mockFormControl: FormControl,
      controlFactorySpy: jasmine.Spy;

    beforeEach(() => {
      inputConfig = {
        name: "input-1",
        config: {
          required: true,
          getValue: jasmine.createSpy("getValue"),
          setValue: jasmine.createSpy("setValue")
        }
      };

      mockFormControl = new FormControl("generated-field");
      controlFactorySpy = spyOn(
        ReactiveFormFactory,
        "createFormControl"
      ).and.returnValue(mockFormControl);
      (inputConfig.config.getValue as jasmine.Spy).and.returnValue(
        "test-field"
      );

      spyOn(mockFormControl, "setValidators");
      result = service.createInput(inputConfig);
    });

    describe("when returning the input", () => {
      it("should create the form control", () => {
        expect(controlFactorySpy).toHaveBeenCalledWith("test-field");
      });

      it("should attach the required validator", () => {
        expect(mockFormControl.setValidators).toHaveBeenCalledWith([
          jasmine.any(Function)
        ]);
      });

      it("should return a form input field", () => {
        expect(result instanceof FormInputField).toBe(true);
      });

      it("should have the value set in the config", () => {
        expect(result.control.value).toBe("generated-field");
      });

      it("should return the form control", () => {
        expect(result.control instanceof FormControl).toBe(true);
      });

      it("should attach the name to the input", () => {
        expect(result.name).toBe("input-1");
      });

      it("should attach the config to the input", () => {
        expect(result.config).toBe(inputConfig.config);
      });
    });
  });
});

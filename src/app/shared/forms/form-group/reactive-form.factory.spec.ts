import { ReactiveFormFactory } from "./reactive-form.factory";
import { IAbstractControlDict } from "../interfaces/abstract-control-dict.interface";
import { FormGroup, FormControl } from "@angular/forms";

describe("when creating reactive form elements", () => {
  describe("when creating a form group", () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = ReactiveFormFactory.createFormGroup(
        {} as IAbstractControlDict
      );
    });

    it("should return a form group instance", () => {
      expect(formGroup instanceof FormGroup).toBe(true);
    });
  });

  describe("when creating a form control", () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = ReactiveFormFactory.createFormControl("val");
    });

    it("should return a form group instance", () => {
      expect(formControl instanceof FormControl).toBe(true);
    });

    it("should set the initial value", () => {
      expect(formControl.value).toBe("val");
    });
  });
});

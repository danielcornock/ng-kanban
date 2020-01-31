import { FormInputField } from "../form-input-field/form-input-field";
import { FormInputFieldStub } from "../form-input-field/form-input-field.stub";
import { FormContainer } from "./form-container";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";
import { FormGroup } from "@angular/forms";

describe("FormContainer", () => {
  let formContainer: FormContainer,
    inputControls: Array<FormInputField>,
    inputControl: FormInputFieldStub,
    formGroup: FormGroup;

  beforeEach(() => {
    inputControl = new FormInputFieldStub();
    inputControl.name = "controlName";
    inputControls = [
      (inputControl as Partial<FormInputField>) as FormInputField
    ];

    formGroup = new FormGroup({});
  });

  describe("on creation", () => {
    beforeEach(() => {
      spyOn(ReactiveFormFactory, "createFormGroup").and.returnValue(formGroup);

      formContainer = new FormContainer(inputControls);
    });

    it("should create the form group ", () => {
      expect(ReactiveFormFactory.createFormGroup).toHaveBeenCalledWith({
        controlName: inputControl.control
      });
    });

    describe("when the form container has been created", () => {
      it("should hold the form group value", () => {
        expect(formContainer.form).toBe(formGroup);
      });

      it("should convert the input array to an object and hold it", () => {
        expect(formContainer.fields).toEqual({
          controlName: (inputControl as Partial<
            FormInputField
          >) as FormInputField
        });
      });
    });
  });
});

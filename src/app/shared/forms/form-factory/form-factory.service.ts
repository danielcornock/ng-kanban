import { Injectable } from "@angular/core";
import { FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { FormContainer } from "../form-container/form-container";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputField } from "../interfaces/form-input-field.interface";
import { IFormConfig } from "../interfaces/form-config.interface";
import { IAbstractControlDict } from "../interfaces/abstract-control-dict.interface";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";

@Injectable({
  providedIn: "root"
})
export class FormFactory {
  public createForm(formConfig: IFormConfig): FormContainer {
    const form = new FormContainer();
    form.form = this._createFormGroup(formConfig.fields);

    form.fields = formConfig.fields;

    return form;
  }

  public createInput(inputConfig: IFormInputField): FormInputField {
    const control = ReactiveFormFactory.createFormControl(
      inputConfig.config.getValue()
    );

    control.setValidators(this._createValidators(inputConfig));

    const formInputField = new FormInputField(
      control,
      inputConfig.name,
      inputConfig.config
    );

    return formInputField;
  }

  private _createValidators(inputConfig: IFormInputField) {
    const validators: Array<ValidatorFn> = [];

    if (inputConfig.config.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  private _createFormGroup(fields: Array<FormInputField>): FormGroup {
    const formObj: IAbstractControlDict = {};
    fields.forEach(field => {
      formObj[field.name] = field.control;
    });

    return ReactiveFormFactory.createFormGroup(formObj);
  }
}

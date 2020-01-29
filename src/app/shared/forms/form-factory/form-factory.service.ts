import { Injectable } from "@angular/core";
import {
  FormGroup,
  Validators,
  ValidatorFn,
  FormControl
} from "@angular/forms";
import { FormContainer } from "../form-container/form-container";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputFieldConfig } from "../interfaces/form-input-field-config.interface";
import { IFormConfig } from "../interfaces/form-config.interface";
import { IAbstractControlDict } from "../interfaces/abstract-control-dict.interface";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";
import { IFormInputFieldGroup } from "../interfaces/form-input-field-group.interface";
import { IFormInputConfig } from "../interfaces/form-input-config.interface";
import { IFormCreateManualConfig } from "../interfaces/form-create-manual-config.interface";

@Injectable({
  providedIn: "root"
})
export class FormFactory {
  public createForm(formConfig: IFormConfig): FormContainer {
    return new FormContainer(
      this._createFieldGroup(formConfig.fields),
      this._createFormGroup(formConfig.fields)
    );
  }

  public createInput(inputConfig: IFormInputFieldConfig): FormInputField {
    return new FormInputField(
      this._createControl(inputConfig.config),
      inputConfig.name,
      inputConfig.config
    );
  }

  public createModelForm<T>(model: T, formConfig: IFormCreateManualConfig) {
    const formInputArray: Array<FormInputField> = [];

    formConfig.fields.forEach(item => {
      this._setModelGetterFn<T>(item, model);
      this._setModelSetterFn<T>(item, model);

      formInputArray.push(this.createInput(item));
    });

    return this.createForm({ fields: formInputArray });
  }

  private _createControl(inputConfigConfig: IFormInputConfig): FormControl {
    const control = ReactiveFormFactory.createFormControl(
      inputConfigConfig.getValue()
    );

    control.setValidators(this._createValidators(inputConfigConfig));

    return control;
  }

  private _setModelGetterFn<T>(fieldConfig: IFormInputFieldConfig, model: T) {
    if (!fieldConfig.config.getValue) {
      fieldConfig.config.getValue = () => model[fieldConfig.name];
    }
  }

  private _setModelSetterFn<T>(fieldConfig: IFormInputFieldConfig, model: T) {
    if (!fieldConfig.config.setValue) {
      fieldConfig.config.setValue = (val: any) => {
        model[fieldConfig.name] = val;
      };
    }
  }

  private _createValidators(inputConfig: IFormInputConfig) {
    const validators: Array<ValidatorFn> = [];

    if (inputConfig.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  private _createFieldGroup(
    inputFieldsArray: Array<IFormInputFieldConfig>
  ): IFormInputFieldGroup {
    const fieldObj = {};
    inputFieldsArray.forEach(field => {
      fieldObj[field.name] = field;
    });

    return fieldObj;
  }

  private _createFormGroup(fields: Array<FormInputField>): FormGroup {
    const formObj: IAbstractControlDict = {};
    fields.forEach(field => {
      formObj[field.name] = field.control;
    });

    return ReactiveFormFactory.createFormGroup(formObj);
  }
}

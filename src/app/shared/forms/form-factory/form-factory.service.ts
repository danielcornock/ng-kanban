import { Injectable } from "@angular/core";
import {
  FormGroup,
  Validators,
  ValidatorFn,
  FormControl
} from "@angular/forms";
import { FormContainer } from "../form-container/form-container";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputConfig } from "../interfaces/form-input-config.interface";
import { IFormConfig } from "../interfaces/form-config.interface";
import { IAbstractControlDict } from "../interfaces/abstract-control-dict.interface";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";
import { IFormInputFieldGroup } from "../interfaces/form-input-field-group.interface";
import { IFormInputConfigConfig } from "../interfaces/form-input-config-config.interface";
import { IFormCreateManualConfig } from "../interfaces/form-create-manual-config.interface";

@Injectable({
  providedIn: "root"
})
export class FormFactory {
  public createForm(formConfig: IFormConfig): FormContainer {
    const controlFields: Array<FormInputField> = this._createInputFields(
      formConfig.fields
    );

    return new FormContainer(controlFields);
  }

  public createInput(inputConfig: IFormInputConfig): FormInputField {
    return new FormInputField(inputConfig);
  }

  public createModelForm<T>(model: T, formConfig: IFormCreateManualConfig) {
    return this.createForm({
      fields: this._generateFromModelFieldsConfig<T>(formConfig.fields, model)
    });
  }

  private _generateFromModelFieldsConfig<T>(
    fields: Array<IFormInputConfig>,
    model: T
  ): Array<IFormInputConfig> {
    fields.forEach(item => {
      this._setModelGetterFn<T>(item, model);
      this._setModelSetterFn<T>(item, model);
    });

    return fields;
  }

  private _createInputFields(
    inputConfig: Array<IFormInputConfig>
  ): Array<FormInputField> {
    return inputConfig.map(field => {
      return field instanceof FormInputField ? field : this.createInput(field);
    });
  }

  private _setModelGetterFn<T>(fieldConfig: IFormInputConfig, model: T) {
    if (!fieldConfig.config.getValue) {
      fieldConfig.config.getValue = () => model[fieldConfig.name];
    }
  }

  private _setModelSetterFn<T>(fieldConfig: IFormInputConfig, model: T) {
    if (!fieldConfig.config.setValue) {
      fieldConfig.config.setValue = (val: any) => {
        model[fieldConfig.name] = val;
      };
    }
  }
}

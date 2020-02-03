import { Injectable } from "@angular/core";
import { FormContainer } from "../form-container/form-container";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputConfig } from "../interfaces/form-input-config.interface";
import { IFormConfig } from "../interfaces/form-config.interface";
import { IFormCreateManualConfig } from "../interfaces/form-create-manual-config.interface";
import { IHttpModel } from "../../api/http-model/http-model.interface";
import { IHttpObject } from "../../api/interfaces/http-response.interface";

@Injectable({
  providedIn: "root"
})
export class FormFactory {
  public createForm(formConfig: IFormConfig): FormContainer {
    const controlFields: Array<FormInputField> = this._createInputFields(
      formConfig.fields
    );

    return FormContainer.create(controlFields);
  }

  public createInput(inputConfig: IFormInputConfig): FormInputField {
    return FormInputField.create(inputConfig);
  }

  public createModelForm(
    model: IHttpModel,
    formConfig: IFormCreateManualConfig
  ): FormContainer {
    return this.createForm({
      fields: this._generateFromModelFieldsConfig(formConfig.fields, model.data)
    });
  }

  private _generateFromModelFieldsConfig(
    fields: Array<IFormInputConfig>,
    data: IHttpObject
  ): Array<IFormInputConfig> {
    fields.forEach(item => {
      this._setModelGetterFn(item, data);
      this._setModelSetterFn(item, data);
    });

    return fields;
  }

  private _createInputFields(
    inputConfig: Array<IFormInputConfig>
  ): Array<FormInputField> {
    return inputConfig.map(field => {
      return field.hasOwnProperty("control")
        ? (field as FormInputField)
        : this.createInput(field);
    });
  }

  private _setModelGetterFn(fieldConfig: IFormInputConfig, data: IHttpObject) {
    if (!fieldConfig.config.getValue) {
      fieldConfig.config.getValue = () => data[fieldConfig.name];
    }
  }

  private _setModelSetterFn(fieldConfig: IFormInputConfig, model: IHttpObject) {
    if (!fieldConfig.config.setValue) {
      fieldConfig.config.setValue = (val: any) => {
        model[fieldConfig.name] = val;
      };
    }
  }
}

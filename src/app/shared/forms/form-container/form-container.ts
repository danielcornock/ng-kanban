import { FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputFieldGroup } from "../interfaces/form-input-field-group.interface";
import { IAbstractControlDict } from "../interfaces/abstract-control-dict.interface";
import { ReactiveFormFactory } from "../form-group/reactive-form.factory";

export class FormContainer {
  public fields: IFormInputFieldGroup;
  public form: FormGroup;

  constructor(controls: Array<FormInputField>) {
    this.fields = this._createFieldGroup(controls);
    this.form = this._createFormGroup(controls);
  }

  private _createFormGroup(fields: Array<FormInputField>): FormGroup {
    const formObj: IAbstractControlDict = {};
    fields.forEach(field => {
      formObj[field.name] = field.control;
    });

    return ReactiveFormFactory.createFormGroup(formObj);
  }

  private _createFieldGroup(
    inputFieldsArray: Array<FormInputField>
  ): IFormInputFieldGroup {
    const fieldObj = {};
    inputFieldsArray.forEach(field => {
      fieldObj[field.name] = field;
    });

    return fieldObj;
  }
}

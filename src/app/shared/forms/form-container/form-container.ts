import { FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputFieldGroup } from "../interfaces/form-input-field-group.interface";

export class FormContainer {
  public fields: IFormInputFieldGroup;
  public form: FormGroup;

  constructor(fields: IFormInputFieldGroup, formGroup: FormGroup) {
    this.fields = fields;
    this.form = formGroup;
  }
}

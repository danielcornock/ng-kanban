import { FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputFieldGroup } from "../interfaces/form-input-field-group.interface";

export class FormContainerStub {
  public fields: IFormInputFieldGroup = {};
  public form: FormGroup = new FormGroup({});
}

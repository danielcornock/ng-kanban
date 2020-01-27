import { FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-field/form-input-field";

export class FormContainer {
  public fields: Array<FormInputField>;
  public form: FormGroup;
}

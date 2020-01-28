import { FormGroup } from "@angular/forms";
import { FormInputField } from "../form-input-field/form-input-field";

export class FormContainerStub {
  public fields: Array<FormInputField>;
  public form: FormGroup = new FormGroup({});
}

import { Input, Component } from "@angular/core";
import { IFormInputField } from "../interfaces/form-input-field.interface";
import { FormInputField } from "../form-input-field/form-input-field";

@Component({
  selector: "app-form-input-textarea",
  template: ""
})
export class FormInputTextareaComponentStub {
  @Input() public fieldConfig: FormInputField;
}

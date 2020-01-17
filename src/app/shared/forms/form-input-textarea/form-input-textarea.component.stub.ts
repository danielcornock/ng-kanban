import { Input, Output, EventEmitter, Component } from "@angular/core";
import { IControlExport } from "../interfaces/control-export.interface";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-input-textarea",
  template: ""
})
export class FormInputTextareaComponentStub {
  @Input() public parentForm: FormGroup;
  @Input() public controlName: string;
  @Output() public setValue: EventEmitter<IControlExport> = new EventEmitter<
    IControlExport
  >();
}

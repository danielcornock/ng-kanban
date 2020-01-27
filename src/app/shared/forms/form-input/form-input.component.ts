import { OnInit, Input } from "@angular/core";
import { FormInputField } from "../form-input-field/form-input-field";

export abstract class FormInputComponent implements OnInit {
  @Input() public fieldConfig: FormInputField;
  constructor() {}

  ngOnInit() {}

  public async onInputEnter(e: KeyboardEvent) {
    if (e.keyCode === 13 || e.type === "blur") {
      this.fieldConfig.config.setValue({
        value: (e.target as HTMLInputElement).value,
        name: this.fieldConfig.name
      });
      (e.target as HTMLInputElement).blur();
    }
  }
}

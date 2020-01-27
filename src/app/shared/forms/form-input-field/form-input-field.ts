import { AbstractControl, FormGroup } from "@angular/forms";
import { IFormInputConfig } from "../interfaces/form-input-config.interface";

export class FormInputField {
  public control: AbstractControl;
  public name: string;
  public formGroup: FormGroup;
  public config: IFormInputConfig;

  constructor(
    control: AbstractControl,
    name: string,
    config: IFormInputConfig
  ) {
    this.control = control;
    this.name = name;
    this.config = config;
  }
}

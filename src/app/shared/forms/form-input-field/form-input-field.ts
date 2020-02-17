import {
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { IFormInputConfigConfig } from '../interfaces/form-input-config-config.interface';
import { IFormInputConfig } from '../interfaces/form-input-config.interface';
import { ReactiveFormFactory } from '../services/form-group/reactive-form.factory';

export class FormInputField {
  public control: AbstractControl;
  public name: string;
  public config: IFormInputConfigConfig;
  public type: string;

  constructor(inputConfig: IFormInputConfig) {
    this.control = this._createControl(inputConfig.config);
    this.name = inputConfig.name;
    this.config = inputConfig.config;
    this.type = inputConfig.type;
  }

  static create(inputConfig: IFormInputConfig) {
    return new FormInputField(inputConfig);
  }

  private _createControl(
    inputConfigConfig: IFormInputConfigConfig
  ): FormControl {
    const control = ReactiveFormFactory.createFormControl(
      inputConfigConfig.getValue ? inputConfigConfig.getValue() : null
    );

    control.setValidators(this._createValidators(inputConfigConfig));

    return control;
  }

  private _createValidators(inputConfig: IFormInputConfigConfig) {
    const validators: Array<ValidatorFn> = [];

    if (inputConfig.required) {
      validators.push(Validators.required);
    }

    if (inputConfig.customValidators) {
      inputConfig.customValidators.forEach(validator => {
        validators.push(validator);
      });
    }

    return validators;
  }
}

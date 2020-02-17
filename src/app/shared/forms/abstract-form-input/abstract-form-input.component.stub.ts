import { FormInputField } from '../form-input-field/form-input-field';
import { Input } from '@angular/core';

export abstract class AbstractFormInputComponentStub {
  @Input() public fieldConfig: FormInputField;
}

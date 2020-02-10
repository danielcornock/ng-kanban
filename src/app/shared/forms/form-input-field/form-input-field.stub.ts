import { FormControl } from '@angular/forms';
import { IFormInputConfigConfig } from '../interfaces/form-input-config-config.interface';

export class FormInputFieldStub {
  public name = '';
  public config: IFormInputConfigConfig = {};
  public control = new FormControl('');
}

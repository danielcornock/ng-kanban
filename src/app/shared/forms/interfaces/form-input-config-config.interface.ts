import { IControlExport } from './control-export.interface';
import { ValidatorFn } from '@angular/forms';

export interface IFormInputConfigConfig {
  required?: boolean;
  getValue?: () => any;
  setValue?: (value: IControlExport) => void;
  customValidators?: Array<ValidatorFn>;
}

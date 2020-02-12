import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IAbstractControlDict } from '../../interfaces/abstract-control-dict.interface';

export class ReactiveFormFactory {
  static createFormGroup(formConfig: IAbstractControlDict) {
    return new FormGroup(formConfig);
  }

  static createFormControl(initialValue: any): FormControl {
    return new FormControl(initialValue);
  }
}

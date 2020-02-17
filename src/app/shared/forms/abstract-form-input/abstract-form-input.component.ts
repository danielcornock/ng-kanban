import { Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormInputField } from '../form-input-field/form-input-field';
import { inputErrors } from '../constants/input-errors';

export abstract class AbstractFormInputComponent {
  @Input() public fieldConfig: FormInputField;

  @ViewChild('input', { static: true }) input: ElementRef;

  public get activeError(): string {
    const error = Object.keys(this.fieldConfig.control.errors)[0];
    return inputErrors[error];
  }

  public async onInputEnter(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.type === 'blur') {
      this.setValue();
      this.blur();
    }
  }

  public showErrors(): boolean {
    return (
      this.fieldConfig.control.invalid &&
      this.fieldConfig.control.touched &&
      this.fieldConfig.control.dirty
    );
  }

  protected setValue(val?: any): void {
    this.fieldConfig.config.setValue({
      value: val ? val : this.input.nativeElement.value,
      name: this.fieldConfig.name
    });
  }

  protected blur(): void {
    this.input.nativeElement.blur();
  }
}

import { Component } from '@angular/core';
import { AbstractFormInputComponent } from '../abstract-form-input/abstract-form-input.component';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss']
})
export class FormInputTextComponent extends AbstractFormInputComponent {}

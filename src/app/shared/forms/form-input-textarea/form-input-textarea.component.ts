import { Component, OnInit } from '@angular/core';
import { AbstractFormInputComponent } from '../abstract-form-input/abstract-form-input.component';

@Component({
  selector: 'app-form-input-textarea',
  templateUrl: './form-input-textarea.component.html',
  styleUrls: ['./form-input-textarea.component.scss']
})
export class FormInputTextareaComponent extends AbstractFormInputComponent {}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTextareaComponent } from './form-input-textarea.component';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormInputField } from '../form-input-field/form-input-field';

describe('FormInputTextareaComponent', () => {
  let component: FormInputTextareaComponent;
  let fixture: ComponentFixture<FormInputTextareaComponent>;

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.formInputTextarea-${element}`));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormInputTextareaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTextareaComponent);
    component = fixture.componentInstance;

    component.fieldConfig = ({
      config: {
        setValue: jasmine.createSpy('setValue')
      },
      control: new FormControl(''),
      name: 'field',
      formGroup: new FormGroup({})
    } as unknown) as FormInputField;
  });

  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should assign the id', () => {
      expect(getByCss('textarea').attributes.id).toBe('field');
    });

    it('should assign the attributes to the label', () => {
      expect(getByCss('label').attributes.for).toBe('field');
    });

    describe('when the input is invalid', () => {
      beforeEach(() => {
        spyOn(component, 'showErrors').and.returnValue(true);
        fixture.detectChanges();
      });

      it('should show the invalid class', () => {
        expect(getByCss('textarea').classes['formInputTextarea--invalid']).toBe(
          true
        );
      });
    });
  });
});

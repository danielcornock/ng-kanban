import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTextComponent } from './form-input-text.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormInputField } from '../form-input-field/form-input-field';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormInputTextComponent', () => {
  let component: FormInputTextComponent;
  let fixture: ComponentFixture<FormInputTextComponent>;

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.formInputText-${element}`));
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormInputTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTextComponent);
    component = fixture.componentInstance;

    component.fieldConfig = ({
      config: {
        setValue: jasmine.createSpy('setValue')
      },
      type: 'email',
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
      expect(getByCss('input').attributes.id).toBe('field');
    });

    it('should assign the for label', () => {
      expect(getByCss('label').attributes.for).toBe('field');
    });

    it('should set the input type', () => {
      expect(getByCss('input').attributes.type).toBe('email');
    });

    it('should not show any errors', () => {
      expect(getByCss('error') === null).toBe(true);
    });

    describe('when there are errors', () => {
      beforeEach(() => {
        spyOn(component, 'showErrors').and.returnValue(true);
        spyOnProperty(component, 'activeError', 'get').and.returnValue('error');

        fixture.detectChanges();
      });

      it('should display the error', () => {
        expect(getByCss('error').nativeElement.innerText).toBe('error');
      });
    });
  });
});

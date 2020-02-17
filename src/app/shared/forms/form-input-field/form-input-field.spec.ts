import { FormInputField } from './form-input-field';
import { IFormInputConfig } from '../interfaces/form-input-config.interface';
import { ReactiveFormFactory } from '../services/form-group/reactive-form.factory';
import { FormControl, Validators } from '@angular/forms';

describe('FormInputField', () => {
  let formInputField: FormInputField,
    inputConfig: IFormInputConfig,
    inputControl: FormControl;

  beforeEach(() => {
    inputConfig = {
      name: 'input-name',
      config: {
        required: true,
        getValue: jasmine.createSpy('getValue').and.returnValue(12),
        setValue: jasmine.createSpy('setValue'),
        customValidators: [jasmine.createSpy('customVal')]
      }
    };

    inputControl = new FormControl(12);
    spyOn(inputControl, 'setValidators');
  });

  describe('when creating', () => {
    beforeEach(() => {
      spyOn(ReactiveFormFactory, 'createFormControl');

      (ReactiveFormFactory.createFormControl as jasmine.Spy).and.returnValue(
        inputControl
      );
      formInputField = FormInputField.create(inputConfig);
    });

    it('should get the value of the field', () => {
      expect(inputConfig.config.getValue).toHaveBeenCalledWith();
    });

    it('should create the angular form control', () => {
      expect(ReactiveFormFactory.createFormControl).toHaveBeenCalledWith(12);
    });

    it('should create the validators', () => {
      expect(inputControl.setValidators).toHaveBeenCalledWith([
        Validators.required,
        inputConfig.config.customValidators[0]
      ]);
    });

    it('should create the form input field', () => {
      expect(formInputField instanceof FormInputField);
      expect(formInputField.name).toBe('input-name');
      expect(formInputField.config).toBe(inputConfig.config);
      expect(formInputField.control).toBe(inputControl);
    });
  });
});

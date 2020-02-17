import { AbstractFormInputComponent } from './abstract-form-input.component';
import { FormInputField } from '../form-input-field/form-input-field';

class TestAbstractFormInputComponent extends AbstractFormInputComponent {}

describe('AbstractFormInputComponent', () => {
  let component: TestAbstractFormInputComponent;

  beforeEach(() => {
    component = new TestAbstractFormInputComponent();

    component.fieldConfig = ({
      config: {
        setValue: jasmine.createSpy('setValue')
      },
      control: {},
      name: 'field',
      formGroup: {}
    } as unknown) as FormInputField;

    component.input = {
      nativeElement: {
        value: 15,
        blur: jasmine.createSpy('blur')
      }
    };
  });

  describe('when adding to the input', () => {
    beforeEach(() => {
      component.onInputEnter({ key: 'Esc', type: 'blur' } as KeyboardEvent);
    });

    it('should set the value', () => {
      expect(component.fieldConfig.config.setValue).toHaveBeenCalledWith({
        name: 'field',
        value: 15
      });
    });

    it('should blur the input', () => {
      expect(component.input.nativeElement.blur).toHaveBeenCalledWith();
    });
  });

  describe('when showing the errors', () => {
    let showError: boolean;

    beforeEach(() => {
      (component.fieldConfig.control as any).invalid = true;
      (component.fieldConfig.control as any).touched = true;
      (component.fieldConfig.control as any).dirty = true;

      showError = component.showErrors();
    });

    it('should return as true', () => {
      expect(showError).toBe(true);
    });
  });

  describe('when getting the active error', () => {
    let error: string;

    beforeEach(() => {
      (component.fieldConfig.control as any).errors = {
        required: true
      };

      error = component.activeError;
    });

    it('should return the error for an required input', () => {
      expect(error).toBe('This field is required.');
    });
  });
});

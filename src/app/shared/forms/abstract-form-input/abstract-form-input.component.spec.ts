import { AbstractFormInputComponent } from './abstract-form-input.component';
import { FormInputField } from '../form-input-field/form-input-field';

class TestAbstractFormInputComponent extends AbstractFormInputComponent {
  public testSetValue(val: any) {
    this.setValue(val);
  }

  public testBlur(): void {
    this.blur();
  }
}

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

  describe('when setting the value', () => {
    beforeEach(() => {
      component.testSetValue(5);
    });

    it('should set the value of the field', () => {
      expect(component.fieldConfig.config.setValue).toHaveBeenCalledWith({
        name: 'field',
        value: 5
      });
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

  describe('when blurring the input', () => {
    beforeEach(() => {
      component.testBlur();
    });

    it('should blur the input', () => {
      expect(component.input.nativeElement.blur).toHaveBeenCalledWith();
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

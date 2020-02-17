import { FormFactory } from './form-factory.service';
import { IFormConfig } from '../../interfaces/form-config.interface';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormInputField } from '../../form-input-field/form-input-field';
import { FormContainer } from '../../form-container/form-container';
import { ReactiveFormFactory } from '../form-group/reactive-form.factory';
import { FormInputFieldStub } from '../../form-input-field/form-input-field.stub';
import { IFormInputConfig } from '../../interfaces/form-input-config.interface';
import { FormContainerStub } from '../../form-container/form-container.stub';
import { IStory } from 'src/app/stories/interfaces/story.interface';
import { IHttpModel } from '../../../api/http-model/http-model.interface';
import { HttpModelStub } from '../../../api/http-model/http-model.stub';

describe('FormFactory', () => {
  let service: FormFactory,
    formContainerStub: FormContainer,
    generatedFormField: FormInputFieldStub,
    inputConfig: IFormInputConfig;

  beforeEach(() => {
    formContainerStub = (new FormContainerStub() as Partial<
      FormContainer
    >) as FormContainer;

    generatedFormField = new FormInputFieldStub();
    generatedFormField.name = 'generated-input';

    spyOn(FormContainer, 'create').and.returnValue(formContainerStub);

    spyOn(FormInputField, 'create').and.returnValue(generatedFormField);

    inputConfig = {
      name: 'input',
      config: {}
    };

    service = new FormFactory();
  });

  describe('when creating a form', () => {
    let formConfig: IFormConfig,
      preGeneratedFormField: FormInputField,
      result: FormContainer;

    beforeEach(() => {
      preGeneratedFormField = (new FormInputFieldStub() as Partial<
        FormInputField
      >) as FormInputField;
      preGeneratedFormField.name = 'provided-field';

      formConfig = {
        fields: [preGeneratedFormField, inputConfig]
      };

      result = service.createForm(formConfig);
    });

    it('should create the form input field for the provided config', () => {
      expect(FormInputField.create).toHaveBeenCalledWith(inputConfig);
    });

    it('should create the form with the two input fields', () => {
      expect(FormContainer.create).toHaveBeenCalledWith([
        preGeneratedFormField,
        generatedFormField
      ]);
    });

    it('should create the form container', () => {
      expect(result).toBe(formContainerStub);
    });
  });

  describe('when creating an input', () => {
    let result: FormInputField;

    beforeEach(() => {
      result = service.createInput(inputConfig);
    });

    it('should call the create form field static method', () => {
      expect(FormInputField.create).toHaveBeenCalledWith(inputConfig);
    });

    it('should return a form field', () => {
      expect(result).toBe(
        (generatedFormField as Partial<FormInputField>) as FormInputField
      );
    });
  });

  describe('when creating a model form', () => {
    let result: any, modelStub: IHttpModel;

    beforeEach(() => {
      inputConfig = {
        name: 'title',
        config: {}
      };

      spyOn(service, 'createForm').and.returnValue(formContainerStub);

      modelStub = new HttpModelStub();
      modelStub.data = {
        title: 'story',
        storyNumber: 12,
        tags: [],
        _id: 'id'
      };

      result = service.createModelForm(modelStub, { fields: [inputConfig] });
    });

    it('should call the create form method with the added getters and setters', () => {
      expect(service.createForm).toHaveBeenCalledWith({
        fields: [
          {
            name: 'title',
            config: {
              getValue: jasmine.any(Function),
              setValue: jasmine.any(Function)
            }
          }
        ]
      });
    });

    describe('when calling get value', () => {
      beforeEach(() => {
        result = (service.createForm as jasmine.Spy).calls
          .argsFor(0)[0]
          .fields[0].config.getValue();
      });

      it('should return the value ', () => {
        expect(result).toBe('story');
      });
    });

    describe('when calling set value', () => {
      beforeEach(() => {
        (service.createForm as jasmine.Spy).calls
          .argsFor(0)[0]
          .fields[0].config.setValue({ name: 'title', value: 'new-title' });
      });

      it('should update the model', () => {
        expect(modelStub.data.title).toBe('new-title');
      });
    });
  });

  describe('when creating an object form', () => {
    let result: any, object: any;

    beforeEach(() => {
      inputConfig = {
        name: 'title',
        config: {}
      };

      spyOn(service, 'createForm').and.returnValue(formContainerStub);

      object = {
        title: 'test'
      };

      result = service.createObjectForm(object, { fields: [inputConfig] });
    });

    it('should call the create form method with the added getters and setters', () => {
      expect(service.createForm).toHaveBeenCalledWith({
        fields: [
          {
            name: 'title',
            config: {
              getValue: jasmine.any(Function),
              setValue: jasmine.any(Function)
            }
          }
        ]
      });
    });

    it('should return the form', () => {
      expect(result).toBe(formContainerStub);
    });
  });
});

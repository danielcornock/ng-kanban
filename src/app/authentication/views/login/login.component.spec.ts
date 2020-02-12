import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/shared/api/http-service/http.service';
import { HttpServiceStub } from 'src/app/shared/api/http-service/http.service.stub';
import { RouterService } from 'src/app/shared/router/router.service';
import { RouterServiceStub } from 'src/app/shared/router/router.service.stub';
import { AuthService } from '../../services/auth/auth.service';
import { AuthServiceStub } from '../../services/auth/auth.service.stub';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestPromise } from 'src/app/testing/test-promise/test-promise';
import { FormFactory } from 'src/app/shared/forms/services/form-factory/form-factory.service';
import { FormFactoryStub } from 'src/app/shared/forms/services/form-factory/form-factory.service.stub';
import { formInputTypes } from 'src/app/shared/forms/constants/form-input-types';
import { FormContainerStub } from 'src/app/shared/forms/form-container/form-container.stub';
import { FormInputTextComponentStub } from 'src/app/shared/forms/form-input-text/form-input-text.component.stub';
import { FormInputFieldStub } from 'src/app/shared/forms/form-input-field/form-input-field.stub';
import { FormInputField } from 'src/app/shared/forms/form-input-field/form-input-field';

describe('LoginComponent', () => {
  let component: LoginComponent,
    fixture: ComponentFixture<LoginComponent>,
    loginForm: FormContainerStub,
    dependencies: {
      formFactory: FormFactoryStub;
      httpService: HttpServiceStub;
      routerService: RouterServiceStub;
      authService: AuthServiceStub;
    };

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css('.login-submit'));
  }

  function getFormFields(): Array<DebugElement> {
    return fixture.debugElement.queryAll(
      By.directive(FormInputTextComponentStub)
    );
  }

  beforeEach(async(async () => {
    dependencies = {
      formFactory: new FormFactoryStub(),
      httpService: new HttpServiceStub(),
      routerService: new RouterServiceStub(),
      authService: new AuthServiceStub()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent, FormInputTextComponentStub],
      providers: [
        { provide: FormFactory, useValue: dependencies.formFactory },
        { provide: HttpService, useValue: dependencies.httpService },
        { provide: RouterService, useValue: dependencies.routerService },
        { provide: AuthService, useValue: dependencies.authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    loginForm = new FormContainerStub();
    loginForm.fields = {
      email: ('email' as unknown) as FormInputField,
      password: ('password' as unknown) as FormInputField
    };

    (dependencies.formFactory.createForm as jasmine.Spy).and.returnValue(
      loginForm
    );
  });

  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create the form', () => {
      expect(dependencies.formFactory.createForm).toHaveBeenCalledWith({
        fields: [
          {
            name: 'email',
            type: formInputTypes.EMAIL,
            config: {
              required: true,
              customValidators: [jasmine.any(Function)],
              setValue: jasmine.any(Function)
            }
          },
          {
            name: 'password',
            type: formInputTypes.PASSWORD,
            config: {
              required: true,
              setValue: jasmine.any(Function)
            }
          }
        ]
      });
    });

    it('should display the email field', () => {
      expect(getFormFields()[0].componentInstance.fieldConfig).toBe('email');
      expect(getFormFields()[1].componentInstance.fieldConfig).toBe('password');
    });

    describe('when the user sets the values for the email and password', () => {
      beforeEach(() => {
        (dependencies.formFactory.createForm as jasmine.Spy).calls
          .argsFor(0)[0]
          .fields[0].config.setValue({ name: 'email', value: 'dan@me.com' });
        (dependencies.formFactory.createForm as jasmine.Spy).calls
          .argsFor(0)[0]
          .fields[1].config.setValue({ name: 'password', value: 'password' });
      });

      describe('when the user submits the form', () => {
        let postPromise: TestPromise<any>;

        beforeEach(() => {
          postPromise = new TestPromise();

          (dependencies.httpService.post as jasmine.Spy).and.returnValue(
            postPromise.promise
          );

          getSubmitButton().nativeElement.click();
        });

        it('should post the results to the API', () => {
          expect(dependencies.httpService.post).toHaveBeenCalledWith(
            'auth/login',
            {
              email: 'dan@me.com',
              password: 'password'
            }
          );
        });

        describe('when the user logs in successfully', () => {
          beforeEach(fakeAsync(() => {
            postPromise.resolve({ jwt: 'test-jwt' });

            tick();

            fixture.detectChanges();
          }));

          it('should set the jwt to the return', () => {
            expect(dependencies.authService.setJwt).toHaveBeenCalledWith(
              'test-jwt'
            );
          });

          it('should navigate the user to the home page', () => {
            expect(dependencies.routerService.navigate).toHaveBeenCalledWith(
              'home'
            );
          });
        });
      });
    });
  });
});

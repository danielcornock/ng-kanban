import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { RouterService } from "src/app/shared/router/router.service";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";
import { AuthService } from "../../services/auth/auth.service";
import { AuthServiceStub } from "../../services/auth/auth.service.stub";
import { SharedModule } from "src/app/shared/shared.module";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { TestPromise } from "src/app/testing/test-promise/test-promise";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dependencies: {
    formBuilder: FormBuilder;
    httpService: HttpServiceStub;
    routerService: RouterServiceStub;
    authService: AuthServiceStub;
  };

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css(".login-submit"));
  }

  beforeEach(async(async () => {
    dependencies = {
      formBuilder: new FormBuilder(),
      httpService: new HttpServiceStub(),
      routerService: new RouterServiceStub(),
      authService: new AuthServiceStub()
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: dependencies.formBuilder },
        { provide: HttpService, useValue: dependencies.httpService },
        { provide: RouterService, useValue: dependencies.routerService },
        { provide: AuthService, useValue: dependencies.authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    const loginForm = dependencies.formBuilder.group({
      email: [""],
      password: [""]
    });
    spyOn(dependencies.formBuilder, "group").and.returnValue(loginForm);
    fixture.detectChanges();
  });

  describe("on initialisation", () => {
    beforeEach(() => {});

    it("should create the form", () => {
      expect(dependencies.formBuilder.group).toHaveBeenCalledWith({
        email: ["", [jasmine.any(Function), jasmine.any(Function)]],
        password: ["", jasmine.any(Function)]
      });
    });

    describe("when the user submits the form", () => {
      let postPromise: TestPromise<any>;

      beforeEach(() => {
        component.loginForm.value.email = "daniel@me.com";
        postPromise = new TestPromise();

        (dependencies.httpService.post as jasmine.Spy).and.returnValue(
          postPromise.promise
        );

        getSubmitButton().nativeElement.click();
      });

      it("should post the results to the API", () => {
        expect(dependencies.httpService.post).toHaveBeenCalledWith(
          "auth/login",
          {
            email: "daniel@me.com",
            password: ""
          }
        );
      });

      describe("when the user logs in successfully", () => {
        beforeEach(fakeAsync(() => {
          postPromise.resolve({ jwt: "test-jwt" });

          tick();

          fixture.detectChanges();
        }));

        it("should set the jwt to the return", () => {
          expect(dependencies.authService.setJwt).toHaveBeenCalledWith(
            "test-jwt"
          );
        });

        it("should navigate the user to the home page", () => {
          expect(dependencies.routerService.navigate).toHaveBeenCalledWith(
            "home"
          );
        });
      });
    });
  });
});

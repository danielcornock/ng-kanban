import { async, ComponentFixture, TestBed } from "@angular/core/testing";

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

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let httpService: HttpServiceStub;
  let routerService: RouterServiceStub;
  let authService: AuthServiceStub;

  function getSubmitButton(): DebugElement {
    return fixture.debugElement.query(By.css(".login-submit"));
  }

  beforeEach(async(async () => {
    (formBuilder = new FormBuilder()),
      (httpService = new HttpServiceStub()),
      (routerService = new RouterServiceStub()),
      (authService = new AuthServiceStub());

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: HttpService, useValue: httpService },
        { provide: RouterService, useValue: routerService },
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    const loginForm = formBuilder.group({
      email: [""],
      password: [""]
    });
    spyOn(formBuilder, "group").and.returnValue(loginForm);
    fixture.detectChanges();
  });

  describe("on initialisation", () => {
    beforeEach(() => {});

    it("should create the form", () => {
      expect(formBuilder.group).toHaveBeenCalledWith({
        email: ["", [jasmine.any(Function), jasmine.any(Function)]],
        password: ["", jasmine.any(Function)]
      });
    });

    describe("when the user submits the form", () => {
      let httpSubject: Subject<any> = new Subject<any>();

      beforeEach(() => {
        component.loginForm.value.email = "daniel@me.com";
        (httpService.post as jasmine.Spy).and.returnValue(
          httpSubject.asObservable()
        );
        getSubmitButton().nativeElement.click();
      });

      it("should post the results to the API", () => {
        expect(httpService.post).toHaveBeenCalledWith("auth/login", {
          email: "daniel@me.com",
          password: ""
        });
      });

      describe("when the results are posted successfully", () => {
        beforeEach(() => {
          httpSubject.next({ jwt: "jwt" });
        });

        it("should set the jwt to the return", () => {
          expect(authService.setJwt).toHaveBeenCalledWith("jwt");
        });

        it("should navigate the user to the home page", () => {
          expect(routerService.navigate).toHaveBeenCalledWith("home");
        });
      });
    });
  });
});

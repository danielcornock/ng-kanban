import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { AuthService } from "src/app/authentication/services/auth/auth.service";
import { AuthServiceStub } from "src/app/authentication/services/auth/auth.service.stub";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";
import { RouterService } from "src/app/shared/router/router.service";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { BoardsListComponentStub } from "src/app/boards/components/boards-list/boards-list.component.stub";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dependencies: {
    authService: AuthServiceStub;
    router: RouterServiceStub;
  };

  function getLogoutButton(): DebugElement {
    return fixture.debugElement.query(By.css("button"));
  }

  beforeEach(async(() => {
    dependencies = {
      authService: new AuthServiceStub(),
      router: new RouterServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [HomeComponent, BoardsListComponentStub],
      providers: [
        { provide: AuthService, useValue: dependencies.authService },
        { provide: RouterService, useValue: dependencies.router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("when the logout button is clicked", () => {
    beforeEach(() => {
      getLogoutButton().nativeElement.click();
    });

    it("should log out the user", () => {
      expect(dependencies.authService.logout).toHaveBeenCalledWith();
    });

    it("should navigate to the login screen", () => {
      expect(dependencies.router.navigate).toHaveBeenCalledWith("login");
    });
  });
});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './authentication/services/auth/auth.service';
import { AuthServiceStub } from './authentication/services/auth/auth.service.stub';
import { HeaderComponentStub } from './shared/layouts/header/header.component.stub';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    dependencies: {
      authService: AuthServiceStub;
    };

  function getHeader(): DebugElement {
    return fixture.debugElement.query(By.directive(HeaderComponentStub));
  }

  beforeEach(async(() => {
    dependencies = {
      authService: new AuthServiceStub()
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: dependencies.authService }],
      declarations: [AppComponent, HeaderComponentStub]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      (dependencies.authService.isAuthenticated as jasmine.Spy).and.returnValue(
        false
      );

      fixture.detectChanges();
    });

    it('should not display the header', () => {
      expect(getHeader() === null).toBe(true);
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      (dependencies.authService.isAuthenticated as jasmine.Spy).and.returnValue(
        true
      );
      fixture.detectChanges();
    });

    it('should display the header', () => {
      expect(getHeader() === null).toBe(false);
    });
  });
});

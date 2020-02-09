import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { IconComponentStub } from "src/app/icons/icon/icon.component.stub";
import { RouterServiceStub } from "../../router/router.service.stub";
import { RouterService } from "../../router/router.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dependencies: {
    routerService: RouterServiceStub;
  };

  function getByCss(element: string): DebugElement {
    return fixture.debugElement.query(By.css(`.header-${element}`));
  }

  beforeEach(async(() => {
    dependencies = {
      routerService: new RouterServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent, IconComponentStub],
      providers: [
        { provide: RouterService, useValue: dependencies.routerService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  describe("when the user is on the board page", () => {
    beforeEach(() => {
      (dependencies.routerService.getUrlParams as jasmine.Spy).and.returnValue(
        "boardId"
      );
      fixture.detectChanges();
    });

    it("should display the back button", () => {
      expect(getByCss("backButton") === null).toBe(false);
    });

    describe("when the back button is clicked", () => {
      beforeEach(() => {
        getByCss("backButton").nativeElement.click();
      });

      it("should navigate to the home page", () => {
        expect(dependencies.routerService.navigate).toHaveBeenCalledWith(
          "home"
        );
      });
    });
  });
});

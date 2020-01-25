import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IconComponent } from "./icon.component";
import { FeatherComponentStub } from "../testing/feather.component.stub";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("IconComponent", () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  function getIcon(): DebugElement {
    return fixture.debugElement.query(By.directive(FeatherComponentStub));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, FeatherComponentStub]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;

    component.appIcon = "icon";
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should pass the icon name to the feather icon", () => {
      expect(getIcon().componentInstance.name).toBe("icon");
    });
  });
});

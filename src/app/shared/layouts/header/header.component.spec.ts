import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { BoardApiServiceStub } from "src/app/boards/services/board-api/board-api.service.stub";
import { BoardApiService } from "src/app/boards/services/board-api/board-api.service";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should build", () => {
    expect(component).toBeTruthy();
  });
});

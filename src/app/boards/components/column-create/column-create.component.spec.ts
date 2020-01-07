import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnCreateComponent } from "./column-create.component";
import { SharedModule } from "src/app/shared/shared.module";

describe("ColumnCreateComponent", () => {
  let component: ColumnCreateComponent;
  let fixture: ComponentFixture<ColumnCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ColumnCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

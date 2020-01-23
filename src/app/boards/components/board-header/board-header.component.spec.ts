import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardHeaderComponent } from "./board-header.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("BoardHeaderComponent", () => {
  let component: BoardHeaderComponent;
  let fixture: ComponentFixture<BoardHeaderComponent>;

  function getBoardTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".boardHeader-title"));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    component.appBoardHeaderTitle = "Test board";
  });

  describe("on initialisation", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should display the board title", () => {
      expect(getBoardTitle().nativeElement.innerText).toBe("Test board");
    });
  });
});

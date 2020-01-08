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
  let dependencies: {
    boardApiService: BoardApiServiceStub;
  };

  function getTitle(): DebugElement {
    return fixture.debugElement.query(By.css(".header-boardTitle"));
  }

  beforeEach(async(() => {
    dependencies = {
      boardApiService: new BoardApiServiceStub()
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: BoardApiService, useValue: dependencies.boardApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("when a board title is set", () => {
    beforeEach(() => {
      dependencies.boardApiService.boardTitle.next("board-title");
      fixture.detectChanges();
    });

    it("should render the title", () => {
      expect(getTitle().nativeElement.innerText).toBe("board-title");
    });
  });
});

import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-column-create",
  template: ""
})
export class ColumnCreateComponentStub {
  @Output() appColumnCreateOnCreate: EventEmitter<string> = new EventEmitter<
    string
  >();
}

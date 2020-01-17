import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IColumn } from "../../interfaces/column.interface";

@Component({
  selector: "app-column",
  template: ""
})
export class ColumnComponentStub {
  @Input() appColumn: IColumn;

  @Input() appColumnBoardId: string;

  @Output() appColumnOnDrop: EventEmitter<void> = new EventEmitter<void>();
}

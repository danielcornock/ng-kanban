import { Component, OnInit, Input } from "@angular/core";
import { IColumn } from "../../interfaces/column.interface";

@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrls: ["./column.component.scss"]
})
export class ColumnComponent implements OnInit {
  @Input() appColumn: IColumn;
  constructor() {}

  ngOnInit() {}
}

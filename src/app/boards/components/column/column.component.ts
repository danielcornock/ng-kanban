import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrls: ["./column.component.scss"]
})
export class ColumnComponent implements OnInit {
  @Input() appColumn;
  constructor() {}

  ngOnInit() {}
}

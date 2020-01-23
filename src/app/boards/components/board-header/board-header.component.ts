import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-board-header",
  templateUrl: "./board-header.component.html",
  styleUrls: ["./board-header.component.scss"]
})
export class BoardHeaderComponent implements OnInit {
  @Input() appBoardHeaderTitle: string;

  constructor() {}

  ngOnInit() {}
}

import { Component, Input } from "@angular/core";
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";

@Component({
  selector: "app-board-header",
  template: ""
})
export class BoardHeaderComponentStub {
  @Input() appBoardHeaderTitle: string;
  @Input() appBoardHeaderBoardModel: IHttpModel;
}

import { Component, OnInit, Input } from "@angular/core";
import { ModalService } from "src/app/shared/modal/modal-service/modal.service";
import { TagsModalComponent } from "../../../stories/components/tags-modal/tags-modal.component";

@Component({
  selector: "app-board-header",
  templateUrl: "./board-header.component.html",
  styleUrls: ["./board-header.component.scss"]
})
export class BoardHeaderComponent implements OnInit {
  @Input() appBoardHeaderTitle: string;

  constructor(private readonly _modalService: ModalService) {}

  ngOnInit() {}

  public openTagsModal(): void {
    this._modalService.openModal(TagsModalComponent, {});
  }
}

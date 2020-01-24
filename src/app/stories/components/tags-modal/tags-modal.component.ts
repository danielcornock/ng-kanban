import { Component, OnInit, Inject } from "@angular/core";
import { ModalDialog } from "src/app/shared/modal/modal-dialog/modal-dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { BoardConfigStoreService } from "src/app/boards/services/board-config-store/board-config-store.service";
import { IBoardConfig } from "src/app/boards/interfaces/board-config.interface";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-tags-modal",
  templateUrl: "./tags-modal.component.html",
  styleUrls: ["./tags-modal.component.scss"]
})
export class TagsModalComponent extends ModalDialog<TagsModalComponent>
  implements OnInit {
  public tags: Array<{ color: string; label: string }>;
  public config: IBoardConfig;
  private _configObservable$: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    matDialogRef: MatDialogRef<TagsModalComponent>,
    private readonly _boardConfigStoreService: BoardConfigStoreService
  ) {
    super(matDialogRef, data);
  }

  ngOnInit() {
    this._configObservable$ = this._boardConfigStoreService
      .getConfig()
      .subscribe((data: IBoardConfig) => {
        this.config = data;
        this.tags = data.tags;
      });
  }

  public async saveTags(): Promise<void> {
    await this._boardConfigStoreService.saveConfig(this.config);
    this.closeModal();
  }

  public resetTag(index: number): void {
    this.tags[index].label = "";
  }

  public onTextEnter(event: KeyboardEvent, index) {
    this.tags[index].label = (event.target as HTMLInputElement).value;
  }

  ngOnDestroy(): void {
    this._configObservable$.unsubscribe();
  }
}

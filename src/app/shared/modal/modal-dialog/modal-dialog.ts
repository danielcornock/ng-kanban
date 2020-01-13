import { MatDialogRef } from "@angular/material";
import { ComponentType } from "@angular/cdk/portal";

export abstract class ModalDialog<T> {
  protected readonly _matDialogRef: MatDialogRef<T>;
  public dialogData: any;

  constructor(matDialogRef: MatDialogRef<T>) {
    this._matDialogRef = matDialogRef;
  }

  public closeModal(): void {
    this._matDialogRef.close();
  }

  protected _formatData(data: any) {
    this.dialogData = data.data;
  }
}

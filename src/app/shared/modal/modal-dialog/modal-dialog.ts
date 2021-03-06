import { MatDialogRef } from "@angular/material";
import { ComponentType } from "@angular/cdk/portal";

export abstract class ModalDialog<T> {
  protected readonly _matDialogRef: MatDialogRef<T>;
  public dialogData: any;

  constructor(matDialogRef: MatDialogRef<T>, data?: any) {
    this._matDialogRef = matDialogRef;
    this._formatData(data);
  }

  public closeModal(data?: any): void {
    this._matDialogRef.close(data);
  }

  protected _formatData(data: any) {
    this.dialogData = data.data;
  }
}

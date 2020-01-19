import { Injectable, Component, Type } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ComponentType } from "@angular/cdk/portal";
import { ModalDialog } from "../modal-dialog/modal-dialog";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  constructor(private readonly _matDialog: MatDialog) {}

  public openModal<T extends ModalDialog<T>>(component: any, data: any): void {
    this._matDialog.open(component, {
      data: {
        data
      }
    });
  }
}

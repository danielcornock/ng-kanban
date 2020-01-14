import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./layouts/header/header.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatDialogModule,
  MatDialogRef,
  MatNativeDateModule
} from "@angular/material";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HeaderComponent,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class SharedModule {}

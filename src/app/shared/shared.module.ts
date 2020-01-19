import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./layouts/header/header.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatDialogModule, MatDialogRef } from "@angular/material";
import { FormInputTextareaComponent } from "./forms/form-input-textarea/form-input-textarea.component";
import { TextAreaAutoSizeDirective } from './forms/directives/text-area-auto-size.directive';

@NgModule({
  declarations: [HeaderComponent, FormInputTextareaComponent, TextAreaAutoSizeDirective],
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
    BrowserAnimationsModule,
    FormInputTextareaComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class SharedModule {}

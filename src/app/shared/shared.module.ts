import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef } from '@angular/material';
import { FormInputTextareaComponent } from './forms/form-input-textarea/form-input-textarea.component';
import { TextAreaAutoSizeDirective } from './forms/directives/text-area-auto-size.directive';
import { IconsModule } from '../icons/icons.module';
import { FormInputTextComponent } from './forms/form-input-text/form-input-text.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormInputTextareaComponent,
    TextAreaAutoSizeDirective,
    FormInputTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
    IconsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HeaderComponent,
    MatDialogModule,
    BrowserAnimationsModule,
    FormInputTextareaComponent,
    IconsModule,
    FormInputTextComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class SharedModule {}

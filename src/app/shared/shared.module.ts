import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./layouts/header/header.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  exports: [FormsModule, ReactiveFormsModule, DragDropModule, HeaderComponent]
})
export class SharedModule {}

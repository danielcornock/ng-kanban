import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./views/home/home.component";
import { BoardsModule } from "../boards/boards.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, BoardsModule]
})
export class HomeModule {}

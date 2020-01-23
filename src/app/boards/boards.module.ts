import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsListComponent } from "./components/boards-list/boards-list.component";
import { BoardComponent } from "./views/board/board.component";
import { ColumnComponent } from "./components/column/column.component";
import { StoriesModule } from "../stories/stories.module";
import { ColumnCreateComponent } from "./components/column-create/column-create.component";
import { SharedModule } from "../shared/shared.module";
import { BoardCreateComponent } from './components/board-create/board-create.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent,
    ColumnComponent,
    ColumnCreateComponent,
    BoardCreateComponent,
    BoardHeaderComponent
  ],
  imports: [CommonModule, StoriesModule, SharedModule],
  exports: [BoardsListComponent]
})
export class BoardsModule {}

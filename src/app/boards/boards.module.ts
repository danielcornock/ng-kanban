import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsListComponent } from "./components/boards-list/boards-list.component";
import { BoardComponent } from "./views/board/board.component";
import { ColumnComponent } from "./components/column/column.component";
import { StoriesModule } from "../stories/stories.module";
import { ColumnCreateComponent } from "./components/column-create/column-create.component";
import { SharedModule } from "../shared/shared.module";
import { BoardCreateComponent } from "./components/board-create/board-create.component";
import { BoardHeaderComponent } from "./components/board-header/board-header.component";
import { GithubConfigModalComponent } from "./components/github-config-modal/github-config-modal.component";
import { GithubProfileComponent } from "./components/github-profile/github-profile.component";
import { GithubUserSearchComponent } from "./components/github-user-search/github-user-search.component";
import { GithubRepoListComponent } from './components/github-repo-list/github-repo-list.component';

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent,
    ColumnComponent,
    ColumnCreateComponent,
    BoardCreateComponent,
    BoardHeaderComponent,
    GithubConfigModalComponent,
    GithubProfileComponent,
    GithubUserSearchComponent,
    GithubRepoListComponent
  ],
  entryComponents: [GithubConfigModalComponent],
  imports: [CommonModule, StoriesModule, SharedModule],
  exports: [BoardsListComponent]
})
export class BoardsModule {}

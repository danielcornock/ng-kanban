import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoryComponent } from "./components/story/story.component";
import { StoryCreateComponent } from "./components/story-create/story-create.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [StoryComponent, StoryCreateComponent],
  imports: [CommonModule, SharedModule],
  exports: [StoryComponent, StoryCreateComponent]
})
export class StoriesModule {}

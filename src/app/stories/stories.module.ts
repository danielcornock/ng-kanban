import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoryComponent } from "./components/story/story.component";
import { StoryCreateComponent } from "./components/story-create/story-create.component";
import { SharedModule } from "../shared/shared.module";
import { EditStoryModalComponent } from "./components/edit-story-modal/edit-story-modal.component";
import { FormInputTextareaComponent } from "../shared/forms/form-input-textarea/form-input-textarea.component";

@NgModule({
  declarations: [StoryComponent, StoryCreateComponent, EditStoryModalComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [EditStoryModalComponent],
  exports: [StoryComponent, StoryCreateComponent]
})
export class StoriesModule {}

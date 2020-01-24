import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoryComponent } from "./components/story/story.component";
import { StoryCreateComponent } from "./components/story-create/story-create.component";
import { SharedModule } from "../shared/shared.module";
import { EditStoryModalComponent } from "./components/edit-story-modal/edit-story-modal.component";
import { FormInputTextareaComponent } from "../shared/forms/form-input-textarea/form-input-textarea.component";
import { TagsModalComponent } from "./components/tags-modal/tags-modal.component";
import { TagsComponent } from "./components/tags/tags.component";
import { AddStoryTagsComponent } from './components/add-story-tags/add-story-tags.component';

@NgModule({
  declarations: [
    StoryComponent,
    StoryCreateComponent,
    EditStoryModalComponent,
    TagsModalComponent,
    TagsComponent,
    AddStoryTagsComponent
  ],
  imports: [CommonModule, SharedModule],
  entryComponents: [EditStoryModalComponent, TagsModalComponent],
  exports: [StoryComponent, StoryCreateComponent, TagsModalComponent]
})
export class StoriesModule {}

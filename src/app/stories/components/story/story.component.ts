import { Component, OnInit, Input } from "@angular/core";
import { IStory } from "../../interfaces/story.interface";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"]
})
export class StoryComponent implements OnInit {
  @Input() appStory: IStory;
  constructor() {}

  ngOnInit() {}
}

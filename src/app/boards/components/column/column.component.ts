import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { IColumn } from "../../interfaces/column.interface";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { IStory } from "src/app/stories/interfaces/story.interface";

@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrls: ["./column.component.scss"]
})
export class ColumnComponent implements OnInit, AfterViewInit {
  @Input() appColumn: IColumn;

  @Input() appColumnBoardId: string;

  @Output() appColumnOnDrop: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("columnContainer", { static: true }) columnContainer: ElementRef;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._adjustPaddingForScrollBar();
  }

  public drop(event: CdkDragDrop<IStory>) {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      if (event.currentIndex === event.previousIndex) {
        return;
      }

      moveItemInArray(
        this.appColumn.stories,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        (event.previousContainer.data as unknown) as any,
        (event.container.data as unknown) as any,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.appColumnOnDrop.emit();
  }

  private _adjustPaddingForScrollBar(): void {
    const columnElement = this.columnContainer.nativeElement;

    if (columnElement.scrollHeight > columnElement.clientHeight) {
      this.columnContainer.nativeElement.style.paddingRight = "1rem";
    }
  }
}

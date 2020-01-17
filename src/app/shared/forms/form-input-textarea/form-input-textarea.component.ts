import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IControlExport } from "../interfaces/control-export.interface";

@Component({
  selector: "app-form-input-textarea",
  templateUrl: "./form-input-textarea.component.html",
  styleUrls: ["./form-input-textarea.component.scss"]
})
export class FormInputTextareaComponent implements OnInit {
  @Input() public parentForm: FormGroup;
  @Input() public controlName: string;
  @Output() public setValue: EventEmitter<IControlExport> = new EventEmitter<
    IControlExport
  >();

  @ViewChild("textarea", { static: false })
  public input: ElementRef;

  constructor() {}

  ngOnInit() {}

  public async onTitleEnter(e: KeyboardEvent) {
    if (e.keyCode === 13 || e.type === "blur") {
      this.setValue.emit({
        value: (e.target as HTMLInputElement).value,
        name: this.controlName
      });
      this.input.nativeElement.blur();
    }
  }
}

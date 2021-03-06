import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "src/app/shared/api/http-service/http.service";

@Component({
  selector: "app-column-create",
  templateUrl: "./column-create.component.html",
  styleUrls: ["./column-create.component.scss"]
})
export class ColumnCreateComponent implements OnInit {
  @Output() appColumnCreateOnCreate: EventEmitter<string> = new EventEmitter<
    string
  >();

  public columnForm: FormGroup;
  public isActive: boolean;

  private readonly _formBuilder: FormBuilder;
  private readonly _httpService: HttpService;
  constructor(formBuilder: FormBuilder, httpService: HttpService) {
    this._formBuilder = formBuilder;
    this._httpService = httpService;
  }

  ngOnInit() {
    this._initialiseForm();
  }

  public setActive(active: boolean): void {
    this.isActive = active;
  }

  public addColumn() {
    this.appColumnCreateOnCreate.emit(this.columnForm.value.title);
    this.columnForm.reset();
    this.setActive(false);
  }

  private _initialiseForm(): void {
    this.columnForm = this._formBuilder.group({
      title: ["", Validators.required]
    });
  }
}

import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-github-user-search",
  templateUrl: "./github-user-search.component.html",
  styleUrls: ["./github-user-search.component.scss"]
})
export class GithubUserSearchComponent implements OnInit {
  @Output() appGithubUserSearchOnSearch: EventEmitter<
    string
  > = new EventEmitter<string>();

  public searchForm: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit() {
    this._createForm();
  }

  public emitSearchedUsername(): void {
    this.appGithubUserSearchOnSearch.emit(this.searchForm.value.username);
  }

  private _createForm(): void {
    this.searchForm = this._formBuilder.group({
      username: [""]
    });
  }
}

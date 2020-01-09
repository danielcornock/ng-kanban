import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { BoardRefreshService } from "../../services/board-refresh/board-refresh.service";

@Component({
  selector: "app-board-create",
  templateUrl: "./board-create.component.html",
  styleUrls: ["./board-create.component.scss"]
})
export class BoardCreateComponent implements OnInit {
  public createBoardForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _httpService: HttpService,
    private readonly _boardRefreshService: BoardRefreshService
  ) {}

  ngOnInit() {
    this._initialiseForm();
  }

  public async createBoard(): Promise<void> {
    await this._httpService.post("boards", this.createBoardForm.value);
    this._boardRefreshService.boardListRefresh.next();
  }

  private _initialiseForm(): void {
    this.createBoardForm = this._formBuilder.group({
      title: [null, Validators.required]
    });
  }
}

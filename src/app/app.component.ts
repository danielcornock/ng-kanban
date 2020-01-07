import { Component, OnInit } from "@angular/core";
import { AuthService } from "./authentication/services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(private readonly _authService: AuthService) {}

  ngOnInit() {
    this._isAuthenticated();
  }

  private _isAuthenticated() {
    this.isLoggedIn = this._authService.isAuthenticated();
  }
}

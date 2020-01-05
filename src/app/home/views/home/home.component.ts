import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentication/services/auth/auth.service";
import { RouterService } from "src/app/shared/router/router.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  public logout(): void {
    this._authService.logout();
  }
}

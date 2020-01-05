import { Injectable } from "@angular/core";
import { RouterService } from "src/app/shared/router/router.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private readonly _router: RouterService) {}

  public setJwt(token: string): void {
    localStorage.setItem("jwt_token", token);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("jwt_token");
  }

  public logout() {
    localStorage.removeItem("jwt_token");
    this._router.navigate("login");
  }
}

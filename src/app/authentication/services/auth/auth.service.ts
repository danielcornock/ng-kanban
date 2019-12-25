import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  public setJwt(token: string): void {
    localStorage.setItem("jwt_token", token);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("jwt_token");
  }

  public logout() {
    localStorage.removeItem("jwt_token");
  }
}

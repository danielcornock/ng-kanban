import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { RouterService } from "src/app/shared/router/router.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private _authService: AuthService;
  private _router: RouterService;

  constructor(authService: AuthService, router: RouterService) {
    this._authService = authService;
    this._router = router;
  }

  canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate("login");
      return false;
    }
    return true;
  }
}

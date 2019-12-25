import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private readonly _ngZone: NgZone;
  private readonly _router: Router;

  constructor(router: Router, ngZone: NgZone) {
    this._router = router;
    this._ngZone = ngZone;
  }

  public navigate(url: string): void {
    this._ngZone
      .run(() => this._router.navigate([url]))
      .then(() => null)
      .catch(() => null);
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private readonly _ngZone: NgZone;
  private readonly _router: Router;
  private readonly _activatedRoute: ActivatedRoute;

  constructor(router: Router, ngZone: NgZone, activatedRoute: ActivatedRoute) {
    this._router = router;
    this._ngZone = ngZone;
    this._activatedRoute = activatedRoute;
  }

  public navigate(url: string): void {
    this._ngZone
      .run(() => this._router.navigate([url]))
      .then(() => null)
      .catch(() => null);
  }

  public getUrlParams(requestedParam: string): string {
    // TODO This is hacky - fix it
    return this._activatedRoute.snapshot.children[0].params[requestedParam];
  }
}

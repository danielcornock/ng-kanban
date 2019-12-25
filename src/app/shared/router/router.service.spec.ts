import { TestBed } from "@angular/core/testing";

import { RouterService } from "./router.service";
import { NgZone } from "@angular/core";
import { Router } from "@angular/router";

describe("RouterService", () => {
  let service: RouterService, ngZone: NgZone, router: Router;

  beforeEach(() => {
    ngZone = (new NgZoneStub() as Partial<NgZone>) as NgZone;
    router = (new RouterStub() as Partial<Router>) as Router;
    service = new RouterService(router, ngZone);
  });

  describe("when navigating to a url", () => {
    let navigateFn: jasmine.Spy;
    beforeEach(() => {
      (ngZone.run as jasmine.Spy).and.returnValue(Promise.resolve());
      service.navigate("url");
      navigateFn = (ngZone.run as jasmine.Spy).calls.mostRecent().args[0];
    });

    it("should call run on ngZone", () => {
      expect(ngZone.run).toHaveBeenCalledWith(jasmine.any(Function));
    });

    describe("when the value passed to run is executed", () => {
      beforeEach(() => {
        navigateFn();
      });

      it("should navigate to the requested url", () => {
        expect(router.navigate).toHaveBeenCalledWith(["url"]);
      });
    });
  });
});

class NgZoneStub {
  public run = jasmine.createSpy("NgZoneStub.run");
}

class RouterStub {
  public navigate = jasmine.createSpy("Router.navigate");
}

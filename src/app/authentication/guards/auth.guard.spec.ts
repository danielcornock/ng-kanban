import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "../services/auth/auth.service";
import { AuthServiceStub } from "../services/auth/auth.service.stub";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";
import { RouterService } from "src/app/shared/router/router.service";

describe("AuthGuard", () => {
  let authGuard: AuthGuard, authService: AuthService, router: RouterService;
  beforeEach(() => {
    authService = new AuthServiceStub();
    router = (new RouterServiceStub() as Partial<
      RouterService
    >) as RouterService;
    authGuard = new AuthGuard(authService, router);
  });

  describe("when checking if a user may proceed", () => {
    let result: Boolean;

    describe("when a user can be authenticated", () => {
      beforeEach(() => {
        (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
        result = authGuard.canActivate();
      });

      it("should return true", () => {
        expect(result).toBe(true);
      });
    });

    describe("when a user cannot be authenticated", () => {
      beforeEach(() => {
        (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
        result = authGuard.canActivate();
      });

      it("should navigate to the login page", () => {
        expect(router.navigate).toHaveBeenCalledWith("login");
      });

      it("should return false", () => {
        expect(result).toBe(false);
      });
    });
  });
});

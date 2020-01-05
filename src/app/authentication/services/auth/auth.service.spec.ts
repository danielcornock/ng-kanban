import { AuthService } from "./auth.service";
import { RouterService } from "src/app/shared/router/router.service";
import { RouterServiceStub } from "src/app/shared/router/router.service.stub";

describe("AuthService", () => {
  let service: AuthService, router: RouterService;

  beforeEach(() => {
    router = (new RouterServiceStub() as Partial<
      RouterService
    >) as RouterService;
    service = new AuthService(router);
  });

  describe("when setting the jwt", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem");
      service.setJwt("token");
    });

    it("should set the jwt in local storage", () => {
      expect(localStorage.setItem).toHaveBeenCalledWith("jwt_token", "token");
    });
  });

  describe("when checking if the user is authenticated", () => {
    let result: boolean;

    describe("when a user has a jwt stored", () => {
      beforeEach(() => {
        spyOn(localStorage, "getItem").and.returnValue("token");
        result = service.isAuthenticated();
      });

      it("should return true", () => {
        expect(result).toBe(true);
      });
    });

    describe("when a user does not have a jwt stored", () => {
      beforeEach(() => {
        spyOn(localStorage, "getItem").and.returnValue(undefined);
        result = service.isAuthenticated();
      });

      it("should return false", () => {
        expect(result).toBe(false);
      });
    });
  });

  describe("when logging out a user", () => {
    beforeEach(() => {
      spyOn(localStorage, "removeItem");
      service.logout();
    });

    it("should remove the jwt from local storage", () => {
      expect(localStorage.removeItem).toHaveBeenCalledWith("jwt_token");
    });

    it("should redirect the user to the login page", () => {
      expect(router.navigate).toHaveBeenCalledWith("login");
    });
  });
});

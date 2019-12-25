export class AuthServiceStub {
  public setJwt = jasmine.createSpy("AuthServiceStub.setJwt");

  public isAuthenticated = jasmine.createSpy("AuthServiceStub.isAuthenticated");

  public logout = jasmine.createSpy("AuthServiceStub.logout");
}

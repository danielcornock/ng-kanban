import { TestBed } from "@angular/core/testing";

import { GithubService } from "./github.service";
import { HttpClientStub } from "src/app/shared/api/http-service/testing/http-client.stub";
import { HttpClient } from "@angular/common/http";

describe("GithubService", () => {
  let service: GithubService,
    apiUrl: string,
    result: any,
    dependencies: {
      httpModule: HttpClientStub;
    };

  function getReturnPromise(type: string) {
    (dependencies.httpModule[type] as jasmine.Spy).and.returnValue({
      toPromise: jasmine
        .createSpy("toPromise")
        .and.returnValue(`${type}Promise`)
    });
  }
  beforeEach(() => {
    dependencies = {
      httpModule: new HttpClientStub()
    };

    apiUrl = "https://api.github.com";

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: dependencies.httpModule }]
    });

    service = TestBed.get(GithubService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("when searching for users ", () => {
    beforeEach(() => {
      getReturnPromise("get");
      result = service.searchUsers("testuser");
    });

    it("should fetch the users profile", () => {
      expect(dependencies.httpModule.get).toHaveBeenCalledWith(
        apiUrl + "/users/testuser"
      );
    });

    it("should return the promise", () => {
      expect(result).toBe("getPromise");
    });
  });

  describe("when fetching repos", () => {
    beforeEach(() => {
      getReturnPromise("get");
      result = service.fetchRepos("testuser");
    });

    it("should fetch the repos", () => {
      expect(dependencies.httpModule.get).toHaveBeenCalledWith(
        apiUrl + "/users/testuser/repos"
      );
    });

    it("should return the promise", () => {
      expect(result).toBe("getPromise");
    });
  });

  describe("when fetching commits", () => {
    beforeEach(() => {
      getReturnPromise("get");
      result = service.fetchCommits("url");
    });

    it("should fetch the repos", () => {
      expect(dependencies.httpModule.get).toHaveBeenCalledWith("url/commits");
    });

    it("should return the promise", () => {
      expect(result).toBe("getPromise");
    });
  });
});

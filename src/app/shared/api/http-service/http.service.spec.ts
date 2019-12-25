import { HttpService } from "./http.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientStub } from "./testing/http-client.stub";

describe("HttpService", () => {
  let service: HttpService, client: HttpClient, result: any, apiUrl: string;

  beforeEach(() => {
    apiUrl = "http://localhost:3000/api/v1/";
    client = (new HttpClientStub() as Partial<HttpClient>) as HttpClient;
    service = new HttpService(client);
  });

  describe("when getting a resource from the API", () => {
    let args: Array<any>;

    beforeEach(() => {
      (client.get as jasmine.Spy).and.returnValue("getPromise");
    });

    describe("when a correctly formatted URL is supplied", () => {
      beforeEach(() => {
        result = service.get("get/url");
        args = (client.get as jasmine.Spy).calls.mostRecent().args;
      });

      it("should post the data to the API", () => {
        expect(args[0]).toBe(apiUrl + "get/url");
      });

      it("should return the response", () => {
        expect(result).toBe("getPromise");
      });
    });

    describe("when an incorrectly formatted URL is supplied", () => {
      beforeEach(() => {
        service.get("/get/url");
        args = (client.get as jasmine.Spy).calls.mostRecent().args;
      });

      it("should post the data with the correct url to the API", () => {
        expect(args[0]).toBe(apiUrl + "get/url");
      });
    });
  });

  describe("when posting a resource to the API", () => {
    let args: Array<any>;

    beforeEach(() => {
      (client.post as jasmine.Spy).and.returnValue("postPromise");
      result = service.post("post/url", { data: "newData" });
      args = (client.post as jasmine.Spy).calls.mostRecent().args;
    });

    it("should post the data to the API", () => {
      expect(args[0]).toBe(apiUrl + "post/url");
      expect(args[1]).toEqual({ data: "newData" });
    });

    it("should return the response", () => {
      expect(result).toBe("postPromise");
    });
  });

  describe("when putting a resource to the API", () => {
    let args: Array<any>;

    beforeEach(() => {
      (client.put as jasmine.Spy).and.returnValue("putPromise");
      result = service.put("put/url", { data: "putData" });
      args = (client.put as jasmine.Spy).calls.mostRecent().args;
    });

    it("should post the data to the API", () => {
      expect(args[0]).toBe(apiUrl + "put/url");
      expect(args[1]).toEqual({ data: "putData" });
    });

    it("should return the response", () => {
      expect(result).toBe("putPromise");
    });
  });

  describe("when deleting a resource from the API", () => {
    let args: Array<any>;

    beforeEach(() => {
      (client.delete as jasmine.Spy).and.returnValue("deletePromise");
      result = service.delete("delete/url");
      args = (client.delete as jasmine.Spy).calls.mostRecent().args;
    });

    it("should post the data to the API", () => {
      expect(args[0]).toBe(apiUrl + "delete/url");
    });

    it("should return the response", () => {
      expect(result).toBe("deletePromise");
    });
  });
});

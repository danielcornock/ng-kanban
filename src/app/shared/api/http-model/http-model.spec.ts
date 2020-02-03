import { IHttpResponse } from "../interfaces/http-response.interface";
import { HttpModel } from "./http-model";
import { HttpService } from "../http-service/http.service";
import { HttpServiceStub } from "../http-service/http.service.stub";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { IHttpModel } from "./http-model.interface";
import { async } from "@angular/core/testing";

describe("HttpModel", () => {
  let mockData: IHttpResponse,
    model: HttpModel,
    httpService: HttpService,
    result: Promise<IHttpModel>;

  beforeEach(() => {
    mockData = {
      data: {
        story: {
          title: "story",
          _id: "1"
        }
      },
      meta: {
        links: {
          self: "link/self"
        }
      }
    };

    httpService = (new HttpServiceStub() as Partial<
      HttpService
    >) as HttpService;

    model = new HttpModel(mockData, httpService);
  });

  describe("when initialising the model", () => {
    it("should assign the links", () => {
      expect(model["_links"]).toBe(mockData.meta.links);
    });

    it("should assign the data", () => {
      expect(model.data).toBe(mockData.data.story);
    });
  });

  describe("when updating the model", () => {
    let putPromise: TestPromise<IHttpResponse>;
    beforeEach(() => {
      putPromise = new TestPromise<IHttpResponse>();

      (httpService.put as jasmine.Spy).and.returnValue(putPromise.promise);

      result = model.update();
    });

    it("should update the model in the api", () => {
      expect(httpService.put).toHaveBeenCalledWith(
        "link/self",
        mockData.data.story
      );
    });

    describe("when the model has updated", () => {
      let returnData: IHttpResponse;

      beforeEach(async(() => {
        returnData = {
          data: {
            story: {
              title: "story",
              _id: "1",
              newfield: "newField"
            }
          },
          meta: {
            links: {
              self: "link/self"
            }
          }
        };

        putPromise.resolve(returnData);
      }));

      it("should update the data in the model", () => {
        expect(model.data).toBe(returnData.data.story);
      });

      it("should return the updated model", async () => {
        expect(await result).toBe(model);
      });
    });
  });

  describe("when reloading the model", () => {
    let getPromise: TestPromise<IHttpResponse>;

    beforeEach(() => {
      getPromise = new TestPromise<IHttpResponse>();

      (httpService.get as jasmine.Spy).and.returnValue(getPromise.promise);

      result = model.reload();
    });

    it("should fetch the updated model information", () => {
      expect(httpService.get).toHaveBeenCalledWith("link/self");
    });

    describe("when the model has updated", () => {
      let returnData: IHttpResponse;

      beforeEach(async(() => {
        returnData = {
          data: {
            story: {
              title: "story",
              _id: "1",
              newfield: "newField"
            }
          },
          meta: {
            links: {
              self: "link/self"
            }
          }
        };

        getPromise.resolve(returnData);
      }));

      it("should update the data in the model", () => {
        expect(model.data).toBe(returnData.data.story);
      });

      it("should return the updated model", async () => {
        expect(await result).toBe(model);
      });
    });
  });

  describe("when deleting the model", () => {
    let deletePromise: TestPromise<void>;

    beforeEach(() => {
      deletePromise = new TestPromise<void>();

      (httpService.delete as jasmine.Spy).and.returnValue(
        deletePromise.promise
      );

      result = (model.delete() as unknown) as Promise<IHttpModel>;
    });

    it("should delete the model in the api", () => {
      expect(httpService.delete).toHaveBeenCalledWith("link/self");
    });

    describe("when the model has been successfully deleted", () => {
      beforeEach(async(() => {
        deletePromise.resolve();
      }));

      it("should return undefined", async () => {
        expect(await result).toBeUndefined();
      });
    });
  });
});

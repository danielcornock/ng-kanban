import { async } from "@angular/core/testing";

import { BoardApiService } from "./board-api.service";
import { IBoard } from "../../interfaces/board.interface";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { BoardConfigStoreServiceStub } from "../board-config-store/board-config-store.service.stub";
import { BoardConfigStoreService } from "../board-config-store/board-config-store.service";
import { ModelServiceStub } from "src/app/shared/api/model-service/model.service.stub";
import { ModelService } from "src/app/shared/api/model-service/model.service";
import { IHttpModel } from "src/app/shared/api/http-model/http-model.interface";
import { HttpModelStub } from "src/app/shared/api/http-model/http-model.stub";

describe("BoardApiService", () => {
  let dependencies: {
    modelService: ModelService;
  };
  let service: BoardApiService;

  beforeEach(() => {
    dependencies = {
      modelService: (new ModelServiceStub() as Partial<
        ModelService
      >) as ModelService
    };

    service = new BoardApiService(dependencies.modelService);
  });

  describe("when fetching a board", () => {
    let result: Promise<IHttpModel>, httpPromise: TestPromise<any>;

    beforeEach(() => {
      httpPromise = new TestPromise<any>();
      (dependencies.modelService.get as jasmine.Spy).and.returnValue(
        httpPromise.promise
      );
      result = service.fetchBoard("board-id");
    });

    it("should make an api request for the board", () => {
      expect(dependencies.modelService.get).toHaveBeenCalledWith(
        "boards/board-id"
      );
    });

    describe("when the api request resolves", () => {
      let boardModelStub: HttpModelStub;

      beforeEach(async(() => {
        boardModelStub = new HttpModelStub();
        httpPromise.resolve(boardModelStub);
      }));

      it("should return the board", async () => {
        expect(await result).toBe(boardModelStub);
      });
    });
  });
});

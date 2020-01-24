import { TestBed, async } from "@angular/core/testing";

import { BoardApiService } from "./board-api.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { IBoard } from "../../interfaces/board.interface";
import { TestPromise } from "src/app/testing/test-promise/test-promise";
import { BoardConfigStoreServiceStub } from "../board-config-store/board-config-store.service.stub";
import { BoardConfigStoreService } from "../board-config-store/board-config-store.service";

describe("BoardApiService", () => {
  let dependencies: {
    httpService: HttpService;
    boardConfigStoreService: BoardConfigStoreService;
  };
  let service: BoardApiService;

  beforeEach(() => {
    dependencies = {
      httpService: (new HttpServiceStub() as Partial<
        HttpService
      >) as HttpService,
      boardConfigStoreService: (new BoardConfigStoreServiceStub() as Partial<
        BoardConfigStoreService
      >) as BoardConfigStoreService
    };

    service = new BoardApiService(
      dependencies.httpService,
      dependencies.boardConfigStoreService
    );
  });

  describe("when fetching a board", () => {
    let result: Promise<IBoard>, httpPromise: TestPromise<any>;

    beforeEach(() => {
      httpPromise = new TestPromise<any>();
      (dependencies.httpService.get as jasmine.Spy).and.returnValue(
        httpPromise.promise
      );
      result = service.fetchBoard("board-id");
    });

    it("should make an api request for the board", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith(
        "boards/board-id"
      );
    });

    describe("when the api request resolves", () => {
      beforeEach(async(() => {
        httpPromise.resolve({ board: { config: { tags: [] } } });
      }));

      it("should set the global config", () => {
        expect(
          dependencies.boardConfigStoreService.setConfig
        ).toHaveBeenCalledWith({ tags: [] });
      });

      it("should return the board", async () => {
        expect(await result).toEqual({ config: { tags: [] } } as IBoard);
      });
    });
  });
});

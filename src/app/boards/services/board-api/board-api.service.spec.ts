import { TestBed, async } from "@angular/core/testing";

import { BoardApiService } from "./board-api.service";
import { HttpService } from "src/app/shared/api/http-service/http.service";
import { HttpServiceStub } from "src/app/shared/api/http-service/http.service.stub";
import { IBoard } from "../../interfaces/board.interface";
import { TestPromise } from "src/app/testing/test-promise/test-promise";

describe("BoardApiService", () => {
  let dependencies: {
    httpService: HttpService;
  };
  let service: BoardApiService;

  beforeEach(() => {
    dependencies = {
      httpService: (new HttpServiceStub() as Partial<
        HttpService
      >) as HttpService
    };

    service = new BoardApiService(dependencies.httpService);
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

    it("should make an api request", () => {
      expect(dependencies.httpService.get).toHaveBeenCalledWith(
        "boards/board-id"
      );
    });

    describe("when the api request resolves", () => {
      let boardTitleResult: string;

      beforeEach(async(() => {
        service.boardTitle.subscribe((title: string) => {
          boardTitleResult = title;
        });

        httpPromise.resolve({
          board: {
            title: "board-title"
          }
        });
      }));

      it("should transmit the board title to the title subject", () => {
        expect(boardTitleResult).toBe("board-title");
      });

      it("should return the board", async () => {
        expect(await result).toEqual({
          title: "board-title"
        } as IBoard);
      });
    });
  });
});

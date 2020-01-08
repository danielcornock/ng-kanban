import { Subject } from "rxjs";

export class BoardApiServiceStub {
  public boardTitle: Subject<string> = new Subject<string>();

  public fetchBoard: jasmine.Spy = jasmine.createSpy(
    "BoardApiServiceStub.fetchBoard"
  );
}

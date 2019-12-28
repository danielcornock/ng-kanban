import { Subject } from "rxjs";

export class BoardRefreshServiceStub {
  public boardListRefresh: Subject<void> = new Subject<void>();
}

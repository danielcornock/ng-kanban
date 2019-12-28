import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoardRefreshService {
  public boardListRefresh: Subject<void> = new Subject<void>();

  constructor() {}
}

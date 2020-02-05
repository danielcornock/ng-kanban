import { IHttpObject } from "../interfaces/http-response.interface";
import { ModelStatus } from "./constants/model-status";
import { Observable } from "rxjs";

export interface IHttpModel {
  id: string;
  data: IHttpObject;
  getLink(name: string): string;
  update(): Promise<IHttpModel>;
  reload(): Promise<IHttpModel>;
  delete(): Promise<void>;
  onStatusChanges(): Observable<ModelStatus>;
}

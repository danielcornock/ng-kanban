import { IHttpObject } from "../interfaces/http-response.interface";

export interface IHttpModel {
  data: IHttpObject;
  getLink(name: string): string;
  update(): Promise<IHttpModel>;
  reload(): Promise<IHttpModel>;
  delete(): Promise<void>;
}

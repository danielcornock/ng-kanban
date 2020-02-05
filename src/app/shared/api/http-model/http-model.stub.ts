import { IHttpModel } from "./http-model.interface";
import { IHttpObject } from "../interfaces/http-response.interface";

export class HttpModelStub implements IHttpModel {
  id: string = "";
  data: IHttpObject = {};
  getLink: jasmine.Spy = jasmine.createSpy("getLink");
  reload: jasmine.Spy = jasmine.createSpy("reload");
  update: jasmine.Spy = jasmine.createSpy("reload");
  delete: jasmine.Spy = jasmine.createSpy("delete");
  onStatusChanges: jasmine.Spy = jasmine.createSpy("onStatusChanges");
}

import {
  IHttpResponse,
  IHttpObject,
  IHttpMiddleResponse,
  IHttpMeta,
  IHttpLinks
} from "../interfaces/http-response.interface";
import { HttpService } from "../http-service/http.service";
import { IHttpModel } from "./http-model.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { ModelStatus } from "./constants/model-status";

export class HttpModel implements IHttpModel {
  public data: IHttpObject;
  public id: string;

  private _links: IHttpLinks;
  private _statusChanges: BehaviorSubject<ModelStatus> = new BehaviorSubject<
    ModelStatus
  >(ModelStatus.FETCHED);

  constructor(res: IHttpResponse, private readonly _httpService: HttpService) {
    this._initialise(res);
  }

  public async update(): Promise<IHttpModel> {
    this._statusChanges.next(ModelStatus.UPDATING);

    const updatedData: IHttpResponse = await this._httpService.put(
      this._links.self,
      this.data
    );

    this._initialise(updatedData);

    this._statusChanges.next(ModelStatus.UPDATED);

    return this;
  }

  public async reload(): Promise<IHttpModel> {
    this._statusChanges.next(ModelStatus.RELOADING);

    const updatedRes: IHttpResponse = await this._httpService.get(
      this._links.self
    );

    this._initialise(updatedRes);

    this._statusChanges.next(ModelStatus.RELOADED);

    return this;
  }

  public async delete(): Promise<void> {
    this._statusChanges.next(ModelStatus.DELETING);

    await this._httpService.delete(this._links.self);

    this._statusChanges.next(ModelStatus.DELETED);
  }

  public getLink(linkName: string): string {
    return this._links[linkName];
  }

  public onStatusChanges(): Observable<ModelStatus> {
    return this._statusChanges.asObservable();
  }

  private _initialise(res: IHttpResponse) {
    this._assignData(res.data);
    this._assignLinks(res.meta);
  }

  private _assignData(data: IHttpMiddleResponse): void {
    this.data = data[Object.keys(data)[0]];
    this.id = this.data._id;
  }

  private _assignLinks(meta: IHttpMeta) {
    this._links = meta.links;
  }
}

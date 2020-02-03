import {
  IHttpResponse,
  IHttpObject,
  IHttpMiddleResponse,
  IHttpMeta,
  IHttpLinks
} from "../interfaces/http-response.interface";
import { HttpService } from "../http-service/http.service";
import { IHttpModel } from "./http-model.interface";

export class HttpModel implements IHttpModel {
  public data: IHttpObject;
  public id: string;
  private _links: IHttpLinks;

  constructor(res: IHttpResponse, private readonly _httpService: HttpService) {
    this._initialise(res);
  }

  public async update(): Promise<IHttpModel> {
    const updatedData: IHttpResponse = await this._httpService.put(
      this._links.self,
      this.data
    );

    this._initialise(updatedData);

    return this;
  }

  public async reload(): Promise<IHttpModel> {
    const updatedRes: IHttpResponse = await this._httpService.get(
      this._links.self
    );

    this._initialise(updatedRes);

    return this;
  }

  public async delete(): Promise<void> {
    await this._httpService.delete(this._links.self);
  }

  public getLink(linkName: string): string {
    return this._links[linkName];
  }

  private _initialise(res: IHttpResponse) {
    this._assignData(res.data);
    this._assignLinks(res.meta);
  }

  private _assignData(data: IHttpMiddleResponse): void {
    this.data = data[Object.keys(data)[0]];
  }

  private _assignLinks(meta: IHttpMeta) {
    this._links = meta.links;
  }
}

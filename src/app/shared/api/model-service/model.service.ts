import { Injectable } from "@angular/core";
import { HttpService } from "../http-service/http.service";
import { IHttpResponse } from "../interfaces/http-response.interface";
import { HttpModel } from "../http-model/http-model";
import { IHttpModel } from "../http-model/http-model.interface";
import { HttpModelFactory } from "../http-model/http-model.factory";

@Injectable({
  providedIn: "root"
})
export class ModelService {
  constructor(private readonly _httpService: HttpService) {}

  public async get(url: string): Promise<IHttpModel> {
    const res: IHttpResponse = await this._httpService.get(url);

    return HttpModelFactory.create(res, this._httpService);
  }

  public async post(url: string, data: any): Promise<IHttpModel> {
    const res: IHttpResponse = await this._httpService.post(url, data);

    return HttpModelFactory.create(res, this._httpService);
  }
}

import { IHttpResponse } from "../interfaces/http-response.interface";
import { HttpService } from "../http-service/http.service";
import { HttpModel } from "./http-model";

export class HttpModelFactory {
  static create(res: IHttpResponse, service: HttpService) {
    return new HttpModel(res, service);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpModel } from "../http-model/http-model";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private _apiUrl = "http://localhost:3000/api/v1/";

  private addAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt_token") ||
        sessionStorage.getItem("jwt_token")}`
    });
  }

  public post(url: string, data: object): Promise<any> {
    return this.http
      .post(this._generateCompleteUrl(url), data, {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public put(url: string, data: object): Promise<any> {
    return this.http
      .put(this._generateCompleteUrl(url), data, {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public get(url: string): Promise<any> {
    return this.http
      .get(this._generateCompleteUrl(url), {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public delete(url: string): Promise<any> {
    return this.http
      .delete(this._generateCompleteUrl(url), {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  private _generateCompleteUrl(url: string) {
    return url.includes("http://localhost:3000/api/v1/")
      ? url
      : this._apiUrl + url;
  }
}

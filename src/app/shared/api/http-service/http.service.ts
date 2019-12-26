import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private apiUrl = "http://localhost:3000/api/v1/";

  private addAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt_token") ||
        sessionStorage.getItem("jwt_token")}`
    });
  }

  private _processUrl(url: string): string {
    return url[0] === "/" ? url.slice(1) : url;
  }

  public post(url: string, data: object): Promise<any> {
    return this.http
      .post(this.apiUrl + this._processUrl(url), data, {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public put(url: string, data: object): Promise<any> {
    return this.http
      .put(this.apiUrl + this._processUrl(url), data, {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public get(url: string): Promise<any> {
    return this.http
      .get(this.apiUrl + this._processUrl(url), {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }

  public delete(url: string): Promise<any> {
    return this.http
      .delete(this.apiUrl + this._processUrl(url), {
        headers: this.addAuthHeaders()
      })
      .toPromise();
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {
    this._setBaseUrl();
  }

  private _liveApiUrl: string = "https://nest-kanban.herokuapp.com/api/v1/";
  private _localApiUrl: string = "http://localhost:3000/api/v1/";
  private _activeUrl: string;

  private addAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt_token") ||
        sessionStorage.getItem("jwt_token")}`
    });
  }

  private _setBaseUrl(): void {
    if (environment.production) {
      this._activeUrl = this._liveApiUrl;
    } else {
      this._activeUrl = this._localApiUrl;
    }
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
    return url.includes("http") ? url : this._activeUrl + url;
  }
}

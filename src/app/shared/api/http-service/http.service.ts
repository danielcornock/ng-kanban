import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

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

  public post(url: string, data: object): Observable<any> {
    return this.http.post(this.apiUrl + this._processUrl(url), data, {
      headers: this.addAuthHeaders()
    });
  }

  public put(url: string, data: object): Observable<any> {
    return this.http.put(this.apiUrl + this._processUrl(url), data, {
      headers: this.addAuthHeaders()
    });
  }

  public get(url: string): Observable<any> {
    return this.http.get(this.apiUrl + this._processUrl(url), {
      headers: this.addAuthHeaders()
    });
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + this._processUrl(url), {
      headers: this.addAuthHeaders()
    });
  }
}

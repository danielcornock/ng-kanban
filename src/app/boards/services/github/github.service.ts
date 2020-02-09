import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GithubService {
  private _githubUrl: string = "https://api.github.com";

  constructor(private readonly _httpClient: HttpClient) {}

  public searchUsers(username: string): Promise<any> {
    return this._httpClient
      .get(`${this._githubUrl}/users/${username}`)
      .toPromise();
  }

  public fetchRepos(username: string): Promise<any> {
    return this._httpClient
      .get(`${this._githubUrl}/users/${username}/repos`)
      .toPromise();
  }

  public fetchCommits(url: string): Promise<any> {
    return this._httpClient.get(`${url}/commits`).toPromise();
  }
}

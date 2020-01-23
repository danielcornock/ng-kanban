import { Injectable } from "@angular/core";
import { IBoardConfig } from "../../interfaces/board-config.interface";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/shared/api/http-service/http.service";

@Injectable({
  providedIn: "root"
})
export class BoardConfigStoreService {
  private _config$: BehaviorSubject<IBoardConfig> = new BehaviorSubject<
    IBoardConfig
  >(null);

  constructor(private readonly _httpService: HttpService) {}

  public setConfig(config: IBoardConfig): void {
    this._config$.next(config);
  }

  public getConfig(): Observable<IBoardConfig> {
    return this._config$.asObservable();
  }

  public async saveConfig(config: IBoardConfig): Promise<void> {
    const savedConfig = await this._httpService.put(
      `boardConfig/${config._id}`,
      config
    );
    this._config$.next(savedConfig.config);
  }
}

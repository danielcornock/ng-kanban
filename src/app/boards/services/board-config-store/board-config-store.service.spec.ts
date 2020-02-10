import { TestBed, async } from '@angular/core/testing';

import { BoardConfigStoreService } from './board-config-store.service';
import { HttpServiceStub } from 'src/app/shared/api/http-service/http.service.stub';
import { HttpService } from 'src/app/shared/api/http-service/http.service';
import { IBoardConfig } from '../../interfaces/board-config.interface';
import { TestPromise } from 'src/app/testing/test-promise/test-promise';

describe('BoardConfigStoreService', () => {
  let service: BoardConfigStoreService,
    result: Partial<IBoardConfig>,
    configSubjectSpy: jasmine.Spy,
    dependencies: {
      httpService: HttpService;
    };

  beforeEach(() => {
    dependencies = {
      httpService: (new HttpServiceStub() as Partial<
        HttpService
      >) as HttpService
    };

    service = new BoardConfigStoreService(dependencies.httpService);

    /* tslint:disable:no-string-literal */
    configSubjectSpy = spyOn(service['_config$'], 'next');
    /* tslint:enable:no-string-literal */
  });

  describe('when setting the config', () => {
    beforeEach(async () => {
      service.setConfig({ tags: [] } as IBoardConfig);
    });

    it('should set the config', () => {
      expect(configSubjectSpy).toHaveBeenCalled();
    });
  });

  describe('when getting the config', () => {
    beforeEach(() => {
      service.getConfig().subscribe(data => {
        result = data;
      });
    });

    it('should return the initial value of null', () => {
      expect(result).toBe(null);
    });
  });

  describe('when saving the config', () => {
    let putPromise: TestPromise<any>;

    beforeEach(() => {
      putPromise = new TestPromise<any>();
      (dependencies.httpService.put as jasmine.Spy).and.returnValue(
        putPromise.promise
      );

      service.saveConfig({ _id: 'config-id' } as IBoardConfig);
    });

    it('should save the config to the API', () => {
      expect(
        dependencies.httpService.put
      ).toHaveBeenCalledWith('boardConfig/config-id', { _id: 'config-id' });
    });

    describe('when the config has been saved', () => {
      beforeEach(async(() => {
        putPromise.resolve({ config: { _id: 'config-id' } });
      }));

      it('should set the config', () => {
        expect(configSubjectSpy).toHaveBeenCalledWith({ _id: 'config-id' });
      });
    });
  });
});

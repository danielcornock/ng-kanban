import { TestBed } from '@angular/core/testing';

import { BoardRefreshService } from './board-refresh.service';

describe('BoardRefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardRefreshService = TestBed.get(BoardRefreshService);
    expect(service).toBeTruthy();
  });
});

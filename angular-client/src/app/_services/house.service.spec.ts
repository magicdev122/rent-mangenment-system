import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';

describe('HouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseService = TestBed.get(HouseService);
    expect(service).toBeTruthy();
  });
});

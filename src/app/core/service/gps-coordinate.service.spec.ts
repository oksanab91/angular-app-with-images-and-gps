import { TestBed } from '@angular/core/testing';

import { GpsCoordinateService } from './gps-coordinate.service';

describe('GpsCoordinateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsCoordinateService = TestBed.get(GpsCoordinateService);
    expect(service).toBeTruthy();
  });
});

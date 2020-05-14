import { TestBed } from '@angular/core/testing';

import { ApiFlightWidgetService } from './api-flight-widget.service';

describe('FlightWidgetService', () => {
  let service: ApiFlightWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFlightWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

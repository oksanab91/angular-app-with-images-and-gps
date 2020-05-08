import { TestBed } from '@angular/core/testing';

import { FlightWidgetService } from './flight-widget.service';

describe('FlightWidgetService', () => {
  let service: FlightWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

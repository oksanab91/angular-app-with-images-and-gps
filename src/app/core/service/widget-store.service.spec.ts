import { TestBed } from '@angular/core/testing';

import { WidgetStoreService } from './widget-store.service';

describe('WidgetStoreService', () => {
  let service: WidgetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightWidgetsComponent } from './flight-widgets.component';

describe('FlightWidgetsComponent', () => {
  let component: FlightWidgetsComponent;
  let fixture: ComponentFixture<FlightWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetToolComponent } from './widget-tool.component';

describe('WidgetToolComponent', () => {
  let component: WidgetToolComponent;
  let fixture: ComponentFixture<WidgetToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

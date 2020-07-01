import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWidgetsComponent } from './job-widgets.component';

describe('JobWidgetsComponent', () => {
  let component: JobWidgetsComponent;
  let fixture: ComponentFixture<JobWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

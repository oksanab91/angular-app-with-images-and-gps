import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlusComponent } from './card-plus.component';

describe('CardPlusComponent', () => {
  let component: CardPlusComponent;
  let fixture: ComponentFixture<CardPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

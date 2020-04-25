import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonList } from './person-list.component';

describe('PersonListComponent', () => {
  let component: PersonList;
  let fixture: ComponentFixture<PersonList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

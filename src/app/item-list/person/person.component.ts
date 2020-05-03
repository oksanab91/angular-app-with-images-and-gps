import { Component, OnInit, Input } from '@angular/core';
import { Person } from '@models/models';
import { AlertService } from '@core/service';
import { PersonListStore } from '@core/store/person-list.store';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input()  person: Person;

  constructor(private store: PersonListStore, private alertService: AlertService) {
    this.alertService.reset();
  }

  ngOnInit() {
  }

  remove(person: Person) {
    this.store.removePerson(person.id, person.name);
    this.alertService.set(this.store.state.message);
  }

  hasMapUrl(): boolean {
    return this.person.googleMapUrl !== '';
  }
}

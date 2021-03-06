import { Component, OnInit, Input } from '@angular/core';
import { Person } from '@models/models';
import { AlertService } from '@core/service';
import { PersonListStore, messageSelect } from '@core/store';

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

  async remove(person: Person) {
    await this.store.removePerson(person.id, person.name);
    this.alertService.set(messageSelect(this.store.state));
  }

  hasMapUrl(): boolean {
    return this.person.googleMapUrl !== '';
  }
}

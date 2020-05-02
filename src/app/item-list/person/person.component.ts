import { Component, OnInit, Input } from '@angular/core';
import { Person } from '@models/models';
import { PersonService, AlertService } from '@core/service';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input()  person: Person;

  constructor(private personService: PersonService, private alertService: AlertService) {
    this.alertService.reset();
   }

  ngOnInit() {
  }

  remove(person: Person) {    
    const result = this.personService.remove(person.id, person.name);
    this.alertService.set(result);
  }

  hasMapUrl(): boolean {
    return this.person.googleMapUrl !== '';
  }
}

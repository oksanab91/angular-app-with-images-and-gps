import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../service/person.service';
import { AlertService } from '../service/alert.service';

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
    const result = this.personService.remove(person.id);
    if(result) this.alertService.set({type: 'warning', message: `${person.name} deleted`});
    else this.alertService.set({type: 'danger', message: `${person.name} not deleted`});
  }

}

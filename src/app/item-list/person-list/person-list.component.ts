import { Component } from '@angular/core';
import { Person } from '@models/models';
import { PersonService } from '@core/service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {
  personList$: Observable<Person[]> = of([]);
  selectedId: number;
  
  constructor(private personService: PersonService) {
    this.personList$ = this.personService.sharedPersonList$;
   }
  
  trackByFn(index, item) {
    return item.id;
  }
}

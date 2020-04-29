import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../service/person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {  
  personList: Person[] = [];
  selectedId: number;
  lastInd = 0;
  subscription: Subscription;

  constructor(private personService: PersonService) {
    this.getAll(); 
   }

  ngOnInit() {   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  getAll() {
    if(this.subscription) this.subscription.unsubscribe();    
    this.subscription = this.personService.sharedPersonList.subscribe(
      items => {        
        this.personList = [...items, {...new Person(), id: -1}];
        this.lastInd = this.personList.length - 1;        
      }
    );
  }

  trackByFn(index, item) {
    return index;
  }
}

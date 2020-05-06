import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersonListStore } from '@core/store';

@Component({
  selector: 'person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {  
  
  constructor(public store: PersonListStore) {    
   }
  
  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {   
  }
}

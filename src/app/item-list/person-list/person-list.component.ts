import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Person } from 'src/app/models';

@Component({
  selector: 'person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent {  
  @Input() personList: Person[];

  constructor() {    
   }
  
  trackByFn(index, item) {
    return item.id;
  }
  
}

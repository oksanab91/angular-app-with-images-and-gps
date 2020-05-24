import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Person } from 'src/app/models';
import { fadeInAnimation } from 'src/app/app-animations';

@Component({
  selector: 'person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],  
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class PersonListComponent {  
  @Input() personList: Person[];

  constructor() {    
   }
  
  trackByFn(index, item) {
    return item.id;
  }
  
}

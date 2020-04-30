import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '@core/service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit, OnDestroy {

  private searchName = new Subject<string>();
  private subscription: Subscription;
  

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.subscription = this.searchName.pipe(      
      // wait 300ms after each keystroke before considering the filter
      debounceTime(300),

      // ignore new filter if same as previous filter
      distinctUntilChanged(),

      // switch to new search observable each time the filter changes
      switchMap((filter: string) => this.personService.search(filter))                
    )
    .subscribe();

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Push a search filter into the observable stream.
  search(filter: string): void {    
    this.searchName.next(filter);
  }

}

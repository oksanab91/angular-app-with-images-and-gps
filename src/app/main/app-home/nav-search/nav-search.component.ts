import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PersonListStore } from '@core/store';

@Component({
  selector: 'nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit, OnDestroy {

  private searchName = new Subject<string>();
  private subscription: Subscription;
  

  constructor(private store: PersonListStore) { }

  ngOnInit() {
    this.subscription = this.searchName.pipe(      
      // wait 300ms after each keystroke before considering the filter
      debounceTime(300),

      // ignore new filter if same as previous filter
      distinctUntilChanged(),

      // switch to new search observable each time the filter changes
      switchMap((filter: string) => this.store.search(filter))                
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

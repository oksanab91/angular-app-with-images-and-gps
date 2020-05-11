import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Flight;
  show = false;  
  
  constructor() { }

  ngOnInit(): void {        
  }

  hasMapUrl(): boolean {
    return this.widget.cityDestination && this.widget.cityDestination.googleMapUrl !== '';
  }

  expiresOffer(): string {
    const aday=1000*60*60*24;
    const current = Date.now();
    const expiration = new Date(this.widget.expires_at);
    const exp = expiration.getTime();

    const dif = exp - current;
    const result = Math.round(dif/aday);

    return result > 1 ? `${result} days left` : `${result} day left`;
  }

  collapse() {
    this.show = !this.show;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Flight;  
  
  constructor() { }

  ngOnInit(): void {    
  }

  hasMapUrl(): boolean {
    return this.widget.cityDestination && this.widget.cityDestination.googleMapUrl !== '';
  }

  show() {}
}

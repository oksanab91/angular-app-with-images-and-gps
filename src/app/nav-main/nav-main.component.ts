import { Component, OnInit } from '@angular/core';
import { WidgetStore, WidgetJobSearchStore } from '@core/store';

@Component({
  selector: 'nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {
  widgetsShow: boolean
  constructor(private widgetStore: WidgetStore, private widgetJobStore: WidgetJobSearchStore) { }

  ngOnInit(): void {
  }

  onWidgetsShow() {
    this.widgetsShow = !this.widgetsShow;
    this.widgetStore.setShow(this.widgetsShow);    
    this.widgetJobStore.setShow(this.widgetsShow);
  }

}

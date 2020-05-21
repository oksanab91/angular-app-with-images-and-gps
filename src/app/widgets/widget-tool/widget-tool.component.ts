import { Component, OnInit } from '@angular/core';
import { WidgetStore, showSelect } from '@core/store';

@Component({
  selector: 'widget-tool',
  templateUrl: './widget-tool.component.html',
  styleUrls: ['./widget-tool.component.scss']
})
export class WidgetToolComponent implements OnInit {
  show: boolean;
  btnCaption: string;

  constructor(private store: WidgetStore) { }

  onShow() {
    this.show = !this.show;
    this.store.setShow(this.show);
    this.btnCaption = this.show ? '' : 'Widgets';
  }  

  ngOnInit(): void {
    this.show = showSelect(this.store.state)
    this.btnCaption = this.show ? '' : 'Widgets';
  }

}

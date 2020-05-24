import { Component, OnInit } from '@angular/core';
import { AlertService } from '@core/service';
import { fadeInOutQueryAnimation } from 'src/app/app-animations';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [fadeInOutQueryAnimation]  
})
export class AlertComponent implements OnInit {

  constructor( public alertService: AlertService) { }

  ngOnInit() {
    
  }

  trackByFn(index, item) {
    return index;
  }
}

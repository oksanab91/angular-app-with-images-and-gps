import { Injectable } from '@angular/core';
import { Alert } from '../models/Alert';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  constructor() { }

  add(alert: Alert) {    
    this.alerts = [...this.alerts, { type: alert.type, message: alert.message }];    
  }

  set(alert: Alert){
    this.alerts = [];
    this.alerts = [...this.alerts, { type: alert.type, message: alert.message }];
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);    
  }
  
  reset() {
    this.alerts = [];
  }
}

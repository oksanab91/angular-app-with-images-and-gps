import { Injectable } from '@angular/core';
import { Alert } from '@models/models';


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
    this.alerts = [...this.alerts, { type: alert.type, message: alert.message }];
    setTimeout(() => { 
      if(this.alerts.indexOf(alert)) this.close(alert); 
    }, 3000);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);    
  }
  
  reset() {
    this.alerts = [];
  }
}

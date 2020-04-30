import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Picture } from '@models/models';

@Injectable({
  providedIn: 'root'
})
export class ModalService {  
  picture: Picture = {url: "assets/empty.jpg", caption: 'Empty'};
  show = false;
  private subject = new BehaviorSubject(this.picture);  
  sharedResult = this.subject.asObservable();

  constructor() { }

  open(img: Picture): Observable<string> {
    this.picture = {...img};       
    this.show = true;        
    this.subject.next(this.picture);   
    return of('open');
  }

  ok(img: Picture): Observable<string> {
    this.picture = {...img};    
    this.subject.next(this.picture);
    return of('ok');
  }

  cancel(): Observable<string> {    
    this.subject.next(this.picture);
    return of('cancel');
  }

  reset() {
    this.picture = {url: "assets/empty.jpg", caption: 'Empty'};  
    this.show = false;  
  }
}

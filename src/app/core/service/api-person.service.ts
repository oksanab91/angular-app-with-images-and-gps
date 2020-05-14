import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiPersonService {

  constructor(private http: HttpClient) { }

  index(): Observable<Person[]> {
    const url = "../../assets/people.json";
    return this.http.get<Person[]>(url);        
  }

  // add(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.post(url, payload, {headers: this.headers});
  // }

  // delete(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.delete(url + '/' + payload.id, {headers: this.headers});
  // }

  // save(payload) {
  //   const url = "../../assets/people.json";
  //   return this.http.put(url + '/' + payload.id, payload, {headers: this.headers});
  // }
  // =========================  
}

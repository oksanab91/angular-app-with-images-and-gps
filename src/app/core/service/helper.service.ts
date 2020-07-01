import { Injectable } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private ngxXml2jsonService: NgxXml2jsonService) { }

  xmlToJson(xml: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(doc);
        
    return obj
  }

  calculateDateDiff(a: string, b: string){
    let dif = 0
    const aday=1000*60*60*24;

    if(!a) dif = Date.now() - new Date(b).getTime()    
    if(a) dif = new Date(a).getTime() - new Date(b).getTime()
               
    return Math.round(dif/aday)
  }
}

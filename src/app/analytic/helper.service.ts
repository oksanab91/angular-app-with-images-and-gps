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
}

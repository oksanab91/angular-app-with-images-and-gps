import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image.service';
import {  of } from 'rxjs';

import { Picture, Person } from '../models/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../service/person.service';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {  
  image = new Picture();
  personId: number;  

  constructor(private imageService: ImageService, private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit() {
    this.personId = + this.route.snapshot.paramMap.get('id');

    this.getPerson().pipe(take(1)).subscribe((person: Person) => 
      this.image = {...person.picture});
  }

  getPerson() {
    if(this.personId<0) return of(new Person());
    return this.personService.get(this.personId);    
  }

  onSubmit() { 
    
  }

  processFile(input: any) {
    if (!input.target.files || !input.target.files[0]) return;
    const file: File = input.target.files[0];

    this.imageService.readFile(file).subscribe(imgData => {      
      this.image.url = imgData;
      this.image.caption = file.name;
      },      
        err => console.log(err)
    );    
  }

}

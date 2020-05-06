import { Component, OnInit } from '@angular/core';
import { ImageService } from '@core/service';
import { Picture, Person } from '@models/models';
import { ActivatedRoute } from '@angular/router';
import { PersonListStore } from '@core/store';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {  
  image = new Picture();
  personId: number;  

  constructor(private imageService: ImageService, private route: ActivatedRoute, private store: PersonListStore) { }

  ngOnInit() {
    this.personId = + this.route.snapshot.paramMap.get('id');

    const person = this.getPerson(); 
    this.image = {...person.picture};
  }

  getPerson() {
    if(this.personId<0) return new Person();
    this.store.get(this.personId);
    return this.store.state.person;
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

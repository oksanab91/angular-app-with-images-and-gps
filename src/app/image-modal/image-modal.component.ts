import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { Subscription, of } from 'rxjs';
import { ImageService } from '../service/image.service';
import { Picture } from '../models/person';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  title = 'Select Image';
  // id = 0;
  // url = '';
  defaultPicture = {url: "assets/empty.jpg", caption: 'Empty'};
  picture: Picture;
  // show = true;
  // subscription: Subscription;
  // message = 'The message';
  constructor(public modalService: ModalService, private imageService: ImageService) { 
    // this.image = {...this.modalService.image};
    // console.log(this.image);
    // this.url = this.modalService.url;
  }

  ngOnInit() {
    this.picture = this.defaultPicture;
    // this.image = {...this.modalService.image};
    // console.log(this.image);
    // this.getPerson().pipe(take(1)).subscribe((person: Person) => 
      // this.image = {...person.picture});
  }

  setShow(): boolean {
    // console.log(this.image);
    if(this.modalService.show && this.picture == this.defaultPicture) this.picture = {...this.modalService.picture};
    return this.modalService.show;
  }

  cancel() {
    this.modalService.show = false;
    this.modalService.cancel();
  }

  ok() {
    // console.log(this.url);
    this.modalService.show = false;            
    this.modalService.ok(this.picture);
  }

  
  processFile(input: any) {
    if (!input.target.files || !input.target.files[0]) return;
    const file: File = input.target.files[0];

    this.imageService.readFile(file).subscribe(imgData => {
      
      this.picture = new Picture();
      this.picture.url = imgData;
      this.picture.caption = file.name;
      // console.log(this.image);
      },      
        err => console.log(err)
    );    
  }
}

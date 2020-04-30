import { Component, OnInit } from '@angular/core';
import { ImageService, ModalService } from '@core/service';
import { Picture } from '@models/models';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  title = 'Select Image';  
  defaultPicture = {url: "assets/empty.jpg", caption: 'Empty'};
  picture: Picture;
  
  constructor(public modalService: ModalService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.picture = this.defaultPicture;    
  }

  setShow(): boolean {    
    if(this.modalService.show && this.picture == this.defaultPicture) this.picture = {...this.modalService.picture};
    return this.modalService.show;
  }

  cancel() {
    this.modalService.show = false;
    this.modalService.cancel();
  }

  ok() {    
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
      },      
        err => console.log(err)
    );    
  }
}

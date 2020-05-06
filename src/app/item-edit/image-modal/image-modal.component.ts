import { Component } from '@angular/core';
import { Picture } from '@models/models';
import { ModalImageStore } from '@core/store';
import { ImageService } from '@core/service';

@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  title = 'Select Image';
  defaultPicture = {url: "assets/empty.jpg", caption: 'Image'};
  picture: Picture = this.defaultPicture;
  
  constructor(public modalStore: ModalImageStore, private imageService: ImageService) {    
  }  

  setShow(): boolean {    
    if(this.modalStore.state.show && this.picture == this.defaultPicture) this.picture = {...this.modalStore.state.image};
    return this.modalStore.state.show;
  }

  cancel() {    
    this.modalStore.cancel();
  }

  ok() {     
    this.modalStore.ok(this.picture);
  }
  
  processFile(input: any) {
    if (!input.target.files || !input.target.files[0]) return;
    const file: File = input.target.files[0];

    this.imageService.readFile(file).subscribe(imgData => {
      this.picture = {...this.picture, url: imgData, caption: file.name} },      
      err => console.log(err)
    );    
  }
}
